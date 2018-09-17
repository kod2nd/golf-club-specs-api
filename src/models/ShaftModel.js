const ShaftModel = (sequelize, DataTypes) => {
  return sequelize.define("shaft", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    brand: {
      type: DataTypes.STRING,
      required: true
    },
    model: {
      type: DataTypes.STRING,
      required: true
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
      required: true
    },
    material: {
      type: DataTypes.ENUM('steel', 'graphite', 'hybrid'),
      required: true
    }
  });
};

module.exports = ShaftModel;
