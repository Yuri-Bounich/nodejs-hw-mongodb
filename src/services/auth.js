import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { userCollections } from '../db/models/user.js';
import { sessionCollections } from '../db/models/sessions.js';
import {
  ACCESS_TOKEN_LIVE_TIME,
  REFRESH_TOKEN_LIVE_TIME,
} from '../constans/time.js';

const createSession = () => ({
  accessToken: crypto.randomBytes(20).toString('base64'),
  refreshToken: crypto.randomBytes(20).toString('base64'),
  refreshTokenValidUntil: new Date(Date.now() + REFRESH_TOKEN_LIVE_TIME),
  accessTokenValidUntil: new Date(Date.now() + ACCESS_TOKEN_LIVE_TIME),
});

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

  await sessionCollections.deleteOne({ userId: user._id });

  const session = await sessionCollections.create({
    ...createSession(),
    userId: user._id,
  });

  return session;
};

export const refreshSession = async ({ sessionToken, sessionId }) => {
  const session = await sessionCollections.findOne({
    _id: sessionId,
    refreshToken: sessionToken,
  });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  if (session.refreshTokenValidUntil < new Date()) {
    throw createHttpError(401, 'Session token expired');
  }

  const user = await userCollections.findById(session.userId);

  if (!user) {
    throw createHttpError(401, 'Session user is not found');
  }

  await sessionCollections.findByIdAndDelete(session._id);

  const newSession = await sessionCollections.create({
    ...createSession(),
    userId: session.userId,
  });

  return newSession;
};

export const logoutUser = async ({ sessionToken, sessionId }) => {
  await sessionCollections.deleteOne({
    refreshToken: sessionToken,
    _id: sessionId,
  });
};
