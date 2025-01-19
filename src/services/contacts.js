import { contactsCollections } from '../db/models/contacts.js';

export const getAllContacts = async () => {
  const contacts = await contactsCollections.find();
  return contacts;
};

export const getContactById = async (contactId) => {
  const contact = await contactsCollections.findById(contactId);
  return contact;
};
