import { contactsCollections } from '../db/models/contacts.js';

export const getAllContacts = async () => {
  const contacts = await contactsCollections.find();
  return contacts;
};

export const getContactById = async (contactId) => {
  const contact = await contactsCollections.findById(contactId);
  return contact;
};

export const createContact = async (payload) => {
  const contact = await contactsCollections.create(payload);
  return contact;
};

export const updatedContacts = async (contactId, payload) => {
  const contact = await contactsCollections.findByIdAndUpdate(
    contactId,
    payload,
    { new: true },
  );
  return contact;
};

export const deleteContactById = async (contactId) => {
  return await contactsCollections.findByIdAndDelete(contactId);
};
