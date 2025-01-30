import { isHttpError } from 'http-errors';
import { MongooseError } from 'mongoose';

export const errorHandler = (err, req, res, next) => {
  if (isHttpError(err)) {
    return res.status(err.status).json({
      status: err.status,
      message: err.message,
      name: err.name,
    });
  }

  if (err instanceof MongooseError) {
    res.status(500).json({
      status: 500,
      message: err.message,
      name: 'Mongoose error',
    });
    return;
  }

  if (err.isJoi) {
    res.status(400).json({
      status: 400,
      message: err.message,
      errors: err.details.map((err) => ({
        message: err.message,
        path: err.path,
      })),
      name: 'Validation error',
    });
    return;
  }

  res.status(500).json({
    status: 500,
    message: err.message,
    name: 'Internal server error',
  });
};
