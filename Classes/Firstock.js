"use strict";
const axios = require("axios");
const sha256 = require("sha256");
const Validations = require("../Validations/Validations");
const WebSocket = require("ws");
const Commonfunctions = require("../shared/Commonfunctions");
const CONSTANT = require("../shared/Constant");
const jsonObj = require("../config.json");
const { handleError, checkifUserLoggedIn, errorMessageMapping } =
  Commonfunctions;

let axiosInterceptor = axios.create({
  baseURL: CONSTANT.API_LINK,
});

const AFirstock = require("./AFirstock");

class Firstock extends AFirstock {
  constructor() {
    super();
    this.token = "";
    this.userId = "";
  }

  login({ userId, password, TOTP, vendorCode, apiKey }, callBack) {
    Validations.validateLogin({
      userId,
      password,
      TOTP,
      vendorCode,
      apiKey,
    });

    const encryptedPassword = sha256(password);

    axiosInterceptor
      .post(`login`, {
        userId,
        password: encryptedPassword,
        TOTP,
        vendorCode,
        apiKey,
      })
      .then((response) => {
        const { data } = response;
        this.token = data.data.susertoken;
        this.userId = data.data.actid;
        const finished = (error) => {
          if (error) {
            callBack(error, null);
            return;
          } else {
            callBack(null, data);
          }
        };
        Commonfunctions.readData((err, jsonData) => {
          if (err) {
            if (err.message === "Unexpected end of JSON input") {
              let obj = {};
              obj[data.data.actid] = {
                jKey: data.data.susertoken,
              };
              Commonfunctions.saveData({ ...obj }, "config.json", finished);
            } else {
              callBack(err, null);
            }
          } else {
            jsonData[data.data.actid] = {
              jKey: data.data.susertoken,
            };
            Commonfunctions.saveData({ ...jsonData }, "config.json", finished);
          }
        });
      })
      .catch((error) => {
        callBack(handleError(error), null);
      });
  }

  logout({ userId }, callBack) {
    Validations.validateplaceOrder();
    const currentUserId = userId;
    Commonfunctions.readData((err, data) => {
      if (err) {
        callBack(errorMessageMapping(err), null);
      } else {
        const userId = currentUserId;
        checkifUserLoggedIn({ userId, jsonData: data }, (err, data) => {
          if (err) {
            callBack(err, null);
          } else {
            const jKey = data;
            axiosInterceptor
              .post(`logout`, {
                userId,
                jKey,
              })
              .then((response) => {
                const { data } = response;
                const finished = (error) => {
                  if (error) {
                    callBack(error, null);
                    return;
                  } else {
                    callBack(null, data);
                  }
                };
                delete jsonObj[userId];
                Commonfunctions.saveData(
                  { ...jsonObj },
                  "config.json",
                  finished
                );
              })
              .catch((error) => {
                callBack(handleError(error), null);
              });
          }
        });
      }
    });
  }

  getUserDetails({ userId }, callBack) {
    const currentUserId = userId;
    Commonfunctions.readData((err, data) => {
      if (err) {
        callBack(errorMessageMapping(err), null);
      } else {
        const userId = currentUserId;
        checkifUserLoggedIn({ userId, jsonData: data }, (err, data) => {
          if (err) {
            callBack(err, null);
          } else {
            const jKey = data;
            axiosInterceptor
              .post(`userDetails`, {
                userId,
                jKey,
              })
              .then((response) => {
                const { data } = response;

                callBack(null, data);
              })
              .catch((error) => {
                callBack(handleError(error), null);
              });
          }
        });
      }
    });
  }

