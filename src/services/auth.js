import createHttpError from 'http-errors';
import Handlebars from 'handlebars';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { userCollections } from '../db/models/user.js';
import { sessionCollections } from '../db/models/sessions.js';
import {
  ACCESS_TOKEN_LIVE_TIME,
  REFRESH_TOKEN_LIVE_TIME,
} from '../constans/time.js';
import { sendEmail } from '../utils/sendEmail.js';
import { getEnvVar } from '../utils/getEnvVar.js';
import { ENV_VARS } from '../constans/env.js';
import jwt from 'jsonwebtoken';
import fs from 'node:fs';
import { TEMPLATES_DIR_PATH } from '../constans/path.js';
import path from 'node:path';

const templatePath = path.join(TEMPLATES_DIR_PATH, 'reset-password-email.html');

if (!fs.existsSync(templatePath)) {
  throw new Error(`Template not found: ${templatePath}`);
}

const resetEmailTemplate = fs.readFileSync(templatePath).toString();

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

export const sendResetEmail = async (email) => {
  const user = await userCollections.findOne({ email });

  if (!user) {
    throw createHttpError(404, 'User not found!');
  }

  const resetToken = jwt.sign(
    {
      sub: user._id,
      email,
    },
    getEnvVar(ENV_VARS.JWT_SECRET),
    { expiresIn: '5m' },
  );

  const resetPasswordLink = `${getEnvVar(
    ENV_VARS.APP_DOMAIN,
  )}/reset-password?token=${resetToken}`;

  const template = Handlebars.compile(resetEmailTemplate);

  const html = template({ link: resetPasswordLink });

  try {
    await sendEmail({
      to: email,
      from: getEnvVar(ENV_VARS.SMTP_FROM),
      subject: 'Reset password',
      html,
    });

    return {
      status: 200,
      message: 'Reset password email has been successfully sent.',
      data: {},
    };
  } catch (error) {
    console.error('Failed to send email:', error);
    throw createHttpError(
      500,
      'Failed to send the email, please try again later.',
    );
  }
};

export const resetPassword = async ({ password, token }) => {
  let payload;
  console.log('Current JWT_SECRET:', getEnvVar(ENV_VARS.JWT_SECRET));
  try {
    payload = jwt.verify(token, getEnvVar(ENV_VARS.JWT_SECRET));
  } catch (err) {
    console.error(err.message);
    throw createHttpError(401, 'Token is expired or invalid.');
  }
  const user = await userCollections.findById(payload.sub);

  if (!user) {
    throw createHttpError(404, 'User not found!');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await userCollections.findByIdAndUpdate(user._id, {
    password: hashedPassword,
  });
};

export const resetPwd = async ({ password, token }) => {
  let payload;
  try {
    payload = jwt.verify(token, getEnvVar(ENV_VARS.JWT_SECRET));
  } catch (err) {
    console.error('JWT verification error:', err.message);
    throw createHttpError(401, 'Token is expired or invalid.');
  }
  const user = await userCollections.findById(payload.sub);

  if (!user) {
    throw createHttpError(404, 'User not found!');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await userCollections.findByIdAndUpdate(user._id, {
    password: hashedPassword,
  });
  await sessionCollections.deleteMany({ userId: user._id });
};
