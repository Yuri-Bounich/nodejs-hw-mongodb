import { PATH_DB } from '../constants/contacts.js';
import fs from 'fs/promises';

export const readContacts = async () => {
  try {
    const content = await fs.readFile(PATH_DB, 'UTF-8');
    console.log('Вміст файлу:', content);
    return JSON.parse(content);
  } catch (err) {
    console.error('Помилка читання файлу:', err.message);
    throw err;
  }
};