  placeOrder(
    {
      userId,
      exchange,
      tradingSymbol,
      quantity,
      price,
      product,
      transactionType,
      priceType,
      retention,
      remarks,
      triggerPrice,
    },
    callBack
  ) {
    Validations.validateplaceOrder();
    const currentUserId = userId;
    Commonfunctions.readData((err, data) => {
      if (err) {
        callBack(errorMessageMapping(err), null);
      } else {
        const userId = currentUserId;
        checkifUserLoggedIn({ userId, jsonData: data }, (err, data) => {
          if (err) {
            callBack(err, null);
          } else {
            const jKey = data;
            axiosInterceptor
              .post(`placeOrder`, {
                userId,
                jKey,
                exchange,
                tradingSymbol,
                quantity,
                price,
                product,
                transactionType,
                priceType,
                retention,
                remarks,
                triggerPrice,
              })
              .then((response) => {
                const { data } = response;

                callBack(null, data);
              })
              .catch((error) => {
                callBack(handleError(error), null);
              });
          }
        });
      }
    });
  }

  orderMargin(
    {
      userId,
      exchange,
      tradingSymbol,
      quantity,
      price,
      product,
      transactionType,
      priceType,
    },
    callBack
  ) {
    Validations.validateplaceOrder();
    const currentUserId = userId;
    Commonfunctions.readData((err, data) => {
      if (err) {
        callBack(errorMessageMapping(err), null);
      } else {
        const userId = currentUserId;
        checkifUserLoggedIn({ userId, jsonData: data }, (err, data) => {
          if (err) {
            callBack(err, null);
          } else {
            const jKey = data;
            axiosInterceptor
              .post(`orderMargin`, {
                userId,
                actid: userId,
                jKey,
                exchange,
                tradingSymbol,
                quantity,
                price,
                product,
                transactionType,
                priceType,
              })
              .then((response) => {
                const { data } = response;

                callBack(null, data);
              })
              .catch((error) => {
                callBack(handleError(error), null);
              });
          }
        });
      }
    });
  }

  orderBook({ userId }, callBack) {
    Validations.validateplaceOrder();
    const currentUserId = userId;
    Commonfunctions.readData((err, data) => {
      if (err) {
        callBack(errorMessageMapping(err), null);
      } else {
        const userId = currentUserId;
        checkifUserLoggedIn({ userId, jsonData: data }, (err, data) => {
          if (err) {
            callBack(err, null);
          } else {
            const jKey = data;
            axiosInterceptor
              .post(`orderBook`, {
                userId,
                jKey,
              })
              .then((response) => {
                const { data } = response;

                callBack(null, data);
              })
              .catch((error) => {
                callBack(handleError(error), null);
              });
          }
        });
      }
    });
  }

  cancelOrder({ userId, orderNumber }, callBack) {
    Validations.validateplaceOrder();
    const currentUserId = userId;
    Commonfunctions.readData((err, data) => {
      if (err) {
        callBack(errorMessageMapping(err), null);
      } else {
        const userId = currentUserId;
        checkifUserLoggedIn({ userId, jsonData: data }, (err, data) => {
          if (err) {
            callBack(err, null);
          } else {
            const jKey = data;

            axiosInterceptor
              .post(`cancelOrder`, {
                userId,
                jKey,
                orderNumber,
              })
              .then((response) => {
                const { data } = response;

                callBack(null, data);
              })
              .catch((error) => {
                callBack(handleError(error), null);
              });
          }
        });
      }
    });
  }

  modifyOrder(
    {
      userId,
      orderNumber,
      price,
      quantity,
      triggerPrice,
      tradingSymbol,
      exchange,
      priceType,
    },
    callBack
  ) {
    Validations.validateplaceOrder();
    const currentUserId = userId;
    Commonfunctions.readData((err, data) => {
      if (err) {
        callBack(err, null);
      } else {
        const userId = currentUserId;
        checkifUserLoggedIn({ userId, jsonData: data }, (err, data) => {
          if (err) {
            callBack(err, null);
          } else {
            const jKey = data;
            axiosInterceptor
              .post(`modifyOrder`, {
                userId,
                jKey,
                quantity,
                price,
                triggerPrice,
                orderNumber,
                exchange,
                tradingSymbol,
                priceType,
              })
              .then((response) => {
                const { data } = response;

                callBack(null, data);
              })
              .catch((error) => {
                callBack(handleError(error), null);
              });
          }
        });
      }
    });
  }

