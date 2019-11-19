import createError from 'http-errors';
import * as httpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

import { privateKey } from 'config.json';

function authMiddleware(req, res, next) {
  if (req.method === 'OPTIONS') {
    next();
    return;
  }
  const { token } = req.session;
  if (!token) throw createError(httpStatus.UNAUTHORIZED, 'No token provided');

  try {
    req.auth = jwt.verify(token, privateKey);
    next();
  } catch (err) {
    throw createError(httpStatus.UNAUTHORIZED, 'Invalid or expired token');
  }
}

module.exports = {
  authMiddleware,
};
