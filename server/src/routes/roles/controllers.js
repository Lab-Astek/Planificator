import createError from 'http-errors';
import * as httpStatus from 'http-status-codes';

import { database } from 'appDatabase';
import logger from 'appLogger';

import Roles from './roles';

function roleMiddleware(role) {
  return async (req, res, next) => {
    if (!Object.values(Roles).includes(role)) {
      next(createError(httpStatus.INTERNAL_SERVER_ERROR, `Route protected with an unknown role : ${role}`));
    } else {
      const roleUsers = await database.getArrayFrom(`/${role}`);
      if (!roleUsers.find((roleUser) => roleUser.email === req.auth.email)) {
        next(createError(httpStatus.FORBIDDEN, `You need to have ${role} role to interact with this API endpoints`));
      } else {
        next();
      }
    }
  };
}

async function createAdmin(context) {
  const { email, name } = context;
  const path = `/${Roles.ADMIN}`;

  const admins = await database.getArrayFrom(path);
  if (admins.find((admin) => admin.email === email)) {
    throw createError(httpStatus.CONFLICT, `${Roles.ADMIN} [ ${email} ] already exists`);
  }
  if (admins.find((admin) => admin.name === name)) {
    throw createError(httpStatus.CONFLICT, `${Roles.ADMIN} [ ${name} ] already exists`);
  }
  await database.push({ email, name });
  logger.info(`[ ${email} ] registered as [ ${Roles.ADMIN} ]!`);
}

module.exports = {
  roleMiddleware,
  createAdmin,
};
