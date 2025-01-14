import { writeContacts } from '../utils/writeContacts.js';
import { readContacts } from '../utils/readContacts.js';

export const removeLastContact = async () => {
  try {
    // Читаємо контакти з файлу
    const contacts = await readContacts();

    // Перевіряємо, чи є хоча б один контакт
    if (contacts.length === 0) {
      console.log('Немає контактів для видалення.');
      return;
    }

    // Видаляємо останній контакт
    contacts.pop();

    // Записуємо оновлений масив назад у файл
    await writeContacts(contacts);

    console.log('Останній контакт успішно видалено.');
  } catch (err) {
    console.error('Помилка при видаленні останнього контакту:', err.message);
  }
};

removeLastContact();
