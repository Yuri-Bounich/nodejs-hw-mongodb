import { readContacts } from '../utils/readContacts.js';

export const getAllContacts = async () => {
  try {
    const contacts = await readContacts();
    console.log('Список контактів успішно отримано:');
    return contacts;
  } catch (err) {
    console.error('Помилка при отриманні контактів:', err.message);
    throw err;
  }
};

(async () => {
  try {
    const contacts = await getAllContacts();
    console.log(contacts); // Вивести отримані контакти
  } catch (err) {
    console.error('Помилка при отриманні контактів:', err.message);
  }
})();
