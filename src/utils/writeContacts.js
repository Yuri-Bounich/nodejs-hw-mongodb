import { PATH_DB } from '../constants/contacts.js';
import fs from 'fs/promises';

export const writeContacts = async (updatedContacts) => {
  try {
    // Перетворення даних у формат JSON із відступами для зручності читання
    const jsonData = JSON.stringify(updatedContacts, null, 2);

    // Запис у файл
    await fs.writeFile(PATH_DB, jsonData, 'UTF-8');
    console.log('Дані успішно записані у файл.');
  } catch (err) {
    console.error('Помилка запису у файл:', err.message);
    throw err;
  }
};
