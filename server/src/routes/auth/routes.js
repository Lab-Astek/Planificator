import express from 'express';
import passport from 'passport';
import googlePassport from 'passport-google-oauth';
import * as httpStatus from 'http-status-codes';

import { googleOAuth } from 'config/appConfig.json';
import logger from 'appLogger';

import * as controllers from './controllers';

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
    await controllers.login(req, req.user);
    res.status(httpStatus.OK).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
