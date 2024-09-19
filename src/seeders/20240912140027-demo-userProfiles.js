"use strict";
const { faker } = require("@faker-js/faker");
const { Country, City } = require("country-state-city");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const fakeUserProfiles = [];

    for (let i = 0; i < 50; i++) {
      const country = faker.helpers.arrayElement(Country.getAllCountries());
      const cities = City.getCitiesOfCountry(country.isoCode);
      const city =
        cities.length > 0 ? faker.helpers.arrayElement(cities) : null;

      fakeUserProfiles.push({
        User_ID: faker.string.uuid(),
        Name: faker.person.fullName(),
        Phone: faker.phone.number().split(" x")[0],
        Email: faker.internet.email(),
        DOB: faker.date.birthdate(),
        Country: JSON.stringify({ label: country.name, value: country.isoCode }),
        City: city ? JSON.stringify({ label: city.name, value: city.name }) : null,
        Address: faker.location.streetAddress(),
        PostalCode: faker.location.zipCode(),
        Bio: faker.lorem.paragraphs(2),
        Avatar: faker.image.urlPicsumPhotos(),
        Setting: JSON.stringify({
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
