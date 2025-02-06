import Joi from 'joi';

export const loginUserValidationSchema = Joi.object({
  email: Joi.string().email().min(3).max(20).required().messages({
    'string.email': 'Invalid email format',
    'string.empty': 'Email cannot be empty',
    'any.required': 'Email is a required field',
  }),
  password: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Password should be a string',
    'string.empty': 'Password cannot be empty',
    'string.min': 'Password should have at least {#limit} characters',
    'string.max': 'Password should have at most {#limit} characters',
    'any.required': 'Password is a required field',
  }),
});
