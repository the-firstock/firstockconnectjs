const Firstock = require("./Classes/Firstock");

const firstock = new Firstock();

let orderNumber = "";

const userDetails = {
  userId: "",
  password: "",
  TOTP: "",
  vendorCode: "",
  apiKey: "",
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

// firstock.logout((err, result)=>{
//     console.log("Error, ",err)
//     console.log("Result: ",result)
// })

// firstock.getUserDetails((err, result) => {
//   console.log("getUserDetails Error, ", err);
//   console.log("getUserDetails Result: ", result);
// });

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
//     console.log("placeOrder Error, ", err);
//     console.log("placeOrder Result: ", result);
//     orderNumber = result.data.orderNumber
//   }
// );

//  firstock.placeOrder(
//    {
//      exchange: "NSE",
//      tradingSymbol: "ITC-EQ",
//      quantity: "1",
//      price: "300",
//      product: "I",
//      transactionType: "B",
//      priceType: "MKT",
//      retention: "DAY",
//      triggerPrice: "",
//      remarks: "Add market protection",
//    },
//    (err, result) => {
//      console.log("Error, ", err);
//      console.log("Place Result: ", result);
//      orderNumber = result.data.orderNumber;
//      modifyOrder(orderNumber);
//    }
//  );
//  const modifyOrder = (orderNumber) => {
//    firstock.modifyOrder(
//      {
//        orderNumber: orderNumber,
//        price: "301",
//        quantity: "1",
//        triggerPrice: "301",
//        tradingSymbol: "ITC-EQ",
//        exchange: "NSE",
//        priceType: "LMT",
//      },
//      (err, result) => {
//        console.log("Error, ", err);
//        console.log("modifyOrder Result: ", result);
//        singleOrderHistory(orderNumber)
//      }
//    );
//  };
//  const cancelOrder = (orderNumber) => {
//    firstock.cancelOrder({ orderNumber: orderNumber }, (err, result) => {
//      console.log("Error, ", err);
//      console.log("Cancel Result: ", result);
//    });
//  };
//  const singleOrderHistory = (orderNumber) =>{
//    firstock.singleOrderHistory({ orderNumber: orderNumber }, (err, result) => {
//      console.log("Error, ", err)
//      console.log("singleOrderHistory Result: ", result)
//      cancelOrder(orderNumber)
//  })
//  }
// firstock.orderMargin({
//     exchange:"NSE",
//     tradingSymbol:"ITC-EQ",
//     quantity:"1",
//     price:"350",
//     product:"C",
//     transactionType:"B",
//     priceType:"LMT",
// },(err, result)=>{
//     console.log("orderMargin Error, ", err)
//     console.log("orderMargin Result: ", result)
// })

// firstock.orderBook((err, result)=>{
//     console.log("Error, ",err)
//     console.log("orderBook Result: ",result)
// })

// firstock.singleOrderHistory({ orderNumber: "a22120600013252" }, (err, result) => {
//     console.log("singleOrderHistory Error, ", err)
//     console.log("singleOrderHistory Result: ", result)
// })

// ################################################################################################################################################################

// firstock.tradeBook((err, result) => {
//   console.log("tradeBook Error, ", err);
//   console.log("tradeBook Result: ", result);
// });

// firstock.positionsBook((err, result) => {
//   console.log("Error, ", err);
//   console.log("Result: ", result);
// });

// firstock.productConversion(
//   {
//     exchange: "NFO",
//     tradingSymbol: "NIFTY",
//     quantity: "250",
//     product: "C",
//     previousProduct: "I",
//     transactionType: "B",
//     positionType: "DAY",
//   },
//   (err, result) => {
//     console.log("productConversion Error, ", err);
//     console.log("productConversion Result: ", result);
//   }
// );

// firstock.holdings({ product: "C" }, (err, result) => {
//   console.log("Error, ", err);
//   console.log("holdings Result: ", result);
// });

// firstock.limits((err, result) => {
//   console.log("Error, ", err);
//   console.log("limits Result: ", result);
// });

// firstock.getQuotes(
//   {
//     exchange: "NSE",
//     token: "26000",
//   },
//   (err, result) => {
//     console.log("getQuotes Error, ", err);
//     console.log("getQuotes Result: ", result);
//   }
// );

// firstock.searchScripts({ stext: "ITC" }, (err, result) => {
//   console.log("searchScripts Error, ", err);
//   console.log("searchScripts Result: ", result);
// });

// firstock.getSecurityInfo(
//   {
//     exchange: "NSE",
//     token: "26000",
//   },
//   (err, result) => {
//     console.log("getSecurityInfo Error, ", err);
//     console.log("getSecurityInfo Result: ", result);
//   }
// );

// firstock.getIndexList({exchange: "NSE"},(err, result)=>{
//     console.log(" getIndexList Error, ", err)
//     console.log("getIndexList Result: ", result)
//     })

// firstock.getOptionChain(
//   {
//     tradingSymbol: "NIFTY02MAR23P17000",
//     exchange: "NFO",
//     strikePrice: "40000",
//     count: "5",
//   },
//   (err, result) => {
//     console.log("getOptionChain Error, ", err);
//     console.log("getOptionChain Result: ", result);
//   }
// );

// firstock.spanCalculator(
//   [
//     {
//       exchange: "NFO",
//       instrumentName: "",
//       symbolName: "NIFTY",
//       expireDate: "23-FEB-2023",
//       optionType: "CE",
//       strikePrice: "17000",
//       netQuantity: "50",
//     },
//     {
//       exchange: "NFO",
//       instrumentName: "",
//       symbolName: "BANKNIFTY",
//       expireDate: "23-FEB-2023",
//       optionType: "PE",
//       strikePrice: "40000",
//       netQuantity: "-25",
//     },
//   ],
//   (err, result) => {
//     console.log("spanCalculator Error, ", err);
//     console.log("spanCalculator Result: ", result);
//   }
// );

// firstock.timePriceSeries(
//   {
//     exchange: "NSE",
//     token: "22",
//     endTime: "22/02/2023 09:20:00",
//     startTime: "21/02/2023 15:29:00",
//     interval: "1",
//   },
//   (err, result) => {
//     console.log("timePriceSeries Error, ", err);
//     console.log("timePriceSeries Result: ", result);
//   }
// );

// firstock.basketMargin(
//   {
//     basket: [
//       {
//         exchange: "NSE",
//         tradingSymbol: "NESTLEIND-EQ",
//         quantity: "1",
//         transactionType: "S",
//         price: "1200",
//         product: "I",
//         priceType: "LMT",
//       },
//       {
//         exchange: "NSE",
//         tradingSymbol: "NESTLEIND-EQ",
//         quantity: "1",
//         transactionType: "S",
//         price: "1300",
//         product: "I",
//         priceType: "LMT",
//       },
//     ],
//   },
//   (err, result) => {
//     console.log("basketMargin Error, ", err);
//     console.log("basketMargin Result: ", result);
//   }
// );

// firstock.optionGreek(
//   {
//     expiryDate: "02-MAR-2023",
//     strikePrice: "17000",
//     spotPrice: "17890",
//     initRate: "10",
//     volatility: "20",
//     optionType: "PE",
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
//     console.log("multiPlaceOrder Error, ", err);
//     console.log("multiPlaceOrder Result: ", result);
//   }
// );

// firstock.bearPutSpread(
//   {
//     symbol: "NIFTY",
//     putBuyStrikePrice: "17500",
//     putSellStrikePrice: "17500",
//     expiry: "02MAR23",
//     product: "C",
//     quantity: "1",
//     remarks: "BearPutSpread",
//   },
//   (err, result) => {
//     console.log("bearPutSpread Error, ", err);
//     console.log("bearPutSpread Result: ", result);
//   }
// );

// firstock.bullCallSpread(
//   {
//     symbol: "NIFTY",
//     callBuyStrikePrice: "18000",
//     callSellStrikePrice: "17000",
//     expiry: "02MAR23",
//     product: "I",
//     quantity: "1",
//     remarks: "BullCallSpread",
//   },
//   (err, result) => {
//     console.log("bullCallSpread Error, ", err);
//     console.log("bullCallSpread Result: ", result);
//   }
// );

// firstock.longStrangle(
//   {
//     symbol: "NIFTY",
//     callStrikePrice: "18000",
//     putStrikePrice: "17000",
//     expiry: "23FEB23",
//     product: "I",
//     quantity: "1",
//     remarks: "longStrangle",
//   },
//   (err, result) => {
//     console.log("longStrangle Error, ", err);
//     console.log("longStrangle Result: ", result);
//   }
// );

// firstock.longStraddle(
//   {
//     symbol: "NIFTY",
//     strikePrice: "17000",
//     expiry: "02MAR23",
//     product: "I",
//     quantity: "1",
//     remarks: "longStraddle",
//   },
//   (err, result) => {
//     console.log("longStraddle Error, ", err);
//     console.log("longStraddle Result: ", result);
//   }
// );

// firstock.shortStraddle(
//   {
//     symbol: "NIFTY",
//     strikePrice: "17000",
//     expiry: "02MAR23",
//     product: "I",
//     quantity: "1",
//     remarks: "ShortStraddleWithoutHedge",
//     hedge: false,
//     hedgeValue: 300,
//   },
//   (err, result) => {
//     console.log("shortStraddle Error, ", err);
//     console.log("shortStraddle Result: ", result);
//   }
// );

firstock.shortStrangle(
  {
    symbol: "NIFTY",
    callStrikePrice: "17500",
    putStrikePrice: "17000",
    expiry: "02MAR23",
    product: "I",
    quantity: "1",
    remarks: "ShortStrangleWithOutHedge",
    hedge: false,
    hedgeValue: 300,
  },
  (err, result) => {
    console.log("Error, ", err);
    console.log("Result: ", result);
  }
);

// const ws = firstock.initializeWebSocket();

// ws.on('open', function open() {
//     firstock.getWebSocketDetails((err, result) => {
//     if (!err) {
//         ws.send(result)
//         console.log("is open")
//     }
//     })
// });

// ws.on("error", function error(error) {
//     console.log(`WebSocket error: ${error}`)
// })

// ws.on('message', function message(data) {
//     const result = firstock.receiveWebSocketDetails(data)
//     console.log('initializeWebSocket Result: ', result)
//     ws.send(firstock.subscribeTouchline("NSE|26000#NSE|26009#NSE|26017"))
// });

// module.exports = Firstock;
