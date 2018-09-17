const Sequelize = require("sequelize");
require("dotenv").config();
const { DB_TEST_DATABASENAME, DB_USERNAME, DB_PASSWORD } = process.env;
const UserModel = require("../models/UserModel");
const ClubModel = require("../models/ClubModel");
const ShaftModel = require("../models/ShaftModel");
const GripModel = require("../models/GripModel");

const sequelizeTest = new Sequelize(DB_TEST_DATABASENAME, DB_USERNAME, DB_PASSWORD, {
  host: "localhost",
  dialect: "postgres"
});

// Models
const User = UserModel(sequelizeTest, Sequelize);
const Club = ClubModel(sequelizeTest, Sequelize);
const Shaft = ShaftModel(sequelizeTest, Sequelize);
const Grip = GripModel(sequelizeTest, Sequelize);

// Associations
User.hasMany(Club);
Club.belongsTo(User);
Club.hasOne(Shaft);
Club.hasOne(Grip);
Shaft.belongsTo(Club);
Grip.belongsTo(Club);

module.exports = {
  sequelizeTest,
  Sequelize,
  User,
  Club,
  Shaft,
  Grip
};