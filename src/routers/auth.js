import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerUserController } from '../controllers/auth.js';
import { registerUserValidationSchema } from '../validation/registerUserValidationSchema.js';
import { validateBody } from '../middlewares/validateBody.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerUserValidationSchema),
  ctrlWrapper(registerUserController),
);
authRouter.post('/login');
authRouter.post('/refresh');
authRouter.post('/logout');

export default authRouter;
