import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import crypto from 'node: crypto';
import { userCollections } from '../db/models/user.js';
import { sessionCollections } from '../db/models/sessions.js';

export const registerUser = async ({ email, password, name }) => {
  let user = await userCollections.findOne({ email });
  if (user) {
    throw createHttpError(409, 'Email in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await userCollections.create({
    email,
    password: hashedPassword,
    name,
  });
  return newUser;
};

export const loginUser = async ({ email, password }) => {
  const user = await userCollections.findOne({ email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const arePasswordEqual = await bcrypt.compare(password, user.password);
  if (!arePasswordEqual) {
    throw createHttpError(401, 'Login or password is incorrect!');
  }

  const session = await sessionCollections.create({
    accessToken: crypto.randomBytes(20).toString,
    refreshToken: crypto.randomBytes(20).toString,
    userId: user._id,
    refreshTokenValidUntil: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    accessTokenValidUntil: new Date(Date.now() + 1000 * 60 * 15),
  });

  return session;
};
