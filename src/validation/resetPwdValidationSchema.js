import Joi from 'joi';

export const resetPwdValidationSchema = Joi.object({
  password: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Password should be a string',
    'string.empty': 'Password cannot be empty',
    'string.min': 'Password should have at least {#limit} characters',
    'string.max': 'Password should have at most {#limit} characters',
    'any.required': 'Password is a required field',
  }),
  token: Joi.string().required(),
});
