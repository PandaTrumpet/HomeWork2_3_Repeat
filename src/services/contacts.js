import { ContactsCollection } from '../db/model/Contact.js';
import { calculatePaginationParams } from '../utils/calculatePaginationData.js';
export const getAllContacts = async ({ page, perPage }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const contactsQuery = ContactsCollection.find();
  const totalItem = await ContactsCollection.find()
    .merge(contactsQuery)
    .countDocuments();
  const contacts = await contactsQuery.skip(skip).limit(limit).exec();
  const { totalPage, hasNextPage, hasPrevPage } = calculatePaginationParams(
    totalItem,
    perPage,
    page,
  );
  return {
    contacts,
    totalItem,
    page,
    perPage,
    totalPage,
    hasNextPage,
    hasPrevPage,
  };
  // return await ContactsCollection.find();
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
