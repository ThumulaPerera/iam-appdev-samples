import { json } from '@sveltejs/kit';

let items = new Map()

export async function GET({ url }) {
    console.log('request:', url);
    let user = url.searchParams.get('user');
    console.log('user:', user);
    return json(items.get(user) || []);
}

export async function POST({ request }) {
    let body = await request.json();
    console.log('request:', body);

    let user = body.user_id;
    let itemName = body.item;
    console.log('user:', user);
    
    let existingItems = items.get(user) || [];
    let item = { id: existingItems.length + 1, name: itemName || 'Default Item' };
    existingItems.push(item);
    console.log('existingItems:', existingItems);
    items.set(user, existingItems);
    return json(item);
}