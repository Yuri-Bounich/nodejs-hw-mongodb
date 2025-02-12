import Joi from 'joi';

export const registerUserValidationSchema = Joi.object({
  name: Joi.string().min(1).max(30).required().messages({
    'string.base': 'Name should be a string',
    'string.empty': 'Name cannot be empty',
    'string.min': 'Name should have at least {#limit} characters',
    'string.max': 'Name should have at most {#limit} characters',
    'any.required': 'Name is a required field',
  }),
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
