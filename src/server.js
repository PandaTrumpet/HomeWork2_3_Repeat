import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { env } from './utils/env.js';

import detenv from 'dotenv';
import contactRouter from './routers/contacts.js';
import { notFoundRoute } from './middlewares/notFoundRoute.js';
import { errorHandler } from './middlewares/errorHandler.js';
detenv.config();
const PORT = Number(env('PORT', '3000'));
export const setupServer = () => {
  const app = express();
  app.use(cors());
  const logger = pino({
    transport: {
      target: 'pino-pretty',
    },
  });
  app.use(logger);
  app.get('/', (req, res) => {
    res.json({
      message: 'Hello',
    });
  });
  app.use(contactRouter);
  // app.get('/contacts', async (req, res) => {
  //   try {
  //     const contacts = await getAllContacts();
  //     res.status(200).json({
  //       status: 200,

  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // });
  // app.get('/contacts/:contactId', async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const contact = await getContactById(id);
  //     res.status(200).json({
  //       status: 200,
  //       message: 'Successfully found contact with id {contactId}!',
  //       data: contact,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // });
  // app.get('*', (req, res, next) => {
  //   res.status(404).json({
  //     message: 'Not found',
  //   });
  // });
  app.use(notFoundRoute);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} `);
  });
};
