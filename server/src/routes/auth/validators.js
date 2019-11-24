import validate from 'validate.js';
import createError from 'http-errors';
import * as httpStatus from 'http-status-codes';

import logger from 'appLogger';

function validateAdmin(req) {
  const constraints = {
    email: {
      email: true,
      presence: true,
      type: 'string',
    },
    password: {
      presence: true,
      type: 'string',
    },
  };

  const errors = validate(req.body, constraints);
  if (errors) {
    const msg = logger.validatorsLog(errors);
    throw createError(httpStatus.BAD_REQUEST, msg);
  }

  return req.body;
}

function validateLogin(req) {
  const constraints = {
    accessToken: {
      presence: true,
      type: 'string',
    },
  };

  const errors = validate(req.user, constraints);
  if (errors) {
    const msg = logger.validatorsLog(errors);
    throw createError(httpStatus.BAD_REQUEST, msg);
  }

  return req.user;
}

module.exports = {
  validateAdmin,
  validateLogin,
};
