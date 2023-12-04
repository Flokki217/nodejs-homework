const Contact = require("./schema/index");

const getAllContacts = () => {
  return Contact.find();
};

const getContactById = (id) => {
  return Contact.findById({ _id: id });
};

const removeContact = (id) => {
  return Contact.findByIdAndDelete({ _id: id });
};

const createContact = (data) => {
  return Contact.create(data);
};

const updateContact = (id, data) => {
  return Contact.findByIdAndUpdate({ _id: id }, data, { new: true });
};
const updateFavoriteContact = (id, data) => {
  return Contact.findByIdAndUpdate({ _id: id }, data, { new: true });
};

module.exports = {
  getAllContacts,
  getContactById,
  removeContact,
  createContact,
  updateFavoriteContact,
  updateContact,
};
