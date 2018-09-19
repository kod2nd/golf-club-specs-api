const Sequelize = require("sequelize");
require("dotenv").config();
const {
  DB_DATABASENAME,
  DB_TEST_DATABASENAME,
  DB_USERNAME,
  DB_PASSWORD,
  NODE_ENV,
  DATABASE_URL,
  HEROKU_POSTGRESQL_WHITE_URL
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

let sequelize;

if (DATABASE_URL) {
  sequelize = new Sequelize(DATABASE_URL, {
    dialect: "postgres",
    ssl: true,
    dialectOptions: {
      ssl: true
    },
    logging: true //false
  });
}
if (HEROKU_POSTGRESQL_WHITE_URL) {
  sequelize = new Sequelize(HEROKU_POSTGRESQL_WHITE_URL, {
    dialect: "postgres",
    ssl: true,
    dialectOptions: {
      ssl: true
    }
    // protocol: "postgres",
    // port: match[4],
    // host: match[3],
    // logging: true //false
  });
} else {
  sequelize = new Sequelize(setDatabaseName(), DB_USERNAME, DB_PASSWORD, {
    dialect: "postgres"
  });
}

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
