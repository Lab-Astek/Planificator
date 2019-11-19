import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import createError from 'http-errors';
import * as httpStatus from 'http-status-codes';
import passport from 'passport';

import logger from './appLogger';
import routes from './routes';

/*  Express server instantiation  */
const app = express();
const defaultPort = 8080;
const port = process.env.PORT || defaultPort;

/*  Middlewares */
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('trust proxy', true);

/*  Express sessions  */
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  httpOnly: true,
}));

/*  Passport setup  */
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});
app.use(passport.initialize());
app.use(passport.session());

/*  CORS headers  */
app.use((req, res, next) => {
  res.set({
    'Access-Control-Allow-Origin': req.headers.origin || '',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS, PUT, PATCH',
    'Access-Control-Allow-Headers': 'Content-Type, Set-Cookie, *'
  });
  next();
});

/*  Preflight-requests handler  */
app.options('*');

/*  Router  */
app.use('/', routes);

/*  404 middleware  */
app.use((req, res, next) => {
  next(createError(httpStatus.NOT_FOUND, `${req.url} not found`));
});

/*  Error middleware  */
app.use((err, req, res, _) => {
  console.log(err);
  logger.error(err.message);
  res.status(err.status || httpStatus.INTERNAL_SERVER_ERROR).send({ error: err.message });
});

/*  Server start  */
app.listen(port);
logger.info(`App listening on ${port}`);

module.exports = app;