  singleOrderHistory({ userId, orderNumber }, callBack) {
    Validations.validateplaceOrder();
    const currentUserId = userId;
    Commonfunctions.readData((err, data) => {
      if (err) {
        callBack(errorMessageMapping(err), null);
      } else {
        const userId = currentUserId;
        checkifUserLoggedIn({ userId, jsonData: data }, (err, data) => {
          if (err) {
            callBack(err, null);
          } else {
            const jKey = data;
            axiosInterceptor
              .post(`singleOrderHistory`, {
                userId,
                jKey,
                orderNumber,
              })
              .then((response) => {
                const { data } = response;

                callBack(null, data);
              })
              .catch((error) => {
                callBack(handleError(error), null);
              });
          }
        });
      }
    });
  }

  tradeBook({ userId }, callBack) {
    Validations.validateplaceOrder();
    const currentUserId = userId;
    Commonfunctions.readData((err, data) => {
      if (err) {
        callBack(errorMessageMapping(err), null);
      } else {
        const userId = currentUserId;
        checkifUserLoggedIn({ userId, jsonData: data }, (err, data) => {
          if (err) {
            callBack(err, null);
          } else {
            const jKey = data;

            axiosInterceptor
              .post(`tradeBook`, {
                userId,
                jKey,
                actid: userId,
              })
              .then((response) => {
                const { data } = response;

                callBack(null, data);
              })
              .catch((error) => {
                callBack(handleError(error), null);
              });
          }
        });
      }
    });
  }

  positionsBook({ userId }, callBack) {
    Validations.validateplaceOrder();
    const currentUserId = userId;
    Commonfunctions.readData((err, data) => {
      if (err) {
        callBack(errorMessageMapping(err), null);
      } else {
        const userId = currentUserId;
        checkifUserLoggedIn({ userId, jsonData: data }, (err, data) => {
          if (err) {
            callBack(err, null);
          } else {
            const jKey = data;

            axiosInterceptor
              .post(`positionBook`, {
                userId,
                jKey,
                actid: userId,
              })
              .then((response) => {
                const { data } = response;

                callBack(null, data);
              })
              .catch((error) => {
                callBack(error, null);
              });
          }
        });
      }
    });
  }

  productConversion(
    {
      userId,
      exchange,
      tradingSymbol,
      quantity,
      product,
      transactionType,
      positionType,
      previousProduct,
    },
    callBack
  ) {
    Validations.validateplaceOrder();
    const currentUserId = userId;
    Commonfunctions.readData((err, data) => {
      if (err) {
        callBack(errorMessageMapping(err), null);
      } else {
        const userId = currentUserId;
        checkifUserLoggedIn({ userId, jsonData: data }, (err, data) => {
          if (err) {
            callBack(err, null);
          } else {
            const jKey = data;
            axiosInterceptor
              .post(`productConversion`, {
                userId,
                jKey,
                exchange,
                tradingSymbol,
                quantity,
                product,
                transactionType,
                positionType,
                previousProduct,
              })
              .then((response) => {
                const { data } = response;

                callBack(null, data);
              })
              .catch((error) => {
                callBack(handleError(error), null);
              });
          }
        });
      }
    });
  }

  holdings({ userId }, callBack) {
    Validations.validateplaceOrder();
    const currentUserId = userId;
    Commonfunctions.readData((err, data) => {
      if (err) {
        callBack(errorMessageMapping(err), null);
      } else {
        const userId = currentUserId;
        checkifUserLoggedIn({ userId, jsonData: data }, (err, data) => {
          if (err) {
            callBack(err, null);
          } else {
            const jKey = data;

            axiosInterceptor
              .post(`holdings`, {
                userId,
                jKey,
              })
              .then((response) => {
                const { data } = response;

                callBack(null, data);
              })
              .catch((error) => {
                callBack(handleError(error), null);
              });
          }
        });
      }
    });
  }

