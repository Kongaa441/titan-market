// frontend/javascript/oauth.js

const CLIENT_ID = "CR00159669";

const REDIRECT_URI =
  "https://visionary-torte-8f2b75.netlify.app/callback.html";
// Generate PKCE Code Verifier
function generateCodeVerifier() {
  const array = crypto.getRandomValues(
    new Uint8Array(64)
  );

  return Array.from(array)
    .map(
      v =>
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~"[
          v % 66
        ]
    )
    .join("");
}

// Generate PKCE Challenge
async function generateCodeChallenge(
  codeVerifier
) {
  const data = new TextEncoder().encode(
    codeVerifier
  );

  const hash = await crypto.subtle.digest(
    "SHA-256",
    data
  );

  return btoa(
    String.fromCharCode(
      ...new Uint8Array(hash)
    )
  )
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

// OAuth Login
document.addEventListener(
  "DOMContentLoaded",
  () => {
    const loginBtn =
      document.getElementById("derivLoginBtn");

    if (!loginBtn) {
      console.error(
        "Button #derivLogin not found"
      );
      return;
    }

    loginBtn.addEventListener(
      "click",
      async () => {
        try {
          const codeVerifier =
            generateCodeVerifier();

          localStorage.setItem(
            "code_verifier",
            codeVerifier
          );

          const codeChallenge =
            await generateCodeChallenge(
              codeVerifier
            );

          const state =
            crypto.randomUUID();

          localStorage.setItem(
            "oauth_state",
            state
          );

          const authUrl =
            `https://auth.deriv.com/oauth2/auth?` +
            `response_type=code` +
            `&client_id=${CLIENT_ID}` +
            `&redirect_uri=${encodeURIComponent(
              REDIRECT_URI
            )}` +
            `&scope=trade account_manage` +
            `&state=${state}` +
            `&code_challenge=${codeChallenge}` +
            `&code_challenge_method=S256`;

console.log("AUTH URL:", authUrl);

alert(authUrl);

window.location.href = authUrl;
        } catch (error) {
          console.error(
            "OAuth Error:",
            error
          );
        }
      }
    );
  }
);