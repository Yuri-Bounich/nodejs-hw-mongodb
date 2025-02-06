import { loginUser, registerUser } from '../services/auth.js';
import { serializedUser } from '../utils/serislizeUser.js';

export const registerUserController = async (req, res) => {
  const { body } = req;

  const user = await registerUser(body);

  res.json({
    status: 201,
    message: 'Successfully registered a user!',
    data: serializedUser(user),
  });
};

export const loginUserController = async (req, res) => {
  const { body } = req;

  const session = await loginUser(body);

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: session,
  });
};
