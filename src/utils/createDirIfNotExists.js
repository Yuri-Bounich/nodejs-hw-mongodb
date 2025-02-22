import fs from 'fs/promises';

export const createDirIfNotExists = async (path) => {
  try {
    await fs.access(path);
    console.log(`Директорія "${path}" вже існує.`);
  } catch (err) {
    if (err.code === 'ENOENT') {
      await fs.mkdir(path, { recursive: true });
      console.log(`Створено директорію: "${path}"`);
    } else {
      console.error(`Помилка при доступі до директорії "${path}":`, err);
      throw err;
    }
  }
};
