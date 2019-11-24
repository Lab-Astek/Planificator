import createError from 'http-errors';
import * as httpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

import { privateKey } from 'config/appConfig.json';
// eslint-disable-next-line import/named
import { firebaseAdmin, firebase } from 'appDatabase';
import logger from 'appLogger';

function authMiddleware(req, res, next) {
  const { token } = req.session;
  if (!token) throw createError(httpStatus.UNAUTHORIZED, 'No token provided');

  try {
    req.auth = jwt.verify(token, privateKey);
    next();
  } catch (err) {
    throw createError(httpStatus.UNAUTHORIZED, 'Invalid or expired token');
  }
}

async function login(req, context) {
  const { accessToken } = context;

  try {
    const credential = firebase.auth.GoogleAuthProvider.credential(null, accessToken);
    const { user } = await firebase.auth().signInWithCredential(credential);
    const token = jwt.sign({ id: user.uid }, privateKey);

    const dbUser = await firebaseAdmin.database().ref(`/users/${user.uid}`).once('value');
    if (!dbUser.val()) {
      await firebaseAdmin.database().ref(`/users/${user.uid}`).set({ email: user.email });
    }
    req.session.token = token;
    logger.info(`User ${user.email} just logged in`);
  } catch (err) {
    throw createError(httpStatus.UNAUTHORIZED, err.message);
  }
}

async function logAsAdmin(req, context) {
  const { email, password } = context;

  try {
    const { user } = await firebase.auth().signInWithEmailAndPassword(email, password);
    req.session.token = jwt.sign({ id: user.uid }, privateKey);
    logger.info(`User ${user.email} just logged in as ADMIN`);
  } catch (err) {
    throw createError(httpStatus.UNAUTHORIZED, err.message);
  }
}

module.exports = {
  authMiddleware,
  login,
  logAsAdmin,
};
