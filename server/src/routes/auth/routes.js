import express from 'express';
import passport from 'passport';
import googlePassport from 'passport-google-oauth';
import * as httpStatus from 'http-status-codes';

import { googleOAuth } from 'config/appConfig.json';
import logger from 'appLogger';

import * as controllers from './controllers';
import * as validators from './validators';

const router = express.Router();

passport.use(new googlePassport.OAuth2Strategy({
  clientID: googleOAuth.clientId,
  clientSecret: googleOAuth.clientSecret,
  callbackURL: `${process.env.URL}:${process.env.PORT}${googleOAuth.callbackRoute}`,
}, (accessToken, refreshToken, profile, done) => {
  logger.info(`User [ ${profile.emails[0].value} ] google access token : ${accessToken}`);

  done(null, {
    accessToken,
    refreshToken,
  });
}));

router.get('/login', passport.authenticate('google', {
  session: false,
  accessType: 'offline',
  prompt: 'consent',
  scope: ['profile', 'email'],
}));

router.get('/login/callback', passport.authenticate('google', {
  session: false,
  failureRedirect: '/login',
}), async (req, res, next) => {
  try {
    const context = await validators.validateLogin(req);
    const result = await controllers.login(req, context);
    res.status(httpStatus.OK).send(result);
  } catch (err) {
    next(err);
  }
});

router.post('/admin', async (req, res, next) => {
  try {
    const context = await validators.validateAdmin(req);
    const result = await controllers.logAsAdmin(req, context);
    res.status(httpStatus.OK).send(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
