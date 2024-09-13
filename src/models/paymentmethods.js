"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PaymentMethods extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PaymentMethods.belongsTo(models.UserProfiles, {
        foreignKey: "User_ID",
        targetKey: "User_ID",
        as: "UserProfiles",
      });
    }
  }
  PaymentMethods.init(
    {
      PaymentMethods_ID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      User_ID: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "UserProfiles",
          key: "User_ID",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      Type: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      Number: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      CVV: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      ExpirationDate: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      LastUsed: {
        allowNull: true,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "PaymentMethods",
    }
  );
  return PaymentMethods;
};
