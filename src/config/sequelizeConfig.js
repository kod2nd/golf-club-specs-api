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
User.hasMany(Club, {foreignKey: 'user_id'})
Club.belongsTo(User, {foreignKey: 'user_id'})
Club.hasOne(Shaft, {foreignKey: 'club_id'})
Club.hasOne(Grip, {foreignKey: 'club_id'})
Shaft.belongsTo(Club, {foreignKey: 'club_id'})
Grip.belongsTo(Club, {foreignKey: 'club_id'})

module.exports = {
    sequelize,
    Sequelize,
    User,
    Club,
    Shaft,
    Grip
};



