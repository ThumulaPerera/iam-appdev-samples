import { env } from '$env/dynamic/public';
import { env as pvtEnv } from '$env/dynamic/private';

const itemsEndpoint = env.PUBLIC_ITEMS_ENDPOINT;
const authrEndpoint = env.PUBLIC_AUTHORIZE_ENDPOINT;
const clientID = pvtEnv.CLIENT_ID;
const redirectURL = env.PUBLIC_ADD_ITEM_REDIRECT_URI;
const scopes = env.PUBLIC_SCOPES;
const acr = env.PUBLIC_ADD_ITEM_ACR;

export async function GET({ url, fetch, cookies }) {

    let itemId;
    let itemName;
    let token = cookies.get('step-up-token');

    let options;

    if (url.searchParams.has('id')) {
        // this is a initial request from home page
        itemId = url.searchParams.get('id');
        itemName = url.searchParams.get('name');

        if (token) {
            await addItem(fetch, itemId, itemName, token);
            options = {
                status: 302,
                headers: {
                    location: '/'
                }
            }
        } else {
            cookies.set('item-id', itemId, { path: '/' });
            cookies.set('item-name', itemName, { path: '/' });
            options = {
                status: 302,
                headers: {
                    location: `${authrEndpoint}?response_type=code&client_id=${clientID}&redirect_uri=${redirectURL}&scope=${scopes}&acr_values=${acr}`
                }
            }
        }
    } else {
        // this is a callback from auth server
        itemId = cookies.get('item-id');
        itemName = cookies.get('item-name');

        cookies.delete('item-id', { path: '/' });
        cookies.delete('item-name', { path: '/' });

        await addItem(fetch, itemId, itemName, token);

        options = {
            status: 302,
            headers: {
                location: '/'
            }
        }
    }
    return new Response(null, options);
}

function addItem(fetch, id, name, token) {
    return fetch(itemsEndpoint, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            id,
            name
        })
    })
        .then(response => {
            console.log(response);
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        })
}
