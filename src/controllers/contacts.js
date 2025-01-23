import createHttpError from 'http-errors';
import {
  getAllContacts,
  getContactById,
  deleteContactById,
  createContact,
} from '../services/contacts.js';

export const getContactsController = async (req, res, next) => {
  const contacts = await getAllContacts();
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const { name, phoneNumber, contactType, email, isFavourite } = req.body;

  // Валідація обов'язкових полів
  if (!name) {
    throw createHttpError(400, "Field 'name' is required");
  }
  if (!phoneNumber) {
    throw createHttpError(400, "Field 'phoneNumber' is required");
  }
  if (!contactType) {
    throw createHttpError(400, "Field 'contactType' is required");
  }
  const contact = await createContact({
    name,
    phoneNumber,
    contactType,
    email,
    isFavourite,
  });

  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: contact,
  });
};

export const deleteContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await deleteContactById(contactId);
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  res.status(204).send();
};
