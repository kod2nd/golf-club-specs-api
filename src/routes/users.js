const express = require("express");
const router = express.Router();
router.use(express.json());
const { User } = require("../config/sequelizeConfig");

router.post("/", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error)
  }
});

module.exports = app => {
  app.use("/users", router);
};
