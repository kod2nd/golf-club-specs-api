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

router.get("/", async (req, res, next) => {
  const users = await User.findAll()
  res.status(200).json(users)
})

module.exports = app => {
  app.use("/users", router);
};
