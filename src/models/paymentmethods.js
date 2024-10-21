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
        validate: {
          notEmpty: true,
          // isIn: [['Credit Card', 'Debit Card', 'PayPal']],
        },
      },
      Number: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
          isCreditCard: true,
        },
      },
      CVV: {
        allowNull: true,
        type: DataTypes.INTEGER,
        validate: {
          isInt: true,
          len: [3, 4],
        },
      },
      ExpirationDate: {
        allowNull: true,
        type: DataTypes.DATE,
        validate: {
          isDate: true,
          isAfter: new Date().toISOString().split("T")[0],
        },
      },
      LastUsed: {
        allowNull: true,
        type: DataTypes.DATE,
        validate: {
          isDate: true,
        },
      },
    },
    {
      sequelize,
      modelName: "PaymentMethods",
    }
  );
  return PaymentMethods;
};
