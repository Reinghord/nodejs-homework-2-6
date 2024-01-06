const fs = require("fs/promises");
const path = require("path");
// Extra module for ID generation
const { nanoid } = require("nanoid");

// Absolute path to contacts.json
const contactsPath = path.join(__dirname, "contacts.json");

// Supplementary function to write to file with spaces
async function writeContacts(data) {
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
}

// 1. Reads file contacts.json
// 2. Passes to console string containing contacts.json
const listContacts = async () => {
  const list = await fs.readFile(contactsPath);
  return JSON.parse(list);
};

// 1. Reads file contacts.json
// 2. Finds contactID in array
// 3. Returns object of the said contact, otherwise null
const getContactById = async (contactId) => {
  const list = await listContacts();
  const contact = list.find((contact) => contact.id === contactId);
  return contact || null;
};

// 1. Reads file contacts.json
// 2. Finds index of the contact to be deleted
// 3. Checks if such contact existing, otherwise returns null
// 4. Removes said contact from array (mutable)
// 5. Writes to the file updated array
// 6. Returns object of the removed contact
const removeContact = async (contactId) => {
  const list = await listContacts();
  const index = list.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const remove = list.splice(index, 1)[0];
  await writeContacts(list);
  return remove;
};

// 1. Creates contact with help of nanoid
// 2. Reads file contacts.json
// 3. Pushes new contact to the end of array
// 4. Writes updated array to the file
// 5. Returns object of created contact
const addContact = async (body) => {
  const contact = { id: nanoid(), ...body };
  const list = await listContacts();
  list.push(contact);
  await writeContacts(list);
  return contact;
};

// 1. Recevies list of all contacts
// 2. Recevies object of contact to be updated
// 3. Finds index of contact in list of all contacts
// 4. If index != -1, then it will replace content of object
// 5. Writes new array to contacts file
// 6. Returns updated contact
const updateContact = async (contactId, body) => {
  const list = await listContacts();
  const contactToUpdate = await getContactById(contactId);
  const index = list.findIndex((contact) => contact.id === contactToUpdate.id);
  if (~index) {
    list[index] = { ...contactToUpdate, ...body };
  }
  await writeContacts(list);
  return list[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
