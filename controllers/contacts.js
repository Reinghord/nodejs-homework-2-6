const { ctrlWrapper } = require("../decorators");
const { HttpError } = require("../helpers");
const Contact = require("../models/contacts");

// 1. Recevies user's id from authorisation middleware
// 2. Checks query parameters
// 3. If favorite query, returns contacts depending on favorite value
// 4. If page&limit query, returns paginated array
// 5. Otherwise returns full list of contacts from DB
const getAll = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = null, favorite = null } = req.query;
  const skip = (page - 1) * limit;
  if (favorite) {
    const contacts = await Contact.find({ owner, favorite }, "");
    return res.json(contacts);
  }
  const contacts = await Contact.find({ owner }, "", {
    skip,
    limit,
  });
  res.json(contacts);
};

// 1. Takes id to get from request parameters
// 2. Starts searching for contact by id
// 3. If contact  is found, respondes with contact
// 4. Otherwise throws 404
const getById = async (req, res, next) => {
  const id = req.params.contactId;
  const contactToFind = await Contact.findById(id);
  if (contactToFind) {
    return res.json(contactToFind);
  }
  throw HttpError(404, "Not found");
};

// 1. Receives user's id from authorisation middleware
// 1. Creates new contact from request body, writes it down to specific owner
// 2. Returns with new contact and status 201
const create = async (req, res, next) => {
  const { _id: owner } = req.user;
  const newContact = await Contact.create({ ...req.body, owner });
  res.status(201).json(newContact);
};

// 1. Writes down id from request parameters
// 2. Starts action to remove id from contacts file
// 3. If id is found, returns with success
// 4. Otherwise throws 404
const deleteById = async (req, res, next) => {
  const id = req.params.contactId;
  const remove = await Contact.findByIdAndDelete(id);
  if (id === remove?.id) {
    return res.json({ message: "contact deleted" });
  }
  throw HttpError(404, "Not found");
};

// 1. Writes down id from request parameters
// 2. Starts action to update keys of the contact, by id
// 3. If contact exists, returns with updated contact
// 4. Otherwise throws 404
const updateById = async (req, res, next) => {
  const id = req.params.contactId;
  const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (updatedContact) {
    return res.json(updatedContact);
  }
  throw HttpError(404, "not found");
};

// 1. Writes down id from request parameters
// 2. Starts action to update favorite key of the contact, by id
// 3. If contact exists, returns with updated contact
// 4. Otherwise throws 404
const updateFavoriteById = async (req, res, next) => {
  const id = req.params.contactId;
  const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (updatedContact) {
    return res.json(updatedContact);
  }
  throw HttpError(404, "not found");
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  create: ctrlWrapper(create),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
  updateFavoriteById: ctrlWrapper(updateFavoriteById),
};