  limits({ userId }, callBack) {
    Validations.validateplaceOrder();
    const currentUserId = userId;
    Commonfunctions.readData((err, data) => {
      if (err) {
        callBack(errorMessageMapping(err), null);
      } else {
        const userId = currentUserId;
        checkifUserLoggedIn({ userId, jsonData: data }, (err, data) => {
          if (err) {
            callBack(err, null);
          } else {
            const jKey = data;
            axiosInterceptor
              .post(`limit`, {
                userId,
                jKey,
                actid: userId,
              })
              .then((response) => {
                const { data } = response;

                callBack(null, data);
              })
              .catch((error) => {
                callBack(handleError(error), null);
              });
          }
        });
      }
    });
  }

  getQuotes({ userId, exchange, tradingSymbol }, callBack) {
    Validations.validateplaceOrder();
    const currentUserId = userId;
    Commonfunctions.readData((err, data) => {
      if (err) {
        callBack(errorMessageMapping(err), null);
      } else {
        const userId = currentUserId;
        checkifUserLoggedIn({ userId, jsonData: data }, (err, data) => {
          if (err) {
            callBack(err, null);
          } else {
            const jKey = data;
            axiosInterceptor
              .post(`getQuote`, {
                userId,
                jKey,
                exchange,
                tradingSymbol,
              })
              .then((response) => {
                const { data } = response;

                callBack(null, data);
              })
              .catch((error) => {
                callBack(handleError(error), null);
              });
          }
        });
      }
    });
  }

  getMultiQuotes({ userId, readData }, callBack) {
    Validations.validateplaceOrder();
    const currentUserId = userId;
    Commonfunctions.readData((err, data) => {
      if (err) {
        callBack(errorMessageMapping(err), null);
      } else {
        const userId = currentUserId;
        checkifUserLoggedIn({ userId, jsonData: data }, (err, data) => {
          if (err) {
            callBack(err, null);
          } else {
            const jKey = data;

            axiosInterceptor
              .post(`getMultiQuotes`, {
                userId,
                jKey,
                data: readData,
              })
              .then((response) => {
                callBack(null, response.data);
              })
              .catch((error) => {
                callBack(handleError(error), null);
              });
          }
        });
      }
    });
  }

  getQuoteltp({ userId, exchange, tradingSymbol }, callBack) {
    Validations.validateplaceOrder();
    const currentUserId = userId;
    Commonfunctions.readData((err, data) => {
      if (err) {
        callBack(errorMessageMapping(err), null);
      } else {
        const userId = currentUserId;
        checkifUserLoggedIn({ userId, jsonData: data }, (err, data) => {
          if (err) {
            callBack(err, null);
          } else {
            const jKey = data;
            axiosInterceptor
              .post(`getQuote/ltp`, {
                userId,
                jKey,
                exchange,
                tradingSymbol,
              })
              .then((response) => {
                const { data } = response;

                callBack(null, data);
              })
              .catch((error) => {
                callBack(handleError(error), null);
              });
          }
        });
      }
    });
  }

  getMultiQuotesltp({ userId, readData }, callBack) {
    Validations.validateplaceOrder();
    const currentUserId = userId;
    Commonfunctions.readData((err, data) => {
      if (err) {
        callBack(errorMessageMapping(err), null);
      } else {
        const userId = currentUserId;
        checkifUserLoggedIn({ userId, jsonData: data }, (err, data) => {
          if (err) {
            callBack(err, null);
          } else {
            const jKey = data;
            axiosInterceptor
              .post(`getMultiQuotes/ltp`, {
                userId,
                jKey,
                data: readData,
              })
              .then((response) => {
                callBack(null, response.data);
              })
              .catch((error) => {
                callBack(handleError(error), null);
              });
          }
        });
      }
    });
  }

