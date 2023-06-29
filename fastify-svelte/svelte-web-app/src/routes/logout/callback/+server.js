export async function GET() {
   
    let options = {
        status: 302,
        headers: {
            location: '/',
            'set-cookie': `id-token=''; path=/; HttpOnly; expires=Thu, 01 Jan 1970 00:00:00 GMT, token=''; path=/; HttpOnly; expires=Thu, 01 Jan 1970 00:00:00 GMT`
        }
    }

	return new Response(null, options);
}
