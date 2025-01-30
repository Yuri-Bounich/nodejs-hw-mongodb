import Joi from 'joi';
import { CONTACTTYPE } from '../constans/type.js';

export const createContactValidationSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string().min(3).max(20).required(),
  email: Joi.string().min(3).max(20).required(),
  isFavourite: Joi.boolean().default(false),
  contactType: Joi.string()
    .valid(...Object.values(CONTACTTYPE))
    .required(),
});
