const Sequelize = require('sequelize');
require('dotenv').config();
const { DB_DATABASENAME, DB_USERNAME, DB_PASSWORD } = process.env;
const UserModel = require('../models/UserModel');
const ClubModel = require('../models/ClubModel');
const ShaftModel = require('../models/ShaftModel');
const GripModel = require('../models/GripModel');

const sequelize = new Sequelize(DB_DATABASENAME, DB_USERNAME, DB_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres'
})

// Models
const User = UserModel(sequelize, Sequelize)
const Club = ClubModel(sequelize, Sequelize)
const Shaft = ShaftModel(sequelize, Sequelize)
const Grip = GripModel(sequelize, Sequelize)

// Associations
User.hasMany(Club, {foreignKey: 'club_id'})
Club.belongsTo(User, {foreignKey: 'club_id'})
Club.hasOne(Shaft, {foreignKey: 'shaft_id'})
Club.hasOne(Grip, {foreignKey: 'grip_id'})
Shaft.belongsTo(Club, {foreignKey: 'shaft_id'})
Grip.belongsTo(Club, {foreignKey: 'grip_id'})

module.exports = {
    sequelize,
    Sequelize,
    User,
    Club,
    Shaft,
    Grip
};



