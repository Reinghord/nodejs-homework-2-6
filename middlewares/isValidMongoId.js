const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers");

// Creates constant from parameters for id
// Using mongoose method to check if params id is valid
// If not, throws 400
const isValidMongoId = (req, res, next) => {
  const id = req.params.contactId;
  if (!isValidObjectId(id)) {
    next(HttpError(400, `${id} is not valid id`));
  }
  next();
};

module.exports = isValidMongoId;
