import express from 'express';
import * as httpStatus from 'http-status-codes';

import * as controllers from './controllers';
import * as validators from './validators';
import Roles from './roles';

const adminMiddleware = controllers.roleMiddleware([Roles.ADMIN]);
const astekMiddleware = controllers.roleMiddleware([Roles.ASTEK, Roles.ADMIN]);
const router = express.Router();

router.post('/admin', adminMiddleware, async (req, res, next) => {
  try {
    const context = await validators.validateRoleCreation(req);
    const result = await controllers.createRole(context, Roles.ADMIN);
    res.status(httpStatus.OK).send(result);
  } catch (err) {
    next(err);
  }
});

router.patch('/admin', adminMiddleware, async (req, res, next) => {
  try {
    const context = await validators.validateRoleModification(req);
    const result = await controllers.updateRole(context, Roles.ADMIN);
    res.status(httpStatus.OK).send(result);
  } catch (err) {
    next(err);
  }
});

router.delete('/admin', adminMiddleware, async (req, res, next) => {
  try {
    const context = await validators.validateRoleDeletion(req);
    const result = await controllers.deleteRole(context, Roles.ADMIN);
    res.status(httpStatus.OK).send(result);
  } catch (err) {
    next(err);
  }
});

router.get('/admin', astekMiddleware, async (req, res, next) => {
  try {
    const result = await controllers.getRoles(Roles.ADMIN);
    res.status(httpStatus.OK).send(result);
  } catch (err) {
    next(err);
  }
});

router.post('/astek', adminMiddleware, async (req, res, next) => {
  try {
    const context = await validators.validateRoleCreation(req);
    const result = await controllers.createRole(context, Roles.ASTEK);
    res.status(httpStatus.OK).send(result);
  } catch (err) {
    next(err);
  }
});

router.patch('/astek', adminMiddleware, async (req, res, next) => {
  try {
    const context = await validators.validateRoleModification(req);
    const result = await controllers.updateRole(context, Roles.ASTEK);
    res.status(httpStatus.OK).send(result);
  } catch (err) {
    next(err);
  }
});

router.delete('/astek', adminMiddleware, async (req, res, next) => {
  try {
    const context = await validators.validateRoleDeletion(req);
    const result = await controllers.deleteRole(context, Roles.ASTEK);
    res.status(httpStatus.OK).send(result);
  } catch (err) {
    next(err);
  }
});

router.get('/astek', astekMiddleware, async (req, res, next) => {
  try {
    const result = await controllers.getRoles(Roles.ASTEK);
    res.status(httpStatus.OK).send(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
