import { isHttpError } from 'http-errors';
import { MongooseError } from 'mongoose';

export const errorHandler = (err, req, res, next) => {
  // console.error(err); // Лог помилки для дебагу

  // Обробка Joi-валидації (перевіряємо перед HTTP-Errors)
  if (err.errors) {
    return res.status(400).json({
      status: 400,
      message: err.message || 'Validation error',
      errors: err.errors, // Тепер містить детальну інформацію
    });
  }

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

  res.status(500).json({
    status: 500,
    message: err.message,
    name: 'Internal server error',
  });
};
