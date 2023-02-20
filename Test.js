const Firstock = require("./Classes/Firstock");

const firstock = new Firstock();

const userDetails = {
  userId:"",
  password:"",
  TOTP:"",
  vendorCode:"",
  apiKey:""
}

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

// firstock.logout((err, result)=>{
//     console.log("Error, ",err)
//     console.log("Result: ",result)
// })

// firstock.getUserDetails((err, result) => {
//   console.log("Error, ", err)
//   console.log("Result: ", result)
// })

// firstock.placeOrder(
//   {
//     exchange: "NSE",
//     tradingSymbol: "ITC-EQ",
//     quantity: "1",
//     price: "300",
//     product: "I",
//     transactionType: "B",
//     priceType: "MKT",
//     retention: "DAY",
//     triggerPrice: "",
//     remarks: "Add market protection",
//   },
//   (err, result) => {
//     console.log("Error, ", err);
//     console.log("Result: ", result);
//     orderNumber = result.data.orderNumber
//   }
// );

firstock.placeOrder(
  {
    exchange: "NSE",
    tradingSymbol: "ITC-EQ",
    quantity: "1",
    price: "300",
    product: "I",
    transactionType: "B",
    priceType: "MKT",
    retention: "DAY",
    triggerPrice: "",
    remarks: "Add market protection",
  },
  (err, result) => {
    console.log("Error, ", err);
    console.log("Place Result: ", result);
    orderNumber = result.data.orderNumber;
    modifyOrder(orderNumber);
  }
);

const modifyOrder = (orderNumber) => {
  firstock.modifyOrder(
    {
      orderNumber: orderNumber,
      price: "301",
      quantity: "1",
      triggerPrice: "301",
      tradingSymbol: "ITC-EQ",
      exchange: "NSE",
      priceType: "LMT",
    },
    (err, result) => {
      console.log("Error, ", err);
      console.log("modifyOrder Result: ", result);
      singleOrderHistory(orderNumber)
    }
  );
};

const cancelOrder = (orderNumber) => {
  firstock.cancelOrder({ orderNumber: orderNumber }, (err, result) => {
    console.log("Error, ", err);
    console.log("Cancel Result: ", result);
  });
};

const singleOrderHistory = (orderNumber) =>{
  firstock.singleOrderHistory({ orderNumber: orderNumber }, (err, result) => {
    console.log("Error, ", err)
    console.log("singleOrderHistory Result: ", result)
    cancelOrder(orderNumber)
})
}

// firstock.orderMargin({
//     exchange:"NSE",
//     tradingSymbol:"ITC-EQ",
//     quantity:"1",
//     price:"350",
//     product:"C",
//     transactionType:"B",
//     priceType:"LMT",
// },(err, result)=>{
//     console.log("Error, ", err)
//     console.log("Result: ", result)
// })

// firstock.orderBook((err, result)=>{
//     console.log("Error, ",err)
//     console.log("Result: ",result)
// })

// firstock.singleOrderHistory({ orderNumber: "22120600013252" }, (err, result) => {
//     console.log("Error, ", err)
//     console.log("Result: ", result)
// })

//getting error 401
// firstock.tradeBook((err, result)=>{
//     console.log("Error, ",err)
//     console.log("Result: ",result)
// })

//getting error 401
// firstock.positionsBook((err, result)=>{
//     console.log("Error, ",err)
//     console.log("Result: ",result)
// })

//getting error 401
// firstock.productConversion({
//     exchange: "NSE",
//     tradingSymbol: "ITC-EQ",
//     quantity: "1",
//     product: "C",
//     previousProduct: "I",
//     transactionType: "B",
//     positionType: "DAY"
// }, (err, result) => {
//     console.log("Error, ", err)
//     console.log("Result: ", result)
// })

// firstock.holdings({ product: "C" }, (err, result) => {
//     console.log("Error, ", err)
//     console.log("Result: ", result)
// })

// firstock.limits((err, result)=>{
//     console.log("Error, ",err)
//     console.log("Result: ",result)
// })

// firstock.getQuotes(
//   {
//     exchange: "NSE",
//     token: "26000",
//   },
//   (err, result) => {
//     console.log("Error, ", err);
//     console.log("Result: ", result);
//   }
// );

// firstock.searchScripts({ stext: "ITC" }, (err, result) => {
//   console.log("Error, ", err);
//   console.log("Result: ", result);
// });

// firstock.getSecurityInfo(
//   {
//     exchange: "NSE",
//     token: "26000",
//   },
//   (err, result) => {
//     console.log("Error, ", err);
//     console.log("Result: ", result);
//   }
// );

// firstock.getIndexList({exchange: "NSE"},(err, result)=>{
//     console.log("Error, ", err)
//     console.log("Result: ", result)
//     })

//getting 401 error
// firstock.getOptionChain(
//   {
//     tradingSymbol: "BANKNIFTY22SEP22C40000",
//     exchange: "NFO",
//     strikePrice: "40000",
//     count: "5",
//   },
//   (err, result) => {
//     console.log("Error, ", err);
//     console.log("Result: ", result);
//   }
// );

