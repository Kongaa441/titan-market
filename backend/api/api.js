const WebSocket = require("ws");

let ws = null;

function connectDeriv() {

  const token = process.env.DERIV_API_TOKEN;

  if (!token) {
    console.log("DERIV_API_TOKEN not found");
    return;
  }

  ws = new WebSocket(
    "wss://ws.derivws.com/websockets/v3?app_id=1089"
  );

  ws.on("open", () => {

    console.log("Connected to Deriv");

    ws.send(
      JSON.stringify({
        authorize: token
      })
    );

  });

  ws.on("message", (data) => {

    const response = JSON.parse(data);

    console.log("FULL RESPONSE:", response);

    // Handle errors first
    if (response.error) {

      console.log(
        "Deriv Error:",
        response.error.message
      );

      return;
    }

    // Authorized successfully
    if (
      response.msg_type === "authorize" &&
      response.authorize
    ) {

      console.log(
        "Deriv Authorized:",
        response.authorize.loginid
      );

      console.log(
        "Balance:",
        response.authorize.balance
      );

    }

  });

  ws.on("close", () => {

    console.log(
      "Deriv connection closed"
    );

  });

  ws.on("error", (err) => {

    console.log(
      "WebSocket Error:",
      err.message
    );

  });

}

module.exports = {
  connectDeriv
};