"use strict";
const { faker } = require("@faker-js/faker");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const fakeUserProfiles = [];

    for (let i = 0; i < 50; i++) {
      fakeUserProfiles.push({
        uid: faker.string.uuid(),
        name: faker.person.fullName(),
        phone: faker.phone.number().split(" x")[0],
        email: faker.internet.email(),
        dob: faker.date.birthdate(),
        country: faker.location.country(),
        city: faker.location.city(),
        address: faker.location.streetAddress(),
        postalCode: faker.location.zipCode(),
        bio: faker.lorem.paragraphs(2),
        setting: JSON.stringify({
          theme: faker.helpers.arrayElement(["light", "dark"]),
          rtl: false,
          font_size: faker.helpers.arrayElement(
            Array.from({ length: 7 }, (v, i) => 1 + i * 0.01)
          ),
          email_notifications: faker.datatype.boolean(),
          push_notifications: faker.datatype.boolean(),
          new_comment_replies: faker.datatype.boolean(),
          new_messages: faker.datatype.boolean(),
          notifications_schedule: [8, 18],
          private_profile: false,
          block_dms: false,
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert("UserProfiles", fakeUserProfiles, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("UserProfiles", null, {});
  },
};
