const express = require("express");
const request = require("supertest");
const usersRouter = require("../routes/users");
const { sequelizeTest } = require("../tests/testDbConfig");

const testApp = express();
usersRouter(testApp);

const testUser = {
    name: "testUser1",
    email: "abc@123.com"
}

const sendPostRequest = async (data) => {
    return await request(testApp).post('/users').send(data)
}

describe("Users test", () => {
  beforeEach(async () => {
    await sequelizeTest.sync({ force: true });
  });

  describe("/POST", () => {
      it("To have a response status of 201", async () => {
        const response = await sendPostRequest(testUser)
        expect(response.status).toBe(201)
    });
  });

  afterEach(async () => {
    await sequelizeTest.drop();
  });
});
