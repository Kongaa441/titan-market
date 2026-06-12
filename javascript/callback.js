// frontend/javascript/callback.js

const status = document.getElementById("status");

async function handleCallback() {
  try {

    const params = new URLSearchParams(
      window.location.search
    );

    console.log(
      "Full URL:",
      window.location.href
    );

    console.log(
      "Search:",
      window.location.search
    );

    const code =
      params.get("code");

    const state =
      params.get("state");

    console.log(
      "Authorization Code:",
      code
    );

    console.log(
      "OAuth State:",
      state
    );

    const savedState =
      localStorage.getItem(
        "oauth_state"
      );

    console.log(
      "Saved State:",
      savedState
    );

    if (!code) {

      status.innerHTML =
        "Authorization code not found.<br><br>" +
        "URL: " +
        window.location.href;

      console.error(
        "No authorization code received."
      );

      return;
    }

    if (state !== savedState) {

      status.innerHTML =
        "Invalid OAuth state.";

      console.error(
        "State mismatch."
      );

      return;
    }

    localStorage.setItem(
      "deriv_auth_code",
      code
    );

    status.innerHTML =
      "Authorization successful.<br><br>" +
      "Code: " +
      code;

    console.log(
      "Authorization code saved."
    );

    setTimeout(() => {

      window.location.href =
        "/dashboard.html";

    }, 10000);

  } catch (error) {

    console.error(
      "OAuth callback error:",
      error
    );

    status.innerHTML =
      "OAuth callback error.<br><br>" +
      error.message;
  }
}

handleCallback();