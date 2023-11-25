const fs = require("fs/promises");
// const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join("contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactById = async (id) => {
  const contacts = listContacts();
  const contact = contacts.find((contact) => contact.id === id);
  return contact || null;
};

const removeContact = async (contactId) => {};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid,
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
