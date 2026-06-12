document
.getElementById("derivLoginBtn")
.addEventListener("click", async () => {

const array =
crypto.getRandomValues(
new Uint8Array(64)
);

const codeVerifier =
Array.from(array)
.map(v =>
'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~'[v % 66]
)
.join('');

const hash =
await crypto.subtle.digest(
'SHA-256',
new TextEncoder().encode(codeVerifier)
);

const codeChallenge =
btoa(
String.fromCharCode(
...new Uint8Array(hash)
)
)
.replace(/\+/g, '-')
.replace(/\//g, '_')
.replace(/=+$/, '');

const state =
Math.random()
.toString(36)
.substring(2);

sessionStorage.setItem(
'pkce_code_verifier',
codeVerifier
);

sessionStorage.setItem(
'oauth_state',
state
);

const clientId =
"33wy4dqfvjF15Q5BzAE1c";

const redirectUri =
"http://localhost:5500/callback.html";

window.location.href =
`https://auth.deriv.com/oauth2/auth
?response_type=code
&client_id=${clientId}
&redirect_uri=${encodeURIComponent(redirectUri)}
&scope=trade+account_manage
&state=${state}
&code_challenge=${codeChallenge}
&code_challenge_method=S256`;

});