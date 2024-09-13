"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("PaymentMethods", {
      PaymentMethods_ID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      User_ID: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "UserProfiles",
          key: "User_ID",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      Type: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      Number: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      CVV: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      ExpirationDate: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      LastUsed: {
        allowNull: true,
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("PaymentMethods");
  },
};
