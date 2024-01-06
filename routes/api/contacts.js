const express = require("express");
const contactsControllers = require("../../controllers/contacts");
const {
  createContactSchema,
  updateContactSchema,
} = require("../../validators");
const { validateBody } = require("../../decorators");

// Instance of express router
const router = express.Router();

// Executes controller to receive all contacts
router.get("/", contactsControllers.getAll);

// Executes controlelr to receieve controller by ID
router.get("/:contactId", contactsControllers.getById);

// Validates request body as per Create Contact Schema
// If no error, Executes controller to create new contact
router.post("/", validateBody(createContactSchema), contactsControllers.create);

// Executes controller to delete contact by ID
router.delete("/:contactId", contactsControllers.deleteById);

// Validates request body as per Update Contact Schema
// If no error, Executes controller to update contact by ID
router.put(
  "/:contactId",
  validateBody(updateContactSchema),
  contactsControllers.updateById
);

module.exports = router;
