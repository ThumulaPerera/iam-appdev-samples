export async function load({ cookies }) {
    const token = cookies.get('token');
    console.log('from load:' + token);
    return {token};
}