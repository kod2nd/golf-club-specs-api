const Sequelize = require("sequelize");
require("dotenv").config();
const {
  DB_DATABASENAME,
  DB_TEST_DATABASENAME,
  DB_USERNAME,
  DB_PASSWORD,
  NODE_ENV
} = process.env;
const UserModel = require("../models/UserModel");
const ClubModel = require("../models/ClubModel");
const ShaftModel = require("../models/ShaftModel");
const GripModel = require("../models/GripModel");

const setDatabaseName = env => {
  if (env === "test") {
    return DB_TEST_DATABASENAME;
  }
  return DB_DATABASENAME;
};

const sequelize = new Sequelize(
  setDatabaseName(NODE_ENV),
  DB_USERNAME,
  DB_PASSWORD,
  {
    host: "localhost",
    dialect: "postgres"
  }
);

// Models
const User = UserModel(sequelize, Sequelize);
const Club = ClubModel(sequelize, Sequelize);
const Shaft = ShaftModel(sequelize, Sequelize);
const Grip = GripModel(sequelize, Sequelize);

// Associations
User.hasMany(Club);
Club.belongsTo(User);
Club.hasOne(Shaft);
Club.hasOne(Grip);
Shaft.belongsTo(Club);
Grip.belongsTo(Club);

module.exports = {
  sequelize,
  Sequelize,
  User,
  Club,
  Shaft,
  Grip
};
