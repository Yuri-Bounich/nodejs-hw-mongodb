import fs from 'node:fs/promises';
import path from 'node:path';
import { UPLOADS_DIR_PATH } from '../constans/path.js';
import { getEnvVar } from './getEnvVar.js';
import { ENV_VARS } from '../constans/env.js';

export const saveFileToLocal = async (photo) => {
  await fs.rename(photo.path, path.join(UPLOADS_DIR_PATH, photo.filename));
  return `${getEnvVar(ENV_VARS.BACKEND_DOMAIN)}/uploads/${photo.filename}`;
};
