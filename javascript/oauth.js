// frontend/javascript/oauth.js

const CLIENT_ID = "33wy4dqfvjF15Q5BzAE1c";

const REDIRECT_URI =
  "https://danis-eldo-fx-danis.netlify.app/callback.html";

// Generate code_verifier
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

// Generate code_challenge
async function generateChallenge(codeVerifier) {
  const hash = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(codeVerifier)
  );

  return btoa(
    String.fromCharCode(...new Uint8Array(hash))
  )
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

// Login button
document.addEventListener(
  "DOMContentLoaded",
  () => {
    const loginBtn =
      document.getElementById("derivLogin");

    if (!loginBtn) return;

    loginBtn.addEventListener(
      "click",
      async () => {
        try {
          const codeVerifier =
            generateCodeVerifier();

          localStorage.setItem(
            "deriv_code_verifier",
            codeVerifier
          );

          const challenge =
            await generateChallenge(
              codeVerifier
            );

          const state =
            crypto.randomUUID();

          localStorage.setItem(
            "deriv_state",
            state
          );

          const authUrl =
            `https://auth.deriv.com/oauth2/auth?` +
            `client_id=${CLIENT_ID}` +
            `&redirect_uri=${encodeURIComponent(
              REDIRECT_URI
            )}` +
            `&response_type=code` +
            `&scope=trade` +
            `&code_challenge=${challenge}` +
            `&code_challenge_method=S256` +
            `&state=${state}`;

          window.location.href =
            authUrl;
        } catch (err) {
          console.error(err);
        }
      }
    );
  }
);
document.addEventListener(
  "DOMContentLoaded",
  () => {

    const loginBtn =
      document.getElementById(
        "derivLogin"
      );

    if (!loginBtn) {
      console.error(
        "Login button not found"
      );
      return;
    }

    loginBtn.addEventListener(
      "click",
      async () => {

        // Build OAuth URL

      }
    );
  }
);
