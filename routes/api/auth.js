const express = require("express");

const { validateBody } = require("../../decorators");
const authController = require("../../controllers/auth");
const {
  signUpSchema,
  signInSchema,
  subcriptionUpdateSchema,
} = require("../../validators/auth");
const authenticate = require("../../middlewares/authenticate");

// Instance of express router
const router = express.Router();

// 1. Validates request body via signUpSchema
// 2. Executes controller to create new user
router.post(
  "/register",
  validateBody(signUpSchema),
  authController.createNewUser
);

// 1. Validates request body via signInSchema
// 2. Executes controller to sign in user
router.post("/login", validateBody(signInSchema), authController.signInUser);

// 1. Executes authenticate middleware
// 2. Executes controller to log out user
router.post("/logout", authenticate, authController.logOutUser);

// 1. Executes authenticate middleware
// 2. Executes controller to receive current user information
router.get("/current", authenticate, authController.currentUser);

// 1. Executes authenticate middleware
// 2. Validates request body via subcriptionUpdateSchema
// 3. Executes controller to update subcription of user
router.patch(
  "/",
  authenticate,
  validateBody(subcriptionUpdateSchema),
  authController.subcriptionUser
);

module.exports = router;
