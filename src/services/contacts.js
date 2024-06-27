import { ContactsCollection } from '../db/models/contacts.js';
export const getAllContacts = async () => {
  const contacts = ContactsCollection.find();
  return contacts;
};

export const getContactById = async (id) => {
  const contact = ContactsCollection.findById(id);
  return contact;
};
