const express = require("express");
const router = express.Router();
router.use(express.json());
const { User, Club, Shaft, Grip } = require("../config/sequelizeConfig");
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
    const users = await User.findAll({ include: {model: Club, include: [Shaft, Grip]} });
    res.status(200).json(users);
  })
);

router.get(
  "/:userId",
  tryCatchWrapper(async (req, res, next) => {
    const userId = req.params.userId;
    const user = await User.findById(userId, { include: [{model: Club, include: [Shaft, Grip]}] });
    res.status(200).json(user);
  })
);

router.post(
  "/:userId/clubs",
  tryCatchWrapper(async (req, res, next) => {
    const { shaft, grip } = req.body;
    const club = await Club.create(req.body);
    await Shaft.findOrCreate({ where: { ...shaft, clubId: club.id } });
    await Grip.findOrCreate({ where: { ...grip, clubId: club.id } });

    const clubWithShaftAndGrip = await Club.findOne({
      where: { id: club.id },
      include: [Shaft, Grip]
    });
    res.status(201).json(clubWithShaftAndGrip);
  })
);

module.exports = app => {
  app.use("/users", router);
};
