const express = require("express");

const { validateBody } = require("../../decorators");
const authController = require("../../controllers/auth");
const {
  signUpSchema,
  signInSchema,
  subscriptionUpdateSchema,
  resendVerificationSchema,
} = require("../../validators/auth");
const authenticate = require("../../middlewares/authenticate");
const upload = require("../../middlewares/upload");

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
  validateBody(subscriptionUpdateSchema),
  authController.subcriptionUser
);

// 1. Executes authenticate middleware
// 2. Recevies single file in key "avatar"
// 3. Executes controller to update avatar of user
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  authController.updateAvatar
);

// 1. Executes controller for user verification
router.get("/verify/:verificationToken", authController.verificationUser);

// 1. Validates body via resendVerificationSchema 
// 2. Executes controller to resend verification token to user
router.post(
  "/verify",
  validateBody(resendVerificationSchema),
  authController.resendVerification
);

module.exports = router;
