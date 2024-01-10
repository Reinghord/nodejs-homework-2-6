const { Schema, model } = require("mongoose");

// Object user schema for db
// Email and password are required
// Email should be unique in db
// Subcription can be only one of three options, by default is "starter"
// Token by default is null
const userSchema = new Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    type: String,
    default: null,
  },
});

const User = model("user", userSchema);

module.exports = User;
