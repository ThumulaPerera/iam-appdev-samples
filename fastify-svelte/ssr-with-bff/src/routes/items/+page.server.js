export async function load({ fetch, request }) {
    let user_id = request.headers.get('x-forwarded-user');
    let items = await fetch(`api/items?user=${user_id}`).then(r => r.json());

    return {
        items
    };
}

export const actions = {
    default: async ({ fetch, request }) => {
        const data = await request.formData();
        const item = data.get('item');
        const user_id = data.get('user-id');

        console.log('name:', item);

        fetch('/api/items', {
            method: 'POST',
            body: JSON.stringify({ item, user_id }),
        })  
        .then(response => response.json())
        .then(result => {
          console.log('Success:', result);
          // Do something with the response data
        })
        .catch(error => {
          console.error('Error:', error);
          // Handle any errors that occurred during the request
        });
    }
};