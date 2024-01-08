const { ctrlWrapper } = require("../decorators");
const { HttpError } = require("../helpers");
const Contact = require("../models/contacts");

// 1. Awaits for the full json of contacts
// 2. Returns full list
const getAll = async (req, res, next) => {
  const contacts = await Contact.find();
  res.json(contacts);
};

// 1. Takes id to get from request parameters
// 2. Starts searching for contact by id
// 3. If contact  is found, respondes with contact
// 4. Otherwise throws 404
const getById = async (req, res, next) => {
  const id = req.params.contactId;
  const contactToFind = await Contact.findById({ _id: id });
  if (contactToFind) {
    return res.json(contactToFind);
  }
  throw HttpError(404, "Not found");
};

// 1. Creates new contact from request body
// 2. Returns with new contact and status 201
const create = async (req, res, next) => {
  const newContact = await Contact.create(req.body);
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
