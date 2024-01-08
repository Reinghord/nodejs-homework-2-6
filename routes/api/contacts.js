const express = require("express");
const contactsControllers = require("../../controllers/contacts");
const isValidMongoId = require("../../middlewares");
const {
  createContactSchema,
  updateContactSchema,
  updateFavoriteContactSchema,
} = require("../../validators");
const { validateBody } = require("../../decorators");

// Instance of express router
const router = express.Router();

// Executes controller to receive all contacts
router.get("/", contactsControllers.getAll);

// Checks if params id is valid
// Executes controller to receieve contact by ID
router.get("/:contactId", isValidMongoId, contactsControllers.getById);

// Validates request body as per Create Contact Schema
// If no error, Executes controller to create new contact
router.post("/", validateBody(createContactSchema), contactsControllers.create);

// Checks if params id is valid
// Executes controller to delete contact by ID
router.delete("/:contactId", isValidMongoId, contactsControllers.deleteById);

// Checks if params id is valid
// Validates request body as per Update Contact Schema
// If no error, Executes controller to update contact by ID
router.put(
  "/:contactId",
  isValidMongoId,
  validateBody(updateContactSchema),
  contactsControllers.updateById
);

// Checks if params id is valid
// Validates request body as per Update Favorite Contact Schema
// If no error, Executes controller to update contact by ID
router.patch(
  "/:contactId/favorite",
  isValidMongoId,
  validateBody(updateFavoriteContactSchema),
  contactsControllers.updateFavoriteById
);

module.exports = router;
