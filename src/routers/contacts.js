import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getAllContactsController,
  getContactByIdController,
} from '../controllers/contacts.js';
const contactRouter = Router();

contactRouter.get('/contacts', ctrlWrapper(getAllContactsController));
contactRouter.get(
  '/contacts/:contactId',
  ctrlWrapper(getContactByIdController),
);

export default contactRouter;
