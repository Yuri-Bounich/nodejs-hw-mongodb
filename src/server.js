import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { getEnvVar } from './utils/getEnvVar.js';
import contactsRouter from './routers/contacts.js';

const PORT = Number(getEnvVar('PORT', 3000));

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(contactsRouter);

  //   app.post('/contacts', async (req, res, next) => {
  //     try {
  //       const newContact = await contactsCollections.create(req.body);
  //       res.status(201).json(newContact);
  //     } catch (error) {
  //       next(error);
  //     }
  //   });

  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

// const createTestContact = async () => {
//   try {
//     const contact = await contactsCollections.create({
//       name: 'Jane Doe',
//       phoneNumber: '+1234567890',
//       email: 'jane.doe@example.com',
//       contactType: 'work',
//     });

//     console.log('Test contact created:', contact);
//   } catch (error) {
//     console.error('Error creating test contact:', error.message);
//   }
// };

// createTestContact();
