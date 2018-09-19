const {
  testApp,
  sendPostRequest,
  sendGetRequest,
  sendPutRequest,
  sendDeleteRequest,
  testData
} = require("./utils/testUtils");
const usersRouter = require("../routes/users");
const {
  sequelize,
  User,
  Club,
  Shaft,
  Grip
} = require("../config/sequelizeConfig");
const { DELETE_MESSAGE_SUCCESS } = require("../routes/utils/utils");

const { testUser, testUser2, testClub } = testData;
const {shaft, grip, ...restOfTestClubSpecs} = testClub

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

  describe.only("/GET", () => {
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
      const [firstUser] = response.body;
      expect(response.status).toBe(200);
      expect(firstUser.clubs).toBeDefined();
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
    it("/users/:userid clubs should also contain grips and shafts ", async () => {
      await sendPostRequest("/users/1/clubs", { ...testClub, userId: 1 });
      const response = await sendGetRequest("/users/1");
      const [club] = response.body.clubs;
      expect(response.status).toBe(200);
      expect(club.shaft).toBeDefined();
      expect(club.grip).toBeDefined();
    });
  });

  describe("User Clubs", () => {
    beforeEach(async () => {
      await sendPostRequest("/users", testUser);
    });
    describe("/POST /users/:userId/clubs", () => {
      it("Creates an entry in the Clubs table when a club is passed to the body ", async () => {
        const response = await sendPostRequest("/users/1/clubs", {
          ...testClub,
          userId: 1
        });
        expect(response.status).toBe(201);
        expect(response.body.brand).toBe(testClub.brand);
      });
      it("Response Body should have shafts and shaft should match testClubs shaft ", async () => {
        const response = await sendPostRequest("/users/1/clubs", {
          ...testClub,
          userId: 1
        });
        expect(response.status).toBe(201);
        expect(response.body.shaft).toBeDefined();
        expect(response.body.shaft.brand).toBe(testClub.shaft.brand);
      });
      it("Response Body should have grip and the grip should match testClubs grips ", async () => {
        const response = await sendPostRequest("/users/1/clubs", {
          ...testClub,
          userId: 1
        });
        expect(response.status).toBe(201);
        expect(response.body.grip).toBeDefined();
        expect(response.body.grip.brand).toBe(testClub.grip.brand);
      });
      it("When creating a club, Throws an error if no userId is passed", async () => {
        const response = await sendPostRequest("/users/1/clubs", { testClub });
        expect(response.status).toBe(500);
      });
    });
    describe("/PUT /users/:userId/clubs", () => {
      beforeEach(async () => {
        await sendPostRequest("/users/1/clubs", {
          ...testClub,
          userId: 1
        });
      });
      it("response should return the updated brand of the club", async () => {
        const updatedBrand = "updated brand";
        const response = await sendPutRequest("/users/1/clubs/1", {
          brand: updatedBrand
        });
        expect(response.status).toBe(200);
        expect(response.body.brand).toBe(updatedBrand);
      });
      it("should be able to update more than 1 field", async () => {
        const updatedBrand = "updated brand";
        const updatedLoft = "47";
        const response = await sendPutRequest("/users/1/clubs/1", {
          brand: updatedBrand,
          loft: updatedLoft
        });
        expect(response.status).toBe(200);
        expect(response.body.brand).toBe(updatedBrand);
        expect(response.body.loft).toBe(updatedLoft);
      });
      it("should be able to update the shaft (another table)", async () => {
        const newShaftFlex = "senior";
        const response = await sendPutRequest("/users/1/clubs/1", {
          shaft: { flex: newShaftFlex }
        });
        expect(response.status).toBe(200);
        expect(response.body.shaft.flex).toBe(newShaftFlex);
      });
      it("should be able to update the club and its components", async () => {
        const updatedLoft = "47";
        const newShaftFlex = "senior";
        const newGripSize = "junior";
        const response = await sendPutRequest("/users/1/clubs/1", {
          loft: updatedLoft,
          shaft: { flex: newShaftFlex },
          grip: { size: newGripSize }
        });
        expect(response.status).toBe(200);
        expect(response.body.loft).toBe(updatedLoft);
        expect(response.body.shaft.flex).toBe(newShaftFlex);
        expect(response.body.grip.size).toBe(newGripSize);
      });
    });
    describe("/DELETE", () => {
      beforeEach(async () => {
        await sendPostRequest("/users/1/clubs", {
          ...testClub,
          userId: 1
        });
      });
      it("should show message saying sucessful delete ", async () => {
        const response = await sendDeleteRequest("/users/1/clubs/1");
        expect(response.status).toBe(200);
        expect(response.body.message).toBe(DELETE_MESSAGE_SUCCESS);
      });
      it("deleted club should not be in the Club table ", async () => {
        await sendDeleteRequest("/users/1/clubs/1");
        const club = await Club.findOne({ where: restOfTestClubSpecs, include: [Shaft, Grip] });
        expect(club).toBe(null);
      });
      it("deleted club should not be in the Shaft table ", async () => {
          const {id} = await Club.findOne({ where: restOfTestClubSpecs });
        await sendDeleteRequest("/users/1/clubs/1");
        const clubShaft = await Shaft.findOne({where: {
            ...shaft, id
        }})
        expect(clubShaft).toBe(null);
      });
      it("deleted club should not be in the Grip table ", async () => {
          const {id} = await Club.findOne({ where: restOfTestClubSpecs });
        await sendDeleteRequest("/users/1/clubs/1");
        const clubGrip = await Grip.findOne({where: {
            ...grip, id
        }})
        expect(clubGrip).toBe(null);
      });
      it("only deletes the specified club", async () => {
        await sendPostRequest("/users/1/clubs", {
            ...testClub,
            brand: "testClub 2",
            userId: 1
          });
        await sendDeleteRequest("/users/1/clubs/1");
        const clubs = await Club.findAll()
        expect(clubs).toHaveLength(1);
      });
    });
  });

  afterEach(async () => {
    await sequelize.drop();
  });
});
