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

const sendPostRequest = async data => {
  return await request(testApp)
    .post("/users")
    .send(data);
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
    it("Does not create an entry in the User table when a name or email or both are left empty", async () => {
      const response = await sendPostRequest();
      const user = await User.findOne({ where: { name: testUser.name } });
      expect(response.status).toBe(500);
      expect(user).toBe(null);
    });
  });

  afterEach(async () => {
    await sequelize.drop();
  });
});
