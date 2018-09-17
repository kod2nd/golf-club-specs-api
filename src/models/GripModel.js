const GripModel = (sequelize, DataTypes) => {
    return sequelize.define("grip", {
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
      size: {
        type: DataTypes.ENUM('junior', 'ladies','standard','mid-size', 'jumbo'),
        required: true
      },
      wraps: {
          type: DataTypes.STRING,
          required: true
        }
    });
  };
  
  module.exports = GripModel;
  