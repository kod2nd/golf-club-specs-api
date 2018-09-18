const express = require("express");
const router = express.Router();
router.use(express.json());
const { User } = require("../config/sequelizeConfig");
const tryCatchWrapper = require("../middleware/tryCatchWrapper");

router.post(
  "/",
  tryCatchWrapper(async (req, res, next) => {
    const user = await User.create(req.body);
    res.status(201).json(user);
  })
);

router.get(
  "/",
  tryCatchWrapper(async (req, res, next) => {
    const users = await User.findAll();
    res.status(200).json(users);
  })
);

router.get(
  "/:userId",
  tryCatchWrapper(async (req, res, next) => {
    const userId = req.params.userId
    const user = await User.findById(userId);
    res.status(200).json(user);
  })
);

module.exports = app => {
  app.use("/users", router);
};
