import createHttpError from 'http-errors';
import { sessionCollections } from '../db/models/sessions.js';
import { userCollections } from '../db/models/user.js';

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
      return next(
        new createHttpError(401, 'No Authorization header provided!'),
      );
    }

    const [bearer, token] = authHeader.split(' ');
    if (bearer !== 'Bearer') {
      return next(
        new createHttpError(401, 'Authorization should be of Bearer type'),
      );
    }

    if (!token) {
      return next(new createHttpError(401, 'No Access token provided'));
    }

    const session = await sessionCollections.findOne({ accessToken: token });
    if (!session) {
      return next(new createHttpError(401, 'No active session found'));
    }

    if (session.accessTokenValidUntil < new Date()) {
      return next(new createHttpError(401, 'Access token expired'));
    }

    const user = await userCollections.findById(session.userId);
    if (!user) {
      await sessionCollections.findByIdAndDelete(session._id);
      return next(new createHttpError(401, 'No user found for such session'));
    }

    req.user = user;

    next();
  } catch (err) {
    console.error('Authentication error:', err);
    next(new createHttpError(500, 'Internal Server Error'));
  }
};
