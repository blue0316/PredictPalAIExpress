"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserProfiles extends Model {
    static associate(models) {
      UserProfiles.hasMany(models.PaymentMethods, {
        foreignKey: "User_ID",
        sourceKey: "User_ID",
        as: "PaymentMethods",
      });

      UserProfiles.hasMany(models.Videos, {
        foreignKey: "User_ID",
        sourceKey: "User_ID",
        as: "Videos",
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
        validate: {
          len: [0, 255],
        },
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
          notEmpty: true,
        },
      },
      DOB: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        validate: {
          isDate: true,
          isBefore: new Date().toISOString().split("T")[0],
        },
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
        validate: {
          len: [0, 255],
        },
      },
      PostalCode: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isAlphanumeric: true,
        },
      },
      Avatar: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isUrl: true,
        },
      },
      Bio: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
          len: [0, 1000],
        },
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
