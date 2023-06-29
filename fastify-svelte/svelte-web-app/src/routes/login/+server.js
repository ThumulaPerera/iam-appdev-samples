const target = import.meta.env.VITE_AUTHORIZE_ENDPOINT;
const clientID = import.meta.env.VITE_CLIENT_ID;
const redirectURL = import.meta.env.VITE_REDIRECT_URI;
const scopes = import.meta.env.VITE_SCOPES;

export function GET() {
    let options = {
        status: 302,
        headers: {
            location: `${target}?response_type=code&client_id=${clientID}&redirect_uri=${redirectURL}&scope=${scopes}`
        }
    }

	return new Response(null, options);
}
