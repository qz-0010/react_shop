const mongoose = require('mongoose');
const config = require('../../config');
const User = require('./UserModel');
const passport = require('passport');
const compareErrors = require('../compareErrors');
const { registerUser } = require('./lib');

module.exports = (app) => {
  app.use(require('express-session')({
    secret: config.secret,
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

  function authenticate(req, res, next) {
    return passport.authenticate('local', async (err, user, info) => {
      if (err) return next(err);

      if (!user) return res.send(info);

      return req.login(user, (err) => {
        if (err) return next(err);

        // return res.redirect(req.path);
        res.end('ok');
      });
    })(req, res, next);
  }

  app.post('/login', authenticate);

  app.post('/register', async (req, res, next) => {
    registerUser(req.body, next).then(
      (user) => {
        res.end('ok')
      },
      (err) => {
        res.json(err)
      }
    )
  });

  app.get('/logout', async (req, res, next) => {
    try {
      await req.session.destroy();
    } catch (err) {
      return next(err);
    }
    req.logout();
    return res.status(200).clearCookie('connect.sid', { path: '/' });
  });
};
