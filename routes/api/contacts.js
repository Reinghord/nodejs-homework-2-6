const express = require("express");
const contactsControllers = require("../../controllers/contacts");
const isValidMongoId = require("../../middlewares");
const {
  createContactSchema,
  updateContactSchema,
  updateFavoriteContactSchema,
} = require("../../validators/contacts");
const { validateBody } = require("../../decorators");
const authenticate = require("../../middlewares/authenticate");

// Instance of express router
const router = express.Router();

// Checks if user is authorized
// Executes controller to receive all contacts
router.get("/", authenticate, contactsControllers.getAll);

// Checks if user is authorized
// Checks if params id is valid
// Executes controller to receieve contact by ID
router.get(
  "/:contactId",
  authenticate,
  isValidMongoId,
  contactsControllers.getById
);

// Checks if user is authorized
// Validates request body as per Create Contact Schema
// If no error, Executes controller to create new contact
router.post(
  "/",
  authenticate,
  validateBody(createContactSchema),
  contactsControllers.create
);

// Checks if user is authorized
// Checks if params id is valid
// Executes controller to delete contact by ID
router.delete(
  "/:contactId",
  authenticate,
  isValidMongoId,
  contactsControllers.deleteById
);

// Checks if user is authorized
// Checks if params id is valid
// Validates request body as per Update Contact Schema
// If no error, Executes controller to update contact by ID
router.put(
  "/:contactId",
  authenticate,
  isValidMongoId,
  validateBody(updateContactSchema),
  contactsControllers.updateById
);

// Checks if user is authorized
// Checks if params id is valid
// Validates request body as per Update Favorite Contact Schema
// If no error, Executes controller to update contact by ID
router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidMongoId,
  validateBody(updateFavoriteContactSchema),
  contactsControllers.updateFavoriteById
);

module.exports = router;
