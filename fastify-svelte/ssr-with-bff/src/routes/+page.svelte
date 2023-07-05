<script>
    export let data;

    let tokens = data.tokens;
    let user = data.user;

    let proxyBaseUrl = 'http://localhost:4180';
    let proxySignInEndPoint = '/oauth2/sign_in';
    let proxySignOutEndPoint = '/oauth2/sign_out';

    let asgardeoLogoutUrl = 'https://api.asgardeo.io/t/teeorg/oidc/logout';

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
<a href="{logoutUrl}">
    <button>Sign Out</button>
</a>
{/if}
