const ClubModel = (sequelize, DataTypes) => {
  return sequelize.define("club", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    number: DataTypes.STRING,
    brand: DataTypes.STRING,
    model: DataTypes.STRING,
    loft: {
      type: DataTypes.STRING,
      required: true
    },
    lie: {
      type: DataTypes.STRING,
      required: true
    },
    length: {
      type: DataTypes.STRING,
      required: true
    }
  });
};

module.exports = ClubModel;
