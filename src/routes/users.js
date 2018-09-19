const express = require("express");
const router = express.Router();
router.use(express.json());
const tryCatchWrapper = require("../middleware/tryCatchWrapper");

const {
  getAllUsers,
  getSpecificUser,
  createUser
} = require("./utils/usersHelper");

const {
  createUserClub,
  editUserClub,
  deleteClub
} = require("./utils/userClubHelper");

// Users
router.post("/", tryCatchWrapper(createUser()));
router.get("/", tryCatchWrapper(getAllUsers()));
router.get("/:userId", tryCatchWrapper(getSpecificUser()));

// User Clubs
router.post("/:userId/clubs", tryCatchWrapper(createUserClub()));
router.put("/:userId/clubs/:clubId", tryCatchWrapper(editUserClub()));
router.delete("/:userId/clubs/:clubId", tryCatchWrapper(deleteClub()));

module.exports = app => {
  app.use("/users", router);
};
