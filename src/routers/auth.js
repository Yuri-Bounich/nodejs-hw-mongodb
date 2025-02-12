import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginUserController,
  logoutUserController,
  refreshSessionController,
  registerUserController,
  sendResetEmailController,
  resetRasswordController,
} from '../controllers/auth.js';
import { registerUserValidationSchema } from '../validation/registerUserValidationSchema.js';
import { validateBody } from '../middlewares/validateBody.js';
import { loginUserValidationSchema } from '../validation/loginUserValidationSchema.js';
import { sendResetEmailValidationSchema } from '../validation/sendResetEmailValidationSchema.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerUserValidationSchema),
  ctrlWrapper(registerUserController),
);
authRouter.post(
  '/login',
  validateBody(loginUserValidationSchema),
  ctrlWrapper(loginUserController),
);
authRouter.post('/refresh', ctrlWrapper(refreshSessionController));
authRouter.post('/logout', ctrlWrapper(logoutUserController));

authRouter.post(
  '/send-reset-email',
  validateBody(sendResetEmailValidationSchema),
  ctrlWrapper(sendResetEmailController),
);
authRouter.post('/reset-password', ctrlWrapper(resetRasswordController));

export default authRouter;
