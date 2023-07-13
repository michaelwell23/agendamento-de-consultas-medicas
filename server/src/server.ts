import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import routes from './routes';

import './database';
import upload from './config/uploads';
import AppError from './errors/AppError';

const app = express();

app.use(express.json());
app.use('/files', express.static(upload.directory));
app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    console.log(err);

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
