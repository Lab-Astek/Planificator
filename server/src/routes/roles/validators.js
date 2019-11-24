import validate from 'validate.js';
import createError from 'http-errors';
import * as httpStatus from 'http-status-codes';

import logger from 'appLogger';

function validateRoleCreation(req) {
  const constraints = {
    email: {
      email: true,
      presence: true,
      type: 'string',
    },
    name: {
      presence: {
        allowEmpty: false,
      },
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

function validateRoleDeletion(req) {
  const constraints = {
    id: {
      presence: {
        allowEmpty: false,
      },
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


module.exports = {
  validateRoleCreation,
  validateRoleDeletion,
};
