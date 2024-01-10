const { Schema, model } = require("mongoose");

// Object schema for db
// Name is required
// Favorite could be non existing
// Owner key to make reference to specific user
const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

const Contact = model("contact", contactSchema);

module.exports = Contact;
