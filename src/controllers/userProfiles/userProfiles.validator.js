const Joi = require("joi");

const userProfileSchema = Joi.object({
  uid: Joi.string().required(),
  name: Joi.string().optional(),
  phone: Joi.string().optional(),
  email: Joi.string().email().required(),
  dob: Joi.date().optional(),
  country: Joi.string().optional(),
  city: Joi.string().optional(),
  address: Joi.string().optional(),
  postalCode: Joi.string().optional(),
  bio: Joi.string().optional(),
  setting: Joi.object().optional(),
});

module.exports = { userProfileSchema };
