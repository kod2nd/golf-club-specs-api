const app = require("./app");
const { sequelize } = require("./src/config/sequelizeConfig");

const connectToDB = async () => {
    await sequelize.sync()
}
connectToDB()

const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on port ${server.address().port}...`);
  });