//getting error 401
// firstock.spanCalculator(
//   [
//     {
//       exchange: "NFO",
//       instname: "",
//       symbolName: "NIFTY",
//       expd: "08-DEC-2022",
//       optt: "CE",
//       strikePrice: "17000",
//       netQuantity: "50",
//     },
//     {
//       exchange: "NFO",
//       instname: "",
//       symbolName: "BANKNIFTY",
//       expd: "08-DEC-2022",
//       optt: "PE",
//       strikePrice: "40000",
//       netQuantity: "-25",
//     },
//   ],
//   (err, result) => {
//     console.log("Error, ", err);
//     console.log("Result: ", result);
//   }
// );

// firstock.timePriceSeries(
//   {
//     exchange: "NFO",
//     token: "37517",
//     endtime: "09/09/2022 15:29:00",
//     starttime: "09/09/2022 09:20:00",
//     intrv: "3",
//   },
//   (err, result) => {
//     console.log("Error, ", err);
//     console.log("Result: ", result);
//   }
// );

//getting error
// firstock.basketMargin(
//   {
//     exchange:"NFO",
//       tradingSymbol:"SAIL27OCT22P99",
//       quantity:"25",
//       transactionType:"S",
//       price,
//       product,
//       priceType,

//     data: [
//       {
//         exchange: "NFO",
//         tradingSymbol: "SAIL27OCT22P99",
//         quantity: "25",
//         transactionType: "S",
//       },
//     ],
//   },
//   (err, result) => {
//     console.log("Error, ", err);
//     console.log("Result: ", result);
//   }
// );

// firstock.optionGreek(
//   {
//     expiryDate: "8-DEC-2022",
//     strikePrice: "42000",
//     spotPrice: "39546",
//     initRate: "10",
//     volatility: "",
//     optionType: "",
//   },
//   (err, result) => {
//     console.log("Error, ", err);
//     console.log("Result: ", result);
//   }
// );

// firstock.multiPlaceOrder(
//   {
//     data: [
//       {
//         exchange: "NSE",
//         tradingSymbol: "ITC-EQ",
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

// firstock.bearPutSpread(
//   {
//     symbol: "NIFTY",
//     putBuyStrikePrice: "17500",
//     putSellStrikePrice: "17500",
//     expiry: "08DEC22",
//     product: "C",
//     quantity: "1",
//     remarks: "BearPutSpread",
//   },
//   (err, result) => {
//     console.log("Error, ", err);
//     console.log("Result: ", result);
//   }
// );

// firstock.bullCallSpread(
//   {
//     symbol: "NIFTY",
//     callBuyStrikePrice: "18000",
//     callSellStrikePrice: "17000",
//     expiry: "08DEC22",
//     product: "I",
//     quantity: "1",
//     remarks: "BullCallSpread",
//   },
//   (err, result) => {
//     console.log("Error, ", err);
//     console.log("Result: ", result);
//   }
// );

// firstock.longStrangle(
//   {
//     symbol: "NIFTY",
//     callStrikePrice: "18000",
//     putStrikePrice: "17000",
//     expiry: "08DEC22",
//     product: "I",
//     quantity: "1",
//     remarks: "longStrangle",
//   },
//   (err, result) => {
//     console.log("Error, ", err);
//     console.log("Result: ", result);
//   }
// );

// firstock.longStraddle(
//   {
//     symbol: "NIFTY",
//     strikePrice: "17000",
//     expiry: "08DEC22",
//     product: "I",
//     quantity: "1",
//     remarks: "longStraddle",
//   },
//   (err, result) => {
//     console.log("Error, ", err);
//     console.log("Result: ", result);
//   }
// );

// firstock.shortStraddle(
//   {
//     symbol: "NIFTY",
//     strikePrice: "17000",
//     expiry: "08DEC22",
//     product: "I",
//     quantity: "1",
//     remarks: "ShortStraddleWithoutHedge",
//     hedge: false,
//     hedgeValue: 300,
//   },
//   (err, result) => {
//     console.log("Error, ", err);
//     console.log("Result: ", result);
//   }
// );

// firstock.shortStrangle(
//   {
//     symbol: "NIFTY",
//     callStrikePrice: "17500",
//     putStrikePrice: "17000",
//     expiry: "08DEC22",
//     product: "I",
//     quantity: "1",
//     remarks: "ShortStrangleWithOutHedge",
//     hedge: false,
//     hedgeValue: 300,
//   },
//   (err, result) => {
//     console.log("Error, ", err);
//     console.log("Result: ", result);
//   }
// );

// const ws = firstock.initializeWebSocket();

// ws.on('open', function open() {
//     firstock.getWebSocketDetails((err, result) => {
//     if (!err) {
//         ws.send(result)
//     }
//     })
// });

// ws.on("error", function error(error) {
//     console.log(`WebSocket error: ${error}`)
// })

// ws.on('message', function message(data) {
//     const result = firstock.receiveWebSocketDetails(data)
//     console.log('Result: ', result)
//     ws.send(firstock.subscribeTouchline("NSE|26000#NSE|26009#NSE|26017"))
// });

module.exports = Firstock;