  searchScrips({ userId, stext }, callBack) {
    Validations.validateplaceOrder();
    const currentUserId = userId;
    Commonfunctions.readData((err, data) => {
      if (err) {
        callBack(errorMessageMapping(err), null);
      } else {
        const userId = currentUserId;
        checkifUserLoggedIn({ userId, jsonData: data }, (err, data) => {
          if (err) {
            callBack(err, null);
          } else {
            const jKey = data;
            axiosInterceptor
              .post(`searchScrips`, {
                userId,
                jKey,
                stext,
              })
              .then((response) => {
                const { data } = response;

                callBack(null, data);
              })
              .catch((error) => {
                callBack(handleError(error), null);
              });
          }
        });
      }
    });
  }

  getSecurityInfo({ userId, exchange, tradingSymbol }, callBack) {
    Validations.validateplaceOrder();
    const currentUserId = userId;
    Commonfunctions.readData((err, data) => {
      if (err) {
        callBack(errorMessageMapping(err), null);
      } else {
        const userId = currentUserId;
        checkifUserLoggedIn({ userId, jsonData: data }, (err, data) => {
          if (err) {
            callBack(err, null);
          } else {
            const jKey = data;
            axiosInterceptor
              .post(`securityInfo`, {
                userId,
                jKey,
                exchange,
                tradingSymbol,
              })
              .then((response) => {
                const { data } = response;

                callBack(null, data);
              })
              .catch((error) => {
                callBack(handleError(error), null);
              });
          }
        });
      }
    });
  }

  getIndexList({ userId, exchange }, callBack) {
    Validations.validateplaceOrder();
    const currentUserId = userId;
    Commonfunctions.readData((err, data) => {
      if (err) {
        callBack(errorMessageMapping(err), null);
      } else {
        const userId = currentUserId;
        checkifUserLoggedIn({ userId, jsonData: data }, (err, data) => {
          if (err) {
            callBack(err, null);
          } else {
            const jKey = data;
            axiosInterceptor
              .post(`indexList`, {
                userId,
                jKey,
                exchange,
              })
              .then((response) => {
                const { data } = response;

                callBack(null, data);
              })
              .catch((error) => {
                callBack(handleError(error), null);
              });
          }
        });
      }
    });
  }

  getOptionChain(
    { userId, exchange, tradingSymbol, strikePrice, count },
    callBack
  ) {
    Validations.validateplaceOrder();
    const currentUserId = userId;
    Commonfunctions.readData((err, data) => {
      if (err) {
        callBack(errorMessageMapping(err), null);
      } else {
        const userId = currentUserId;
        checkifUserLoggedIn({ userId, jsonData: data }, (err, data) => {
          if (err) {
            callBack(err, null);
          } else {
            const jKey = data;
            axiosInterceptor
              .post(`optionChain`, {
                userId,
                jKey,
                exchange,
                tradingSymbol,
                strikePrice,
                count,
              })
              .then((response) => {
                const { data } = response;

                callBack(null, data);
              })
              .catch((error) => {
                callBack(handleError(error), null);
              });
          }
        });
      }
    });
  }

  spanCalculator({ userId, readData }, callBack) {
    Validations.validateplaceOrder();
    const currentUserId = userId;
    Commonfunctions.readData((err, data) => {
      if (err) {
        callBack(errorMessageMapping(err), null);
      } else {
        const userId = currentUserId;
        checkifUserLoggedIn({ userId, jsonData: data }, (err, data) => {
          if (err) {
            callBack(err, null);
          } else {
            const jKey = data;
            axiosInterceptor
              .post(`spanCalculators`, {
                userId,
                jKey,
                data: readData,
              })
              .then((response) => {
                const { data } = response;

                callBack(null, data);
              })
              .catch((error) => {
                callBack(handleError(error), null);
              });
          }
        });
      }
    });
  }

  timePriceSeries(
    { userId, exchange, tradingSymbol, endTime, startTime, interval },
    callBack
  ) {
    Validations.validateplaceOrder();
    const currentUserId = userId;
    Commonfunctions.readData((err, data) => {
      if (err) {
        callBack(errorMessageMapping(err), null);
      } else {
        const userId = currentUserId;
        checkifUserLoggedIn({ userId, jsonData: data }, (err, data) => {
          if (err) {
            callBack(err, null);
          } else {
            const jKey = data;
            axiosInterceptor
              .post(`timePriceSeries`, {
                userId,
                jKey,
                exchange,
                tradingSymbol,
                endTime,
                startTime,
                interval,
              })
              .then((response) => {
                const { data } = response;

                callBack(null, data);
              })
              .catch((error) => {
                callBack(handleError(error), null);
              });
          }
        });
      }
    });
  }

