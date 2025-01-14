import { readContacts } from '../utils/readContacts.js';

export const countContacts = async () => {
  try {
    const contacts = await readContacts(); // Зчитуємо контакти з файлу
    return contacts.length; // Повертаємо кількість контактів
  } catch (err) {
    console.error('Помилка при підрахунку контактів:', err.message);
    throw err;
  }
};

(async () => {
  try {
    const count = await countContacts();
    console.log('Кількість контактів:', count); // Виводимо кількість контактів
  } catch (err) {
    console.error('Помилка при отриманні кількості контактів:', err.message);
  }
})();
