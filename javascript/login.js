async function loginWithDeriv() {

    const state = Math.random().toString(36).substring(2);

    sessionStorage.setItem(
        "oauth_state",
        state
    );

    const authUrl =
        "https://auth.deriv.com/oauth2/auth" +
        "?response_type=code" +
        "&client_id=33wy4dqfvjF15Q5BzAE1c" +
        "&redirect_uri=" +
        encodeURIComponent(
            "https://visionary-torte-8f2b75.netlify.app/callback.html"
        ) +
        "&scope=trade" +
        "&state=" + state;

    window.location.href = authUrl;
}