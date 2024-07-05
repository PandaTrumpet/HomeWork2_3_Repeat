import { contactsType } from '../constans/contacts-constant.js';
const parseBoolean = (value) => {
  if (typeof value !== 'string') return;
  if (!['true', 'false'].includes(value)) return;
  const parseValue = Boolean(value);
  return parseValue;
};
export const parseFilterContactsParams = ({ contactType, isFavourite }) => {
  const parsedType = contactsType.includes(contactType) ? contactType : null;
  const parsedIsFavourite = parseBoolean(isFavourite);
  return {
    contactType: parsedType,
    isFavourite: parsedIsFavourite,
  };
};
