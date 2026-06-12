// frontend/javascript/dashboard.js

document.addEventListener("DOMContentLoaded", () => {

    loadAccountInfo();

    const logoutBtn =
        document.getElementById("logoutBtn");

    if (logoutBtn) {

        logoutBtn.addEventListener(
            "click",
            logout
        );

    }

});

// Load account information
async function loadAccountInfo() {

    try {

        const token =
            localStorage.getItem(
                "deriv_access_token"
            );

        if (!token) {

            document.getElementById(
                "accountId"
            ).innerText =
                "Not Connected";

            document.getElementById(
                "balance"
            ).innerText =
                "0.00";

            return;

        }

        const API_BASE_URL =
    "https://visionary-torte-8f2b75.netlify.app";

const response =
    await fetch(
        `${API_BASE_URL}/api/auth/balance`,
        {
            method: "GET",
            headers: {
                Authorization:
                    `Bearer ${token}`
            }
        }
    );

        const data =
            await response.json();

        console.log(
            "Balance Response:",
            data
        );

        document.getElementById(
            "accountId"
        ).innerText =
            data.loginid ||
            "Unknown";

        document.getElementById(
            "balance"
        ).innerText =
            `${data.currency || ""} ${data.balance || 0}`;

    } catch (error) {

        console.error(
            "Dashboard Error:",
            error
        );

        document.getElementById(
            "accountId"
        ).innerText =
            "Connection Error";

        document.getElementById(
            "balance"
        ).innerText =
            "--";

    }

}

// Logout
function logout() {

    localStorage.removeItem(
        "deriv_access_token"
    );

    localStorage.removeItem(
        "deriv_auth_code"
    );

    localStorage.removeItem(
        "oauth_state"
    );

    window.location.href =
        "/index.html";

}