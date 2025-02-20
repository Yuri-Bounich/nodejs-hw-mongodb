import express, { json } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import pino from 'pino-http';
import { getEnvVar } from './utils/getEnvVar.js';
import router from './routers/index.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { UPLOADS_DIR_PATH } from './constans/path.js';

const PORT = Number(getEnvVar('PORT', 3000));

export const setupServer = () => {
  const app = express();

  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
      limit: '100kb',
    }),
  );

  app.use('/uploads', express.static(UPLOADS_DIR_PATH));

  app.use(cors());
  app.use(cookieParser());

  app.use(json());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(router);

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
