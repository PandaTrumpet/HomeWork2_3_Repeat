import { Router } from 'express';
// import { getAllContacts, getContactById } from '../services/contacts.js';
import {
  addContactController,
  deleteContactController,
  getAllContactsController,
  getContactByIdController,
  upsertContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValid.js';
const contactRouter = Router();

contactRouter.get('/contacts', ctrlWrapper(getAllContactsController));
contactRouter.get(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(getContactByIdController),
);

contactRouter.post('/contacts', ctrlWrapper(addContactController));
contactRouter.patch(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(upsertContactController),
);
contactRouter.delete(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(deleteContactController),
);
export default contactRouter;
