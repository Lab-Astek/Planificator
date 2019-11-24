import express from 'express';
import * as httpStatus from 'http-status-codes';

import * as controllers from './controllers';
import * as validators from './validators';
import Roles from './roles';

const adminMiddleware = controllers.roleMiddleware(Roles.ADMIN);
const router = express.Router();

router.post('/admin', adminMiddleware, async (req, res, next) => {
  try {
    const context = await validators.validateAdminCreation(req);
    const result = await controllers.createAdmin(context);
    res.status(httpStatus.OK).send(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
