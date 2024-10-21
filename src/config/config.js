require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASS || null,
    database: process.env.DB_NAME || "database_development",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: process.env.DB_DIALECT || "postgres",
    // dialectOptions: {
    //   ssl: {
    //     require: process.env.DB_HOST !== "localhost" ? true : false,
    //     rejectUnauthorized: false,
    //   },
    // },
  },
  test: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASS || null,
    database: process.env.DB_NAME || "database_development",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: process.env.DB_DIALECT || "postgres",
    // dialectOptions: {
    //   ssl: {
    //     require: process.env.DB_HOST !== "localhost" ? true : false,
    //     rejectUnauthorized: false,
    //   },
    // },
  },
  production: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASS || null,
    database: process.env.DB_NAME || "database_development",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: process.env.DB_DIALECT || "postgres",
    // dialectOptions: {
    //   ssl: {
    //     require: process.env.DB_HOST !== "localhost" ? true : false,
    //     rejectUnauthorized: false,
    //   },
    // },
  },
};
