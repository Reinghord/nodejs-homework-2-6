const Joi = require("joi");

const signUpSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});

// Separate schema, because Sign Up schema can change in the future
const signInSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});

// Separate schema, because Sign Up schema can change in the future
const subcriptionUpdateSchema = Joi.object({
  subcription: Joi.string().valid("starter", "pro", "business").required(),
});

module.exports = { signUpSchema, signInSchema, subcriptionUpdateSchema };
