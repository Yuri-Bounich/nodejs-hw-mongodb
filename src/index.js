import { initMongoDB } from './db/initMongoConnection.js';
import { setupServer } from './server.js';

const bootstrap = async () => {
  try {
    await initMongoDB();
    setupServer(); // Запускається тільки після підключення до бази
  } catch (error) {
    console.error('Failed to initialize application:', error.message);
    process.exit(1); // Завершити процес у разі невдачі
  }
};

bootstrap();
