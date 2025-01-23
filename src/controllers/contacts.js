import { getAllContacts, getContactById } from './services/contacts.js';

export const getContactsController = async (req, res, next) => {
  try {
    const contacts = await getAllContacts();
    // console.log('Contacts:', contacts); // Логує всі знайдені контакти
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    console.error('Error fetching contacts:', error.message);
    next(error); // Якщо сталася помилка, передайте її до обробника помилок
  }
};

export const getContactByIdController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    // console.log('Contact:', contact); // Логує знайден контакт
    if (!contact) {
      next(new Error('Contact not found'));
      //   res.status(404).json({ massage: 'Contact not found' });
      return;
    }
    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    console.error('Error fetching contacts:', error.message);
    next(error); // Якщо сталася помилка, передайте її до обробника помилок
  }
};
