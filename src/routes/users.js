const express = require("express");
const router = express.Router();
router.use(express.json());
const { User } = require("../config/sequelizeConfig");

router.post("/", async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});

module.exports = app => {
  app.use("/users", router);
};
