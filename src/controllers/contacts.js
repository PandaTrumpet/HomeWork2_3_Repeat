import {
  addContact,
  deleteContact,
  getAllContacts,
  getContactById,
  upsertContact,
} from '../services/contacts.js';
// import { errorHanlder } from '../middlewares/errorHandler.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParamas } from '../utils/perseSortParams.js';
import { contactsFieldList } from '../constans/contacts-constant.js';
import { parseFilterContactsParams } from '../utils/parseFilterParams.js';
export const getAllContactsController = async (req, res, next) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParamas(req.query, contactsFieldList);
  const filter = parseFilterContactsParams(req.query);
  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};
export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};
export const addContactController = async (req, res) => {
  const contact = await addContact(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successful added contact',
    data: contact,
  });
};
export const upsertContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await upsertContact(contactId, req.body, { upsert: true });
  if (!contact) {
    next(createHttpError(404, { message: 'You have a problem with pathing' }));
    return;
  }
  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: contact,
  });
};
export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await deleteContact(contactId);
  if (!contact) {
    next(createHttpError(404, { message: 'Contact not found' }));
    return;
  }
  res.status(204).send();
};
