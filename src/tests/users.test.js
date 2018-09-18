const {
  testApp,
  sendPostRequest,
  sendGetRequest,
  testData
} = require("./utils/testUtils");
const usersRouter = require("../routes/users");
const { sequelize, User } = require("../config/sequelizeConfig");

const { testUser, testUser2, testClub } = testData;

usersRouter(testApp);

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
      await sendPostRequest("/users", testUser);
      await sendPostRequest("/users", testUser2);
    });
    it("/users should return a list of all users ", async () => {
      const response = await sendGetRequest("/users");
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
    });
    it("/users clubs should be inluded in the response of Get users ", async () => {
      const response = await sendGetRequest("/users");
      expect(response.status).toBe(200);
      expect(response.body[0].clubs).toBeDefined();
    });
    it("/users/:userid should return a single user that corresponds to the userId ", async () => {
      const response = await sendGetRequest("/users/1");
      expect(response.status).toBe(200);
      expect(response.body.name).toBe(testUser.name);
    });
    it("/users/:userid clubs should be inluded in the response of Get user ", async () => {
        const response = await sendGetRequest("/users/1");
        expect(response.status).toBe(200);
        expect(response.body.clubs).toBeDefined();
      });
  });

  describe("User Clubs", () => {
    beforeEach(async () => {
      await sendPostRequest("/users", testUser);
    });
    describe("/POST /users/:userId/clubs", () => {
      it("Creates an entry in the Clubs table when a club is passed to the body ", async () => {
        const response = await sendPostRequest("/users/1/clubs", {...testClub, userId: 1});
        expect(response.status).toBe(201)
        expect(response.body.brand).toBe(testClub.brand);
      });
      it("Response Body should have shafts and shaft should match testClubs shaft ", async () => {
        const response = await sendPostRequest("/users/1/clubs", {...testClub, userId: 1});
        expect(response.status).toBe(201)
        expect(response.body.shaft).toBeDefined()
        expect(response.body.shaft.brand).toBe(testClub.shaft.brand);
      });
      it("Response Body should have grip and the grip should match testClubs grips ", async () => {
        const response = await sendPostRequest("/users/1/clubs", {...testClub, userId: 1});
        expect(response.status).toBe(201)
        expect(response.body.grip).toBeDefined()
        expect(response.body.grip.brand).toBe(testClub.grip.brand);
      });
      it("When creating a club, Throws an error if no userId is passed", async () => {
        const response = await sendPostRequest("/users/1/clubs", {testClub});
        expect(response.status).toBe(500)
      });
    });
  });

  afterEach(async () => {
    await sequelize.drop();
  });
});
