const target = 'https://2d9ec1f6-2f04-4127-974f-0a3b20e97af5-prod.e1-us-east-azure.choreoapis.dev/rbln/item-service/items-803/1.0.0/items';

export async function GET({ fetch, cookies }) {

    const token = cookies.get('token');
    const items = await getItems(fetch, token);

    console.log(items);

    let options = {
        status: 302,
        headers: {
            location: `/`
        }
    }

    return new Response(null, options);
}

export async function POST({ fetch, cookies }) {

    const token = cookies.get('token');
    const items = await addItem(fetch, token);

    console.log(items);

    let options = {
        status: 302,
        headers: {
            location: `/`
        }
    }

    return new Response(null, options);
}

function getItems(fetch, token) {
    return fetch(target, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
        }
    })
        .then(response => {
            console.log(response);
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        })
}

function addItem(fetch, token) {
    return fetch(target, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            id: 4,
            name: 'new item'
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