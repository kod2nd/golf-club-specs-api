const ShaftModel = (sequelize, DataTypes) => {
  return sequelize.define("shaft", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false
    },
    flex: {
      type: DataTypes.ENUM(
        "ladies",
        "senior",
        "regular",
        "stiff-regular",
        "stiff",
        "x-stiff",
        "2x-stiff",
        "3x-stiff"
      ),
      allowNull: false
    },
    material: {
      type: DataTypes.ENUM('steel', 'graphite', 'hybrid'),
      allowNull: false
    }
  });
};

module.exports = ShaftModel;
