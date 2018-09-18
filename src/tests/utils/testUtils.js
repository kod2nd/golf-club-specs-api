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

module.exports = {
  testApp,
  sendPostRequest,
  sendGetRequest
};
