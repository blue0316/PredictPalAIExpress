"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Videos extends Model {
    static associate(models) {
      Videos.belongsTo(models.UserProfiles, {
        foreignKey: "User_ID",
        targetKey: "User_ID",
        as: "UserProfiles",
      });
    }
  }
  Videos.init(
    {
      Video_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      Name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      VideoUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      ThumbnailUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      AnalyzedUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      MetaJsonUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      FileSize: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
          min: 0,
        },
      },
      PlayTime: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
          min: 0,
        },
      },
      FileExtension: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
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
      Likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
          isInt: true,
          min: 0,
        },
      },
      Dislikes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
          isInt: true,
          min: 0,
        },
      },
    },
    {
      sequelize,
      modelName: "Videos",
      tableName: "Videos",
      timestamps: true,
    }
  );
  return Videos;
};
