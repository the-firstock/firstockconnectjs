const fs = require("fs");

const saveData = (data, file, callback) => {
  const path = "./config.json";
  const jsonData = JSON.stringify(data, null, 2);
  fs.writeFile(path, jsonData, callback);
};

const readData = (callback) => {
  const path = "./config.json";
  fs.readFile(path, "utf-8", (err, jsonString) => {
    if (err) {
      callback(err, null);
    } else {
      try {
        const data = JSON.parse(jsonString);
        callback(null, data);
        // if (checkifUserLoggedIn(data)) {
        //   callback(null, data);
        // } else {
        //   callback("Please login to Firstock", null);
        // }
      } catch (error) {
        callback(error, null);
      }
    }
  });
};

const checkifUserLoggedIn = ({ userId, jsonData }, callback) => {
  console.log(jsonData[userId]);
  if (jsonData[userId]) {
    const jKey = jsonData[userId].jKey;
    callback(null, jKey);
  } else {
    callback("Please login to Firstock", null);
  }
};

const jsonErrorMessage = {
  "Unexpected end of JSON input": "Please login to Firstock",
};

const errorMessageMapping = (jsonData) => {
  return jsonErrorMessage[jsonData.message] ?? jsonData.message;
};

const validateBasketMarginObject = (data) => {
  if (
    data["exchange"] &&
    data["tradingSymbol"] &&
    data["quantity"] &&
    data["transactionType"]
  ) {
    return true;
  }
  return false;
};

const validateBasketMargin = (data) => {
  return data.every((a) => validateBasketMarginObject(a));
};

const handleError = (error) => {
  if (error) {
    if (error.response) {
      if (error.response.data) {
        return error.response.data;
      } else {
        return error.response;
      }
    } else {
      return error;
    }
  }
  return "error";
};

module.exports = {
  saveData,
  readData,
  validateBasketMarginObject,
  validateBasketMargin,
  handleError,
  checkifUserLoggedIn,
  errorMessageMapping,
};
