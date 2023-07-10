import { env } from '$env/dynamic/public';

let itemsEndpoint = env.PUBLIC_ITEM_SERVICE_URL;

export async function load({ fetch, request }) {
    let access_token = request.headers.get('x-forwarded-access-token');

    let items = await fetch(itemsEndpoint, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${access_token}`,
            'Accept': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            console.log(response);
            console.error('Network response was not ok');
    })

    return {
        items
    };
}

export const actions = {
    default: async ({ fetch, request }) => {
        const data = await request.formData();
        const item = data.get('item');
        const id = data.get('id');
        const token = data.get('token');

        await addItem(fetch, id, item, token);
    }
};

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
            if (response.ok) {
                return response.json();
            }
            console.log(response);
            console.error('Network response was not ok.');
        })
}