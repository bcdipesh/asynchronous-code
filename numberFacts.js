"use strict";

const BASE_URL = "http://numbersapi.com/";
const numberFacts = document.querySelector(".number-facts");

const printToScreen = (data) => {
  const code = document.createElement("code");
  const br = document.createElement("br");
  code.append(JSON.stringify(data, null, 2));
  numberFacts.appendChild(code);
  numberFacts.appendChild(br);
};

// 1. Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number.
// (Make sure you get back JSON by including the json query key, specific to this API. Details.
const getNumberFacts = async (url) => {
  try {
    const res = await axios.get(url);
    printToScreen(res.data);
  } catch (err) {
    console.error(err);
  }
};

getNumberFacts(BASE_URL + "random" + "?json");

// 2. Figure out how to get data on multiple numbers in a single request.
// Make that request and when you get the data back, put all of the number facts on the page.
getNumberFacts(BASE_URL + "1..10");

// 3. Use the API to get 4 facts on your favorite number.
// Once you have them all, put them on the page. It’s okay if some of the facts are repeats.
getNumberFacts(BASE_URL + "19,25,28,09");
