export async function load({ request }) {
    let access_token = request.headers.get('x-forwarded-access-token');
    let id_token = removeBearerPrefix(request.headers.get('authorization'));
    let email = request.headers.get('x-forwarded-email');
    let user_id = request.headers.get('x-forwarded-user');

    return {
        tokens: {
            access_token,
            id_token,
        },
        user: {
            email,
            id: user_id,
        },
    };
}

function removeBearerPrefix(inputString) {
    const bearerPrefix = "Bearer ";
    
    if (inputString?.startsWith(bearerPrefix)) {
      return inputString.slice(bearerPrefix.length);
    }
    
    return inputString;
  }
  