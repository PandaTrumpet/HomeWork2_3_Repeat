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
import { validateBody } from '../middlewares/validateBody.js';
import { createContactSchema } from '../validation/contacts.js';
const contactRouter = Router();

contactRouter.get('/contacts', ctrlWrapper(getAllContactsController));
contactRouter.get(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(getContactByIdController),
);

contactRouter.post(
  '/contacts',
  validateBody(createContactSchema),
  ctrlWrapper(addContactController),
);
contactRouter.patch(
  '/contacts/:contactId',
  validateBody(createContactSchema),
  isValidId,
  ctrlWrapper(upsertContactController),
);
contactRouter.delete(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(deleteContactController),
);
export default contactRouter;
