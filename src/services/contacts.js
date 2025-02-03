import { contactsCollections } from '../db/models/contacts.js';

const createPaginationsMetadata = (page, perPage, count) => {
  const totalPages = Math.ceil(count / perPage);
  const hasPreviousPage = page !== 1;
  const hasNextPage = count > page * perPage;

  return {
    page,
    perPage,
    totalItems: count,
    totalPages,
    hasPreviousPage,
    hasNextPage,
  };
};

export const getAllContacts = async ({ page, perPage, sortBy, sortOrder }) => {
  const offset = (page - 1) * perPage;
  const data = await contactsCollections
    .find()
    .skip(offset)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });
  const contactsCount = await contactsCollections.find().countDocuments();
  const paginationMetadata = createPaginationsMetadata(
    page,
    perPage,
    contactsCount,
  );

  return { data, ...paginationMetadata };
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
