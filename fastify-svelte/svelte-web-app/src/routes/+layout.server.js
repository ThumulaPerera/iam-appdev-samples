export async function load({ cookies }) {
    const token = cookies.get('token');
    const idToken = cookies.get('id-token');

    console.log('from load:' + token);
    return {token, idToken};
}