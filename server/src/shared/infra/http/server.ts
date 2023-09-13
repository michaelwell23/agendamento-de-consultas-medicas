import 'reflect-metadata';
import 'dotenv/config';
import { errors } from 'celebrate';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

import 'express-async-errors';

import upload from '@config/uploads';
import AppError from '@shared/errors/AppError';
import routes from './routes/index.routes';
import rateLimiter from './middlewares/rateLimiter';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(rateLimiter);
app.use(cors());

app.use(express.json());
app.use('/files', express.static(upload.uploadsFolder));
app.use(routes);

app.use(errors());

app.use(
  (err: Error, request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: 'Internal server Error',
    });
  },
);

const PORT = 3333;
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT} 🚀`);
});
