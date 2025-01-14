import { writeContacts } from '../utils/writeContacts.js';
export const removeAllContacts = async () => {
  try {
    // Записуємо порожній масив у файл
    await writeContacts([]); // Оскільки ми хочемо видалити всі контакти, записуємо порожній масив
    console.log('Усі контакти успішно видалено.');
  } catch (err) {
    console.error('Помилка при видаленні контактів:', err.message);
    throw err;
  }
};

removeAllContacts();