  basketMargin({ userId, basket }, callBack) {
    Validations.validateplaceOrder();
    const currentUserId = userId;
    Commonfunctions.readData((err, dat) => {
      if (err) {
        callBack(errorMessageMapping(err), null);
      } else {
        const userId = currentUserId;
        checkifUserLoggedIn({ userId, jsonData: data }, (err, data) => {
          if (err) {
            callBack(err, null);
          } else {
            const jKey = dat;
            axiosInterceptor
              .post(`basketMargin`, {
                userId,
                jKey,
                basket,
              })
              .then((response) => {
                const { data } = response;

                callBack(null, data);
              })
              .catch((error) => {
                callBack(handleError(error), null);
              });
          }
        });
      }
    });
  }

  optionGreek(
    { expiryDate, strikePrice, spotPrice, initRate, volatility, optionType },
    callBack
  ) {
    Commonfunctions.readData((err, data) => {
      if (err) {
        callBack(err, null);
      } else {
        const userId = data.userId || this.userId;
        const jKey = data.token || this.token;
        axiosInterceptor
          .post(`optionGreek`, {
            userId,
            expiryDate,
            strikePrice,
            spotPrice,
            initRate,
            volatility,
            optionType,
            jKey,
          })
          .then((response) => {
            const { data } = response;

            callBack(null, data);
          })
          .catch((error) => {
            callBack(handleError(error), null);
          });
      }
    });
  }

  multiPlaceOrder({ userId, readData }, callBack) {
    Validations.validateplaceOrder();
    const currentUserId = userId;
    Commonfunctions.readData((err, data) => {
      if (err) {
        callBack(errorMessageMapping(err), null);
      } else {
        const userId = currentUserId;
        checkifUserLoggedIn({ userId, jsonData: data }, (err, data) => {
          if (err) {
            callBack(err, null);
          } else {
            const jKey = data;
            axiosInterceptor
              .post(`strategies/multiPlaceOrders`, {
                userId,
                jKey,
                data: readData,
              })
              .then((response) => {
                const { data } = response;

                callBack(null, data);
              })
              .catch((error) => {
                callBack(handleError(error), null);
              });
          }
        });
      }
    });
  }

  bearPutSpread(
    {
      userId,
      symbol,
      putBuyStrikePrice,
      putSellStrikePrice,
      expiry,
      product,
      quantity,
      remarks,
      exchange,
      priceType,
      retention,
    },
    callBack
  ) {
    Validations.validateplaceOrder();
    const currentUserId = userId;
    Commonfunctions.readData((err, data) => {
      if (err) {
        callBack(errorMessageMapping(err), null);
      } else {
        const userId = currentUserId;
        checkifUserLoggedIn({ userId, jsonData: data }, (err, data) => {
          if (err) {
            callBack(err, null);
          } else {
            const jKey = data;
            axiosInterceptor
              .post(`strategies/bearPutSpread`, {
                symbol,
                putBuyStrikePrice,
                putSellStrikePrice,
                expiry,
                product,
                quantity,
                remarks,
                jKey,
                userId,
                exchange,
                priceType,
                retention,
              })
              .then((response) => {
                const { data } = response;

                callBack(null, data);
              })
              .catch((error) => {
                callBack(handleError(error), null);
                console.log(error);
              });
          }
        });
      }
    });
  }

