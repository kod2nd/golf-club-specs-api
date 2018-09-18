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

const sendPostRequest = async (endpoint, data) => {
  return await request(testApp)
    .post(endpoint)
    .send(data);
};
const sendGetRequest = async endPoint => {
  return await request(testApp).get(endPoint);
};

describe("Users test", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  describe("/POST", async () => {
    it("Creates an entry in the User table when a name and email are passed in the body", async () => {
      const response = await sendPostRequest("/users", testUser);
      const user = await User.findOne({ where: { name: testUser.name } });
      expect(response.status).toBe(201);
      expect(user.name).toBe(testUser.name);
    });
    it("Does not create an entry in the User table when empty body is passed", async () => {
      const response = await sendPostRequest("/users");
      const user = await User.findOne({ where: { name: testUser.name } });
      expect(response.status).toBe(500);
      expect(user).toBe(null);
    });
    it("Does not create an entry in the User table when email is left empty", async () => {
      const response = await sendPostRequest("/users", { name: "test2" });
      const user = await User.findOne({ where: { name: "test2" } });
      expect(response.status).toBe(500);
      expect(user).toBe(null);
    });
    it("Does not create an entry in the User table when name is left empty", async () => {
      const response = await sendPostRequest("/users", {
        email: "testemail@email.com"
      });
      const user = await User.findOne({
        where: { email: "testemail@email.com" }
      });
      expect(response.status).toBe(500);
      expect(user).toBe(null);
    });
    it("Creates more than 1 entry when multiple postrequests are sent", async () => {
      await sendPostRequest("/users", testUser);
      await sendPostRequest("/users", testUser2);

      const users = await User.findAll();
      expect(users).toHaveLength(2);
    });
    it("Does not create an entry if email is not unique", async () => {
      await sendPostRequest("/users", testUser);
      await sendPostRequest("/users", {
        name: "duplicateEmail",
        email: "abc@123.com"
      });
      const users = await User.findAll();
      expect(users).toHaveLength(1);
    });
  });

  describe("/GET", () => {
    beforeEach(async () => {
      // Setup
      await sendPostRequest("/users", testUser);
      await sendPostRequest("/users", testUser2);
    });
    it("should return a list of all users ", async () => {
      // Tests
      const response = await sendGetRequest("/users");
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
    });
    it("/:userId should return a single user that corresponds to the userId ", async () => {
      const response = await sendGetRequest("/users/1");
      expect(response.status).toBe(200);
      expect(response.body.name).toBe(testUser.name);
    });
  });

  afterEach(async () => {
    await sequelize.drop();
  });
});
