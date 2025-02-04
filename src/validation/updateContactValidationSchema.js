import Joi from 'joi';
import { CONTACTTYPE } from '../constans/type.js';

export const updateContactValidationSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.base': 'Name should be a string',
    'string.empty': 'Name cannot be empty',
    'string.min': 'Name should have at least {#limit} characters',
    'string.max': 'Name should have at most {#limit} characters',
    'any.required': 'Name is a required field',
  }),
  phoneNumber: Joi.string().min(3).max(20).messages({
    'string.base': 'Phone number should be a string',
    'string.empty': 'Phone number cannot be empty',
    'string.min': 'Phone number should have at least {#limit} characters',
    'string.max': 'Phone number should have at most {#limit} characters',
    'any.required': 'Phone number is a required field',
  }),
  email: Joi.string().min(3).max(20).messages({
    'string.email': 'Invalid email format',
    'string.empty': 'Email cannot be empty',
    'any.required': 'Email is a required field',
  }),
  isFavourite: Joi.boolean().default(false).messages({
    'boolean.base': 'isFavourite should be a boolean (true/false)',
  }),
  contactType: Joi.string()
    .valid(...Object.values(CONTACTTYPE))
    .messages({
      'any.only': `contactType should be one of the following: ${Object.values(
        CONTACTTYPE,
      ).join(', ')}`,
      'any.required': 'contactType is a required field',
    }),
});
