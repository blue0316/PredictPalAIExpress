"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("UserProfiles", {
      User_ID: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      Name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      Phone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      Email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      DOB: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      Country: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      City: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      Address: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      PostalCode: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      Avatar: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      Bio: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      Setting: {
        type: Sequelize.JSON,
        allowNull: true,
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
    await queryInterface.dropTable("UserProfiles");
  },
};
