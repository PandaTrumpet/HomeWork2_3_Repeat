import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { env } from './utils/env.js';
import { getAllContacts, getContactById } from './services/contacts.js';
import detenv from 'dotenv';
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

  app.get('/contacts', async (req, res) => {
    try {
      const contacts = await getAllContacts();
      res.status(200).json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
      });
    } catch (error) {
      console.log(error);
    }
  });
  app.get('/contacts/:contactId', async (req, res) => {
    try {
      const { id } = req.params;
      const contact = await getContactById(id);
      res.status(200).json({
        status: 200,
        message: 'Successfully found contact with id {contactId}!',
        data: contact,
      });
    } catch (error) {
      console.log(error);
    }
  });
  app.get('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} `);
  });
};
