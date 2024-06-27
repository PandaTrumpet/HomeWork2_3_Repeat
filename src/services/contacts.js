import { ContactsCollection } from '../db/models/contacts.js';
export const getAllContacts = async () => {
  const contacts = ContactsCollection.find();
  return contacts;
};
