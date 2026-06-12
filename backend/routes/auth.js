const authUrl =
  `https://auth.deriv.com/oauth2/auth?` +
  `response_type=code` +
  `&client_id=${clientId}` +
  `&redirect_uri=${encodeURIComponent(
    redirectUri
  )}` +
  `&scope=trade+account_manage` +
  `&state=${state}` +
  `&code_challenge=${codeChallenge}` +
  `&code_challenge_method=S256`;

console.log(authUrl);

window.location.href = authUrl;