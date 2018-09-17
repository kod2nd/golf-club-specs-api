const UserModel = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            required: true
          },
        email: {
            type: DataTypes.STRING,
            required: true
          }
    })
}

module.exports = UserModel
