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
    if (err.isJoi) {
      next(
        createHttpError(400, {
          message: 'Validation error',
          errors: err.details.map((detail) => ({
            message: detail.message,
            path: detail.path.join('.'), // Масив у рядок (якщо потрібно)
          })),
        }),
      );
    } else {
      next(err);
    }
  }
};
