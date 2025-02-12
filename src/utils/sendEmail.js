import nodemailer from 'nodemailer';
import { getEnvVar } from './getEnvVar.js';
import { ENV_VARS } from '../constans/env.js';
import createHttpError from 'http-errors';

const transport = nodemailer.createTransport({
  host: getEnvVar(ENV_VARS.SMTP_HOST),
  port: getEnvVar(ENV_VARS.SMTP_PORT),
  auth: {
    user: getEnvVar(ENV_VARS.SMTP_USER),
    pass: getEnvVar(ENV_VARS.SMTP_PASS),
  },
});

export const sendEmail = async (options) => {
  try {
    console.log('Sending email with options:', options);
    return await transport.sendMail({
      from: options.from,
      to: options.to,
      subject: options.subject,
      html: options.html,
    });
  } catch (err) {
    console.error(err);
    throw createHttpError(
      500,
      'Failed to send the email, please try again later.',
    );
  }
};
