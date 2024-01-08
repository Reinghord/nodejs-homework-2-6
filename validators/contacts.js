const Joi = require("joi");

// Schema for creating contact
// Only name key is required
// Phone key uses string because of possible phone formatting
const createContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
});

// Schema for updating contact
// At least 1 key should be present for successfull validation
const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
}).min(1);

// Schema for updating favorite status
// Should consist of only favorite key and same is requried
const updateFavoriteContactSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  createContactSchema,
  updateContactSchema,
  updateFavoriteContactSchema,
};
