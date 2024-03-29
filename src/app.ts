import express, { NextFunction, Response, Request } from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import './services/tsyringe/container';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swaggerDocument.json';
import { router } from './routes';
import AppError from './shareds/appError/AppError';

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: err.message,
  });
});

export { app };
