import { env } from '$env/dynamic/public';
import { env as pvtEnv } from '$env/dynamic/private';

const target = env.PUBLIC_AUTHORIZE_ENDPOINT;
const clientID = pvtEnv.CLIENT_ID;
const redirectURL = env.PUBLIC_REDIRECT_URI;
const scopes = env.PUBLIC_SCOPES;

export function GET() {
    let options = {
        status: 302,
        headers: {
            location: `${target}?response_type=code&client_id=${clientID}&redirect_uri=${redirectURL}&scope=${scopes}`
        }
    }

	return new Response(null, options);
}
