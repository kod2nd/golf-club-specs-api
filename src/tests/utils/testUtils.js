const express = require("express");
const request = require("supertest");
const testApp = express();

const sendPostRequest = async (endpoint, data) => {
  return await request(testApp)
    .post(endpoint)
    .send(data);
};

const sendGetRequest = async endPoint => {
  return await request(testApp).get(endPoint);
};

const testUser = {
  name: "testUser1",
  email: "abc@123.com"
};

const testUser2 = {
  name: "testUser2",
  email: "abcd@1234.com"
};

const testShaft = {
  brand: "kbs",
  model: "tour 120",
  material: "steel",
  flex: "stiff",
  clubId: 1,
}

const testGrip = {
  brand: "golf pride",
  model: "mcc",
  size: "standard",
  wraps: "1",
  clubId: 1,
}

const testClub = {
  number: "PW",
  category: "wedge",
  brand: "mizuno",
  model: "MP-33",
  loft: "48",
  lie: "63",
  length: "34.5",
  shaft: testShaft,
  grip: testGrip
}

module.exports = {
  testApp,
  sendPostRequest,
  sendGetRequest,
  testData: {
    testUser,
    testUser2,
    testClub
  }
};
