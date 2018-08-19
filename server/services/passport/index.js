const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const config = require('../../config');
const User = require('./UserModel');
const compareErrors = require('../compareErrors');
const { registerUser, authenticate } = require('./lib');

module.exports = (app) => {
  app.use(session({
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    secret: config.secret,
    name: config.cookie.sessionName,
    // cookie: {
    // },
    resave: false,
    saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  require('./localStrategy')(passport);

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, done);
  });

  app.post('/login', authenticate);

  app.post('/register', async (req, res, next) => {
    registerUser(req.body, next).then(
      (user) => {
        res.end('ok');
      },
      (err) => {
        res.json(err);
      }
    );
  });

  app.get('/logout', async (req, res, next) => {
    if (!req.user) return res.end('unauthorized');

    try {
      await req.session.destroy();
    } catch (err) {
      return next(err);
    }
    req.logout();
    res.status(200).clearCookie(config.cookie.sessionName, { path: '/' });
    res.end('ok');
  });
};
