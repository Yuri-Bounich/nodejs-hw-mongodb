import { TEMP_DIR_PATH, UPLOADS_DIR_PATH } from './constans/path.js';
import { initMongoDB } from './db/initMongoConnection.js';
import { setupServer } from './server.js';
import { createDirIfNotExsists } from './utils/createDirIfNotExsists.js';

const bootstrap = async () => {
  try {
    await createDirIfNotExsists(TEMP_DIR_PATH);
    await createDirIfNotExsists(UPLOADS_DIR_PATH);
    await initMongoDB();
    await setupServer(); // Запускається тільки після підключення до бази
  } catch (error) {
    console.error('Failed to initialize application:', error.message);
    process.exit(1); // Завершити процес у разі невдачі
  }
};

bootstrap();
