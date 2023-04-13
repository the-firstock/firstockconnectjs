const Firstock = require("./Classes/Firstock");

const firstock = new Firstock();

const userDetails = {
    userId: "CM2096",
    password: "Trade@13",
    TOTP: "1996",
    vendorCode: "CM2096_API",
    apiKey: "b7e9f4d9b9588a12c574ae709fb8c47d",
};

// firstock.login(
//   {
//     userId: userDetails.userId,
//     password: userDetails.password,
//     TOTP: userDetails.TOTP,
//     vendorCode: userDetails.vendorCode,
//     apiKey: userDetails.apiKey,
//   },
//   (err, result) => {
//     console.log("Error, ", err);
//     console.log("Result: ", result);
//   }
// );

// // //Initializer//
const ws = firstock.initializeWebSocket(2);

ws.on("open", function open() {
  firstock.getWebSocketDetails((err, result) => {
    if (!err) {
      firstock.initialSendWebSocketDetails(ws, result, () => {
        console.log("sending",firstock.subscribeFeedAcknowledgement("NSE|26000"))
        ws.send(firstock.subscribeFeedAcknowledgement("NSE|26000")); //Sending NIFTY 50 Token
        //Subscribe Feed
        // ws.send(firstock.subscribeFeed("NSE|22"))
        // ws.send(firstock.subscribeFeedAcknowledgement("NSE|26000#NSE|26009"))
        // ws.send(firstock.unsubscribeFeed("NSE|26000#NSE|26009#NSE|26017"))

        //Subscribe Depth
        //ws.send(firstock.subscribeDepth("NSE|26000"))
        //ws.send(firstock.subscribeDepthAcknowledgement("NSE|26000"))

        //Subscribe order
        //ws.send(firstock.subscribeOrderUpdate("TV0001"))
        //ws.send(firstock.subscribeOrderAcknowledgement());
      });
    }
  });
});

ws.on("error", function error(error) {
  console.log(`WebSocket error: ${error}`);
});

ws.on("message", function message(data) {
  const result = firstock.receiveWebSocketDetails(data);
  console.log("message: ", result);
  if (result["t"] === "tk" && result["ts"] === "Nifty 50") {
    console.log("sending2",firstock.subscribeFeedAcknowledgement("NSE|26009#NSE|26017"))
    ws.send(firstock.subscribeFeedAcknowledgement("NSE|26009#NSE|26017")); //Sending BANKNIFTY and INDIAVIX Token
  }
});
