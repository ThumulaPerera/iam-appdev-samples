import { env } from '$env/dynamic/public';

const target = env.PUBLIC_LOGOUT_ENDPOINT;
const redirectURL = env.PUBLIC_LOGOUT_REDIRECT_URI;

export function GET({ cookies }) {
    let options = {
        status: 302,
        headers: {
            location: `${target}?id_token_hint=${cookies.get('id-token')}&post_logout_redirect_uri=${redirectURL}`
        }
    }

	return new Response(null, options);
}
