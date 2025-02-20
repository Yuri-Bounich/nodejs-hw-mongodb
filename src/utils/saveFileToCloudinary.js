import cloudinary from 'cloudinary';
import fs from 'node:fs/promises';
import { getEnvVar } from './getEnvVar.js';
import { ENV_VARS } from '../constans/env.js';
import createHttpError from 'http-errors';

cloudinary.config({
  cloud_name: getEnvVar(ENV_VARS.CLOUDINARY_CLOUD_NAME),
  api_key: getEnvVar(ENV_VARS.CLOUDINARY_API_KEY),
  api_secret: getEnvVar(ENV_VARS.CLOUDINARY_API_SECRET),
});

export const saveFileToCloudinary = async (file) => {
  try {
    const res = await cloudinary.v2.uploader.upload(file.path);
    return res.secure_url;
  } catch (err) {
    console.log(err);
    throw createHttpError(500, 'File to upload an image to cloudinary!');
  } finally {
    await fs.unlink(file.path);
  }
};
