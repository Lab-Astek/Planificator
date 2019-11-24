import createError from 'http-errors';
import * as httpStatus from 'http-status-codes';

// eslint-disable-next-line import/named
import { firebaseAdmin } from 'appDatabase';
import logger from 'appLogger';

import Roles from './roles';

function roleMiddleware(req, res, next) {
}

async function createAdmin(context) {
  const { email, name } = context;
  const path = `/${Roles.ADMIN}`;

  const admins = (await firebaseAdmin.database().ref(path).once('value')).val() || {};
  if (Object.values(admins).find((admin) => admin.email === email)) {
    throw createError(httpStatus.CONFLICT, `${Roles.ADMIN} [ ${email} ] already exists`);
  }
  if (Object.values(admins).find((admin) => admin.name === name)) {
    throw createError(httpStatus.CONFLICT, `${Roles.ADMIN} [ ${name} ] already exists`);
  }
  await firebaseAdmin.database().ref(path).push({ email, name });
  logger.info(`[ ${email} ] registered as [ ${Roles.ADMIN} ]!`);
}

module.exports = {
  roleMiddleware,
  createAdmin,
};
