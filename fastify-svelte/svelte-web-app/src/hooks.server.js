// export async function handle({ event, resolve }) {

//     const response = await resolve(event);

//     console.log('from handle:' + event.locals.token);
//     response.headers['set-cookie'] = `token=${event.locals.token || ''}; path=/; HttpOnly`

//     return response;
// }