"use strict";
const { faker } = require("@faker-js/faker");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const userProfiles = await queryInterface.rawSelect(
      "UserProfiles",
      {
        plain: false,
      },
      ["User_ID"]
    );

    const fakePaymentMethods = [];

    for (let i = 0; i < 200; i++) {
      fakePaymentMethods.push({
        User_ID: faker.helpers.arrayElement(userProfiles.map((v) => v.User_ID)),
        Type: faker.helpers.arrayElement(["visa", "mc"]),
        Number: faker.finance.creditCardNumber(),
        CVV: faker.finance.creditCardCVV(),
        ExpirationDate: faker.date.future(
          faker.helpers.arrayElement([1, 2, 3])
        ),
        LastUsed: faker.date.recent({ days: 100 }),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert("PaymentMethods", fakePaymentMethods, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("PaymentMethods", null, {});
  },
};
