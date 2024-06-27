import { Router } from 'express';

import {
  getAllContactsController,
  getContactByIdController,
} from '../controllers/contacts.js';
const contactRouter = Router();

contactRouter.get('/contacts', getAllContactsController);
contactRouter.get('/contacts/:contactId', getContactByIdController);

export default contactRouter;