  bullCallSpread(
    {
      userId,
      symbol,
      callBuyStrikePrice,
      callSellStrikePrice,
      expiry,
      product,
      quantity,
      remarks,
      retention,
      priceType,
      exchange,
    },
    callBack
  ) {
    Validations.validateplaceOrder();
    const currentUserId = userId;
    Commonfunctions.readData((err, data) => {
      if (err) {
        callBack(errorMessageMapping(err), null);
      } else {
        const userId = currentUserId;
        checkifUserLoggedIn({ userId, jsonData: data }, (err, data) => {
          if (err) {
            callBack(err, null);
          } else {
            const jKey = data;
            axiosInterceptor
              .post(`strategies/bullCallSpread`, {
                symbol,
                callBuyStrikePrice,
                callSellStrikePrice,
                expiry,
                product,
                exchange,
                quantity,
                remarks,
                jKey,
                userId: userId,
                retention,
                priceType,
              })
              .then((response) => {
                const { data } = response;

                callBack(null, data);
              })
              .catch((error) => {
                callBack(handleError(error), null);
              });
          }
        });
      }
    });
  }

  longStrangle(
    {
      userId,
      symbol,
      callStrikePrice,
      putStrikePrice,
      expiry,
      product,
      quantity,
      remarks,
      retention,
      priceType,
      exchange,
    },
    callBack
  ) {
    Validations.validateplaceOrder();
    const currentUserId = userId;
    Commonfunctions.readData((err, data) => {
      if (err) {
        callBack(errorMessageMapping(err), null);
      } else {
        const userId = currentUserId;
        checkifUserLoggedIn({ userId, jsonData: data }, (err, data) => {
          if (err) {
            callBack(err, null);
          } else {
            const jKey = data;
            axiosInterceptor
              .post(`strategies/longStrangle`, {
                symbol,
                callStrikePrice,
                putStrikePrice,
                expiry,
                product,
                quantity,
                remarks,
                jKey,
                userId: userId,
                retention,
                priceType,
                exchange,
              })
              .then((response) => {
                const { data } = response;
                callBack(null, data);
              })
              .catch((error) => {
                callBack(handleError(error), null);
              });
          }
        });
      }
    });
  }

  longStraddle(
    {
      userId,
      symbol,
      strikePrice,
      expiry,
      product,
      quantity,
      remarks,
      retention,
      priceType,
      exchange,
    },
    callBack
  ) {
    Validations.validateplaceOrder();
    const currentUserId = userId;
    Commonfunctions.readData((err, data) => {
      if (err) {
        callBack(errorMessageMapping(err), null);
      } else {
        const userId = currentUserId;
        checkifUserLoggedIn({ userId, jsonData: data }, (err, data) => {
          if (err) {
            callBack(err, null);
          } else {
            const jKey = data;
            axiosInterceptor
              .post(`strategies/longStraddle`, {
                symbol,
                strikePrice,
                expiry,
                product,
                quantity,
                remarks,
                retention,
                priceType,
                exchange,
                jKey,
                userId,
              })
              .then((response) => {
                const { data } = response;
                callBack(null, data);
              })
              .catch((error) => {
                callBack(handleError(error), null);
              });
          }
        });
      }
    });
  }

  shortStraddle(
    {
      userId,
      symbol,
      callStrikePrice,
      putStrikePrice,
      expiry,
      product,
      quantity,
      remarks,
      hedge,
      hedgeValue,
      exchange,
      priceType,
      retention,
      strikePrice,
    },
    callBack
  ) {
    Validations.validateplaceOrder();
    const currentUserId = userId;
    Commonfunctions.readData((err, data) => {
      if (err) {
        callBack(errorMessageMapping(err), null);
      } else {
        const userId = currentUserId;
        checkifUserLoggedIn({ userId, jsonData: data }, (err, data) => {
          if (err) {
            callBack(err, null);
          } else {
            const jKey = data;
            axiosInterceptor
              .post(`strategies/shortStraddle`, {
                userId,
                symbol,
                strikePrice,
                callStrikePrice,
                putStrikePrice,
                expiry,
                product,
                quantity,
                remarks,
                hedge,
                hedgeValue,
                exchange,
                priceType,
                retention,
                jKey,
              })
              .then((response) => {
                const { data } = response;
                callBack(null, data);
              })
              .catch((error) => {
                callBack(handleError(error), null);
                console.log(error);
              });
          }
        });
      }
    });
  }

