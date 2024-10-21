const Sequelize = require("sequelize");

const db = {};

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  // dialectOptions: {
  //   ssl: {
  //     require: true,
  //     rejectUnauthorized: false,
  //   },
  // },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
