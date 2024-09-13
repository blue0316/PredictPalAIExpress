const Joi = require("joi");

const createUserProfileSchema = Joi.object({
  User_ID: Joi.string().required(),
  Name: Joi.string().optional(),
  Phone: Joi.string().optional(),
  Email: Joi.string().email().required(),
  DOB: Joi.date().optional(),
  Country: Joi.string().optional(),
  City: Joi.string().optional(),
  Address: Joi.string().optional(),
  PostalCode: Joi.string().optional(),
  Bio: Joi.string().optional(),
  Setting: Joi.object().optional(),
});

const updateUserProfileSchema = Joi.object({
  User_ID: Joi.string().optional(),
  Name: Joi.string().optional(),
  Phone: Joi.string().optional(),
  Email: Joi.string().email().optional(),
  DOB: Joi.date().optional(),
  Country: Joi.string().optional(),
  City: Joi.string().optional(),
  Address: Joi.string().optional(),
  PostalCode: Joi.string().optional(),
  Bio: Joi.string().optional(),
  Setting: Joi.object().optional(),
});

module.exports = { createUserProfileSchema, updateUserProfileSchema };