  shortStrangle(
    {
      userId,
      symbol,
      callStrikePrice,
      putStrikePrice,
      expiry,
      product,
      quantity,
      remarks,
      hedge,
      hedgeValue,
      exchange,
      priceType,
      retention,
      strikePrice,
    },
    callBack
  ) {
    Validations.validateplaceOrder();
    const currentUserId = userId;
    Commonfunctions.readData((err, data) => {
      if (err) {
        callBack(errorMessageMapping(err), null);
      } else {
        const userId = currentUserId;
        checkifUserLoggedIn({ userId, jsonData: data }, (err, data) => {
          if (err) {
            callBack(err, null);
          } else {
            const jKey = data;
            axiosInterceptor
              .post(`strategies/shortStrangle`, {
                symbol,
                callStrikePrice,
                putStrikePrice,
                expiry,
                product,
                quantity,
                remarks,
                jKey,
                userId: userId,
                hedge,
                hedgeValue,
                exchange,
                priceType,
                retention,
                strikePrice,
              })
              .then((response) => {
                const { data } = response;
                callBack(null, data);
              })
              .catch((error) => {
                callBack(handleError(error), null);
              });
          }
        });
      }
    });
  }

  //Websockets Start
  initializeWebSocket(number = 1) {
    if (number === 1) {
      const ws = new WebSocket(CONSTANT.WSS_LINK1);
      return ws;
    }
    if (number === 2) {
      const ws = new WebSocket(CONSTANT.WSS_LINK2);
      return ws;
    } else {
      throw "Websocket 1 and 2 are allowed";
    }
  }

  getWebSocketDetails(callBack) {
    Commonfunctions.readData((err, data) => {
      if (err) {
        callBack(err, null);
      }
      const params = {
        t: "c",
        uid: data.userId,
        actid: data.userId,
        susertoken: data.token,
        source: "API",
      };
      callBack(null, JSON.stringify(params));
    });
  }

  sendWebSocketDetails({ t, k, actid = "" }) {
    const messageData = {
      t,
      k,
      actid,
    };
    return JSON.stringify(messageData);
  }

  initialSendWebSocketDetails(ws, result, callback) {
    ws.send(result);
    let that = this;
    ws.on("message", function message(data) {
      const result = that.receiveWebSocketDetails(data);
      if (result["s"] === "OK") {
        callback();
      }
    });
  }

  subscribeFeed(k) {
    const messageData = {
      t: "tf",
      k,
    };
    return JSON.stringify(messageData);
  }

  subscribeFeedAcknowledgement(k) {
    const messageData = {
      t: "t",
      k,
    };
    return JSON.stringify(messageData);
  }

  unsubscribeFeed(k) {
    const messageData = {
      t: "u",
      k,
    };
    return JSON.stringify(messageData);
  }

  subscribeDepth(k) {
    const messageData = {
      t: "df",
      k,
    };
    return JSON.stringify(messageData);
  }
  subscribeDepthAcknowledgement(k) {
    const messageData = {
      t: "d",
      k,
    };
    return JSON.stringify(messageData);
  }
  unsubscribeDepth(k) {
    const messageData = {
      t: "ud",
      k,
    };
    return JSON.stringify(messageData);
  }
  subscribeOrderUpdate(actid) {
    const messageData = {
      t: "o",
      actid,
    };
    return JSON.stringify(messageData);
  }
  subscribeOrderAcknowledgement() {
    const messageData = {
      t: "ok",
    };
    return JSON.stringify(messageData);
  }
  unsubscribeOrderUpdate() {
    const messageData = {
      t: "uo",
    };
    return JSON.stringify(messageData);
  }
  receiveWebSocketDetails(data) {
    const decodedJsonObject = Buffer.from(data, "base64").toString("ascii");
    return JSON.parse(decodedJsonObject);
  }

  //Websockets End
}

module.exports = Firstock;
