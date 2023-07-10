<script>
    import { env } from '$env/dynamic/public';

    export let data;

    let tokens = data.tokens;
    let user = data.user;

    let proxyBaseUrl = env.PUBLIC_PROXY_BASE_URL;
    let proxySignInEndPoint = env.PUBLIC_PROXY_SIGN_IN_ENDPOINT;
    let proxySignOutEndPoint = env.PUBLIC_PROXY_SIGN_OUT_ENDPOINT;

    let asgardeoLogoutUrl = env.PUBLIC_ASGARDEO_LOGOUT_URL;

    function createPlainUrl(base, params) {
        let url = base
        if (params) {
            url += '?'
            for (let key in params) {
                if (params.hasOwnProperty(key)) {
                    url += key + '=' + params[key] + '&'
                }
            }
            url = url.slice(0, -1)
        }
        return url;
    }

    function createUrl(base, params) {
        let url = new URL(base);
        if (params) {
            for (let key in params) {
                if (params.hasOwnProperty(key)) {
                    url.searchParams.append(key, params[key]);
                }
            }
        }
        return url;
    }

    let unencodedSignOutRedirectUrl = createPlainUrl(asgardeoLogoutUrl, 
        { 
            id_token_hint: tokens?.id_token,
            post_logout_redirect_uri: proxyBaseUrl + '/', 
        }
    );

    let loginUrl = proxyBaseUrl + proxySignInEndPoint;
    let logoutUrl = createUrl(proxyBaseUrl + proxySignOutEndPoint, 
        { 
            rd: unencodedSignOutRedirectUrl 
        }
    );
</script>



{#if tokens.id_token == null}
<a href="{loginUrl}">
    <button>Sign In</button>
</a>
{:else}
Welcome {user.email}!

<br>
<br>
<a href="/profile">
    <button>View Profile</button>
</a>
<br>
<br>
<a href="/items">
    <button>View Items</button>
</a>
<br>
<br>
<a href="/external">
    <button>View External Items</button>
</a>
<br>
<br>
<a href="{logoutUrl}">
    <button>Sign Out</button>
</a>
{/if}
