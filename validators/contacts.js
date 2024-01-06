const Joi = require("joi");

// Schema for creating contact
// All 3 keys are required
// Phone key uses string because of possible phone formatting
const createContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

// Schema for updating contact
// At least 1 key should be present for successfull validation
const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
}).min(1);

module.exports = { createContactSchema, updateContactSchema };
