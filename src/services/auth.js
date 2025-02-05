import { userCollections } from '../db/models/user.js';

export const registerUser = async (payload) => {
  const user = await userCollections.create(payload);
  return user;
};
