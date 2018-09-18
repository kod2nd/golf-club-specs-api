const GripModel = (sequelize, DataTypes) => {
  return sequelize.define("grip", {
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
    size: {
      type: DataTypes.ENUM("junior", "ladies", "standard", "mid-size", "jumbo"),
      allowNull: false
    },
    wraps: {
      type: DataTypes.STRING,
    },
    clubId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
};

module.exports = GripModel;
