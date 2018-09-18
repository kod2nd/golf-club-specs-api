const express = require("express");
const request = require("supertest");
const usersRouter = require("../routes/users");
const { sequelize, User } = require("../config/sequelizeConfig");

const testApp = express();
usersRouter(testApp);

const testUser = {
  name: "testUser1",
  email: "abc@123.com"
};

const testUser2 = {
  name: "testUser2",
  email: "abcd@1234.com"
};

const sendPostRequest = async data => {
  return await request(testApp)
    .post("/users")
    .send(data);
};
const sendGetRequest = async () => {
  return await request(testApp).get("/users");
};

describe("Users test", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  describe("/POST", async () => {
    it("Creates an entry in the User table when a name and email are passed in the body", async () => {
      const response = await sendPostRequest(testUser);
      const user = await User.findOne({ where: { name: testUser.name } });
      expect(response.status).toBe(201);
      expect(user.name).toBe(testUser.name);
    });
    it("Does not create an entry in the User table when empty body is passed", async () => {
      const response = await sendPostRequest();
      const user = await User.findOne({ where: { name: testUser.name } });
      expect(response.status).toBe(500);
      expect(user).toBe(null);
    });
    it("Does not create an entry in the User table when email is left empty", async () => {
      const response = await sendPostRequest({ name: "test2" });
      const user = await User.findOne({ where: { name: "test2" } });
      expect(response.status).toBe(500);
      expect(user).toBe(null);
    });
    it("Does not create an entry in the User table when name is left empty", async () => {
      const response = await sendPostRequest({ email: "testemail@email.com" });
      const user = await User.findOne({
        where: { email: "testemail@email.com" }
      });
      expect(response.status).toBe(500);
      expect(user).toBe(null);
    });
    it("Creates more than 1 entry when multiple postrequests are sent", async () => {
      await sendPostRequest(testUser);
      await sendPostRequest(testUser2);

      const users = await User.findAll();
      expect(users).toHaveLength(2);
    });
    it("Does not create an entry if email is not unique", async () => {
      await sendPostRequest(testUser);
      await sendPostRequest({
        name: "duplicateEmail",
        email: "abc@123.com"
      });
      const users = await User.findAll();
      expect(users).toHaveLength(1);
    });
  });

  describe("/GET", () => {
    it("should return a list of all users ", async () => {
      // Setup
      await sendPostRequest(testUser);
      await sendPostRequest(testUser2);
      // Tests
      const response = await sendGetRequest()
      expect(response.status).toBe(200)
      expect(response.body).toHaveLength(2);
    });
  });

  afterEach(async () => {
    await sequelize.drop();
  });
});
