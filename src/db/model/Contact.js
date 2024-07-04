import { Schema, model } from 'mongoose';
import { contactsType } from '../../constans/contacts-constant.js';
const contactSchema = new Schema(
  {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: false },
    isFavourite: { type: Boolean, default: false },
    contactType: {
      type: String,
      enum: contactsType,
      default: 'personal',
    },
  },
  { timestamps: true, versionKey: false },
);

export const ContactsCollection = model('contact', contactSchema);
