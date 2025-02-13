import Joi from 'joi';

export const sendResetEmailValidationSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Invalid email format',
    'string.empty': 'Email cannot be empty',
    'any.required': 'Email is a required field',
  }),
});
