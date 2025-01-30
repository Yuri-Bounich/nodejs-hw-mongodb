import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, {
      abortEarly: false, // Продовжити валідацію навіть після першої помилки
      allowUnknown: false, // Не дозволяти незнайомі поля в тілі запиту
      convert: false, // Не конвертувати значення перед валідацією
    });
    next();
  } catch (err) {
    const error = createHttpError(400, 'Bad Request', {
      errors: err.details,
    });
    next(error);
  }
};
