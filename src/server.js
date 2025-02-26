import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import pino from 'pino-http';
import { getEnvVar } from './utils/getEnvVar.js';
import router from './routers/index.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { UPLOADS_DIR_PATH } from './constans/path.js';
import { swaggerDoc } from './middlewares/swagger.js';

const PORT = Number(getEnvVar('PORT', 3000));

export const setupServer = () => {
  const app = express();

  // Логування запитів (перед іншими middleware)
  app.use(
    pino({
      transport: {
        target: 'pino-pretty', // Виведення логів в "зручному" форматі
      },
    }),
  );

  // Middleware для парсингу JSON
  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
      limit: '100kb',
    }),
  );

  app.use('/api-docs', swaggerDoc());

  // Статичні файли для папки uploads
  app.use('/uploads', express.static(UPLOADS_DIR_PATH));

  // Middleware для CORS, cookie-parser та JSON
  app.use(cors());
  app.use(cookieParser());

  // Додавання кореневого маршруту
  app.get('/', (req, res) => {
    console.log('GET / запит отримано');
    res.send('Server is running');
  });

  // Всі інші маршрути (контролери)
  app.use(router);

  // Обробка помилок для неіснуючих маршрутів
  app.use('*', notFoundHandler);

  // Глобальний обробник помилок
  app.use(errorHandler);

  // Запуск сервера
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
