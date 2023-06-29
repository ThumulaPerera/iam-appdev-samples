import { Buffer } from 'buffer';
import jwt from 'jsonwebtoken';
import { json } from '@sveltejs/kit';
import { request } from 'http';

const target = import.meta.env.VITE_TOKEN_ENDPOINT;
const clientID = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
const redirectURI = import.meta.env.VITE_REDIRECT_URI;

export async function GET({ locals, url, fetch }) {
    const code = url.searchParams.get('code');
    // console.log(code);
    const { access_token, id_token, scope } = await getAccessToken(fetch, code);
    // console.log(scope);
    // console.log(access_token);  
    // console.log(jwt.decode(id_token)); 
    
    let options = {
        status: 302,
        headers: {
            location: '/',
            'set-cookie': `token=${access_token || ''}; path=/; HttpOnly`
        }
    }

	return new Response(null, options);
}

function getAccessToken(fetch, code) {
    return fetch( target, {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + Buffer.from(`${clientID}:${clientSecret}`).toString('base64'),
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: redirectURI
        })
    })
     .then(response => {
        // console.log(response);
        if (response.ok) {
            return response.json();
        }
        throw new Error('Network response was not ok.');
     })
}