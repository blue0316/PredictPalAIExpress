"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserProfiles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserProfiles.hasMany(models.PaymentMethods, {
        foreignKey: "User_ID",
        sourceKey: "User_ID",
        as: "PaymentMethods",
      });
    }
  }
  UserProfiles.init(
    {
      User_ID: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      Name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      DOB: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      Country: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      City: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      Address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      PostalCode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Avatar: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Bio: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      Setting: {
        type: DataTypes.JSON,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "UserProfiles",
    }
  );
  return UserProfiles;
};
