import createError from 'http-errors';
import * as httpStatus from 'http-status-codes';

import { database } from 'appDatabase';
import logger from 'appLogger';

import Roles from './roles';

function roleMiddleware(roles) {
  return async (req, res, next) => {
    const rolesValidation = roles.every((role) => {
      if (!Object.values(Roles).includes(role)) {
        next(createError(httpStatus.INTERNAL_SERVER_ERROR, `Route protected with an unknown role : ${role}`));
        return false;
      }
      return true;
    });
    if (!rolesValidation) {
      return;
    }

    const rolesUsers = await Promise.all(roles.map((role) => database.getArrayFrom(`/${role}`)));
    const isAuthorized = !rolesUsers.every((roleUsers) => !roleUsers.find((roleUser) => roleUser.email === req.auth.email));

    if (!isAuthorized) {
      next(createError(httpStatus.FORBIDDEN, `You need to have one of those roles ${roles} to interact with this API endpoints`));
    } else {
      next();
    }
  };
}

async function createRole(context, role) {
  const { email, name } = context;
  const path = `/${role}`;

  const admins = await database.getArrayFrom(path);
  if (admins.find((admin) => admin.email === email)) {
    throw createError(httpStatus.CONFLICT, `${role} [ ${email} ] already exists`);
  }
  if (admins.find((admin) => admin.name === name)) {
    throw createError(httpStatus.CONFLICT, `${role} [ ${name} ] already exists`);
  }
  const result = await database.push(path, { email, name });
  logger.info(`[ ${email} ] registered as [ ${role} ]!`);
  return result;
}

async function deleteRole(context, role) {
  const { id } = context;
  const path = `/${role}/${id}`;

  await database.delete(path);
}

async function getRoles(role) {
  const path = `/${role}`;

  return database.getArrayFrom(path);
}

module.exports = {
  roleMiddleware,
  createRole,
  deleteRole,
  getRoles,
};
