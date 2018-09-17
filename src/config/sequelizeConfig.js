const Sequelize = require('sequelize');
require('dotenv').config();
const { DB_DATABASENAME, DB_USERNAME, DB_PASSWORD } = process.env;

const sequelize = new Sequelize(DB_DATABASENAME, DB_USERNAME, DB_PASSWORD, {
    host: "localhost",
    dialect: "postgres"
})

