export async function GET({ cookies }) {
    cookies.delete('step-up-token', { path: '/' });
    cookies.delete('id-token', { path: '/' });
    cookies.delete('token', { path: '/' });

    let options = {
        status: 302,
        headers: {
            location: '/',
        }
    }
	return new Response(null, options);
}
