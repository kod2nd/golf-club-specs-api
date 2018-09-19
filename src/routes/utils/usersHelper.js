const { User, Club, Shaft, Grip } = require("../../config/sequelizeConfig");

const getAllUsers = () => {
  return async (req, res, next) => {
    const users = await User.findAll({
      include: { model: Club, include: [Shaft, Grip] }
    });
    res.status(200).json(users);
  };
};

const getSpecificUser = () => {
  return async (req, res, next) => {
    const userId = req.params.userId;
    const user = await User.findById(userId, {
      include: [{ model: Club, include: [Shaft, Grip] }]
    });
    res.status(200).json(user);
  };
};

const createUser = () => {
  return async (req, res, next) => {
    const user = await User.create(req.body);
    res.status(201).json(user);
  };
};

module.exports = {
  getAllUsers,
  getSpecificUser,
  createUser
};
