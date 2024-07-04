import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { env } from './utils/env.js';
import contactRouter from './routers/contacts.js';
import detenv from 'dotenv';
import { errorHanlder } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

detenv.config();
const PORT = Number(env('PORT', '3000'));
export const setupServer = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());
  const logger = pino({
    transport: {
      target: 'pino-pretty',
    },
  });
  app.use(logger);
  app.get('/', (req, res) => {
    res.json({
      message: 'Hello, Panda!',
    });
  });
  app.use(contactRouter);

  app.get(notFoundHandler);
  app.use(errorHanlder);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} `);
  });
};
