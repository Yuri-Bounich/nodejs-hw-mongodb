import { PATH_DB } from '../constants/contacts.js';
import fs from 'node:fs/promises';
import { createFakeContact } from '../utils/createFakeContact.js';

export const addOneContact = async (number = 1) => {
  try {
    // Читаємо поточні контакти з файлу
    const fileContent = await fs.readFile(PATH_DB, 'utf-8');
    const existingContacts = fileContent ? JSON.parse(fileContent) : [];

    // Генеруємо нові контакти
    const newContacts = Array.from({ length: number }, () =>
      createFakeContact(),
    );

    // Додаємо нові контакти до існуючих
    const updatedContacts = [...existingContacts, ...newContacts];

    // Записуємо оновлений масив у файл
    await fs.writeFile(
      PATH_DB,
      JSON.stringify(updatedContacts, null, 2),
      'utf-8',
    );
    console.log(`Успішно згенеровано та додано ${number} контактів.`);
  } catch (err) {
    console.error('Помилка при генерації контактів:', err.message);
    throw err;
  }
};

addOneContact(1);
