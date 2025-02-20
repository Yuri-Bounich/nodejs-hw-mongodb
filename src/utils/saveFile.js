import createHttpError from 'http-errors';
import { ENV_VARS } from '../constans/env.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { saveFileToLocal } from '../utils/saveFileToLocal.js';
import { getEnvVar } from './getEnvVar.js';

export const saveFile = async (file) => {
  const strategy = getEnvVar(ENV_VARS.SAVE_FILE_STRATEGY);
  if (strategy === 'cloudinary') {
    return await saveFileToCloudinary(file);
  }
  if (strategy === 'local') {
    return await saveFileToLocal(file);
  }
  throw createHttpError(500, 'No file storage strategy set');
};
