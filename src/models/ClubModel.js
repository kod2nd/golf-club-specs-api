const ClubModel = (sequelize, DataTypes) => {
  return sequelize.define("club", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    number: DataTypes.STRING,
    category: {
      type: DataTypes.ENUM(
        "driver",
        "wood",
        "hybrid",
        "iron",
        "wedge",
        "putter"
      ),
      allowNull: false
    },
    brand: DataTypes.STRING,
    model: DataTypes.STRING,
    loft: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lie: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bounce: {
      type: DataTypes.STRING
    },
    notes: {
      type: DataTypes.STRING
    },
    length: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
};

module.exports = ClubModel;
