# The Firstock Connect API Nodejs client - v3

To communicate with the Firstock Connect API using Nodejs, you can use the official Nodejs client library provided by Firstock.
`<br />` Licensed under the MIT License.

[Version - 3.0.](https://www.npmjs.com/package/thefirstock)2

## Documentation

* Nodejs client documentation

## v3 - Changes

* Error code response structured has been changed
* Renamed

## Installing the client

Use the package manager [npm](https://www.npmjs.com/) to install thefirstock.

```bash
npm install thefirstock
```

## API usage

```javascript
const Firstock = require('thefirstock');

const firstock = new Firstock();

// Login using firstock account//
firstock.login({
    "userId": "",
    "password": "",
    "DOBnPAN": "",
    "vendorCode": "",
    "apiKey": ""
},(err, result)=>{
    console.log("Error, ",err)
    console.log("Result: ",result)
})


//Place an order//
firstock.placeOrder(
  {
    exchange: "",
    tradingSymbol: "",
    quantity: "",
    price: "",
    product: "",
    transactionType: "",
    priceType: "",
    retention: "",
    triggerPrice: "",
    remarks: "",
  },
  (err, result) => {
    console.log("Error, ", err);
    console.log("Result: ", result);
  }
);

//Fetch single order deatils//
firstock.singleOrderHistory({ orderNumber: "" }, (err, result) => {
  console.log("Error, ", err);
  console.log("Result: ", result);
});


//Order book//
firstock.orderBook((err, result) => {
  console.log("Error, ", err);
  console.log("Result: ", result);
});

//Cancel order//
firstock.cancelOrder({ orderNumber: "" }, (err, result) => {
  console.log("Error, ", err);
  console.log("Result: ", result);
});


//Historical data// 
firstock.timePriceSeries(
  {
    exchange: "",
    token: "",
    endTime: "",
    startTime: "",
    intrv: "",
  },
  (err, result) => {
    console.log("Error, ", err);
    console.log("Result: ", result);
  }
);
```

Refer to the [Firstock Connect Documentation](https://connect.thefirstock.com/)  for the complete list of supported methods.

## WebSocket usage

```javascript
//Initializer//
const ws = firstock.initializeWebSocket();

ws.on("open", function open() {
  firstock.getWebSocketDetails((err, result) => {
    if (!err) {
      ws.send(result);
    }
  });
});

ws.on("error", function error(error) {
  console.log(`WebSocket error: ${error}`);
});

ws.on("message", function message(data) {
  const result = firstock.receiveWebSocketDetails(data);
    //Prints the message successfully//
  console.log("Result: ", result);
   
    //Establishment of connection for required symbol//
  ws.send(firstock.subscribeFeedAcknowledgement("NSE|26000")); // Subscribe to NIFTY
  ws.send(firstock.subscribeFeedAcknowledgement("NSE|26009")); // Subscribe to BANKNIFTY
});
```

## Changelog

Check release notes.
