// frontend/javascript/callback.js

const status =
  document.getElementById("status");

async function handleCallback() {
  try {

    const params =
      new URLSearchParams(
        window.location.search
      );

    const code =
      params.get("code");

    const state =
      params.get("state");

    const savedState =
      localStorage.getItem(
        "oauth_state"
      );

    if (!code) {

      status.innerHTML =
        "Authorization code not found.";

      return;
    }

    if (state !== savedState) {

      status.innerHTML =
        "Invalid OAuth state.";

      return;
    }

   status.innerHTML =
  "Authorization successful.<br><br>" +
  "Code: " + code;

console.log(
  "Authorization Code:",
  code
);

    localStorage.setItem(
      "deriv_auth_code",
      code
    );

    // Temporary redirect
setTimeout(() => {

  window.location.href =
    "/dashboard.html";

}, 10000);

  } catch (error) {

    console.error(error);

    status.innerHTML =
      "OAuth callback error.";

  }
}

handleCallback();