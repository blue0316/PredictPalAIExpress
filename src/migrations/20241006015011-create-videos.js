"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Videos", {
      Video_ID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      Name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      VideoUrl: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ThumbnailUrl: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      AnalyzedUrl: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      MetaJsonUrl: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      FileSize: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      PlayTime: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      FileExtension: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      User_ID: {
        type: Sequelize.STRING,
        references: {
          model: "UserProfiles",
          key: "User_ID",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        allowNull: false,
      },
      Likes: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      Dislikes: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Videos");
  },
};
