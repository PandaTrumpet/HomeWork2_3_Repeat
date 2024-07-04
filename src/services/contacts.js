import { ContactsCollection } from '../db/model/Contact.js';
export const getAllContacts = async () => {
  return await ContactsCollection.find();
};

export const getContactById = async (contactId) => {
  return await ContactsCollection.findById(contactId);
};

export const addContact = async (data) => {
  return await ContactsCollection.create(data);
};
export const upsertContact = async (contactId, data, options = {}) => {
  const contact = await ContactsCollection.findOneAndUpdate(
    { _id: contactId },
    data,
    { new: true, includeResultMetadata: true, ...options },
  );
  if (!contact || !contact.value) return null;
  return {
    data: contact.value,
    isNew: Boolean(contact?.lastErrorObject?.upserted),
  };
};

export const deleteContact = async (contactId) => {
  return await ContactsCollection.findOneAndDelete({ _id: contactId });
};
