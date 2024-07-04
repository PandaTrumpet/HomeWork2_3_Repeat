import Joi from 'joi';
import { contactsType } from '../constans/contacts-constant.js';
export const createContactSchema = Joi.object({
  name: Joi.string().required().min(3).max(20),
  phoneNumber: Joi.string().required().min(3).max(20),
  email: Joi.string().email().min(3).max(20),
  isFavouriet: Joi.boolean(),
  contactType: Joi.string()
    .min(3)
    .max(20)
    .valid(...contactsType),
});
