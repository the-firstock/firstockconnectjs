const Firstock = require("./Classes/Firstock");

const firstock = new Firstock();

// firstock.logout((err, result)=>{
//     console.log("Error, ",err)
//     console.log("Result: ",result)
// })

firstock.login(
  {
    userId: "NP2997",
    password: "S2Czg$6E",
    TOTP: "1997",
    vendorCode: "NP2997_API",
    apiKey: "c80d0a418bda53e00693a739358d2688",
  },
  (err, result) => {
    console.log("Error, ", err);
    console.log("Result: ", result);
  }
);

// firstock.login(
//   {
//     userId: "PP1583",
//     password: "Trade@66",
//     TOTP: "1983",
//     vendorCode: "PP1583_API",
//     apiKey: "40539595d30507d7ed22ba4f0785e4c0",
//   },
//   (err, result) => {
//     console.log("Error, ", err);
//     console.log("Result: ", result);
//   }
// );

// firstock.positionsBook((err, result) => {
//   console.log("Error, ", err);
//   console.log("Result: ", result);
// });

// firstock.multiPlaceOrder(
//   {
//     data: [
//       {
//         exchange: "NFO",
//         tradingSymbol:"NIFTY02FEB23P18100",
//         quantity: "1",
//         price: "0",
//         product: "I",
//         transactionType: "S",
//         priceType: "MKT",
//         retention: "DAY",
//         triggerPrice: "",
//         remarks: "Test1",
//       },
//     ],
//   },
//   (err, result) => {
//     console.log("Error, ", err);
//     console.log("Result: ", result);
//   }
// );

// firstock.orderBook((err, result)=>{
//     console.log("Error, ",err)
//     console.log("Result: ",result)
// })

const ws = firstock.initializeWebSocket();

// ws.on("open", function open() {
//   firstock.getWebSocketDetails((err, result) => {
//     if (!err) {
//       ws.send(result);
//     }
//   });
// });

// ws.on("error", function error(error) {
//   console.log(`WebSocket error: ${error}`);
// });

// ws.on("message", function message(data) {
//   const result = firstock.receiveWebSocketDetails(data);
//   console.log("Result: ", result);
//   ws.send(firstock.subscribeFeedAcknowledgement("NSE|26000#NSE|26009#NSE|1660"));
// });

module.exports = Firstock;
