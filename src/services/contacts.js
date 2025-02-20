import { contactsCollections } from '../db/models/contacts.js';
import { saveFile } from '../utils/saveFile.js';

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

export const getAllContacts = async ({
  userId,
  page,
  perPage,
  sortBy,
  sortOrder,
}) => {
  const offset = (page - 1) * perPage;
  const data = await contactsCollections
    .find({ userId })
    .skip(offset)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });
  const contactsCount = await contactsCollections
    .find()
    .countDocuments({ userId });
  const paginationMetadata = createPaginationsMetadata(
    page,
    perPage,
    contactsCount,
  );

  return { data, ...paginationMetadata };
};

export const getContactById = async (userId, contactId) => {
  const contact = await contactsCollections.findOne({ userId, _id: contactId });
  return contact;
};

export const createContact = async (payload) => {
  const contact = await contactsCollections.create(payload);
  return contact;
};

export const updatedContacts = async (
  userId,
  contactId,
  { photo, ...payload },
) => {
  let photoUrl;
  if (photo) {
    photoUrl = await saveFile(photo);
  }
  const contact = await contactsCollections.findByIdAndUpdate(
    { userId, _id: contactId },
    {
      ...payload,
      ...(photoUrl ? { photo: photoUrl } : {}),
    },
    { new: true },
  );
  return contact;
};

export const deleteContactById = async (userId, contactId) => {
  return await contactsCollections.findByIdAndDelete({
    userId,
    _id: contactId,
  });
};
