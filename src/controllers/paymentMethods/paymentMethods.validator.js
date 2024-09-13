const Joi = require("joi");

const createPaymentMethodSchema = Joi.object({
  User_ID: Joi.string().required(),
  Type: Joi.string().required(),
  Number: Joi.string().required(),
  CVV: Joi.number().optional(),
  ExpirationDate: Joi.date().optional(),
  LastUsed: Joi.date().optional(),
});

const updatePaymentMethodSchema = Joi.object({
  User_ID: Joi.string().optional(),
  Type: Joi.string().optional(),
  Number: Joi.string().optional(),
  CVV: Joi.number().optional(),
  ExpirationDate: Joi.date().optional(),
  LastUsed: Joi.date().optional(),
});

module.exports = { createPaymentMethodSchema, updatePaymentMethodSchema };
