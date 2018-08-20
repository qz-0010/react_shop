const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const config = require('../../config');
const User = require('./UserModel');
const compareErrors = require('../compareErrors');
const { registerUser, authenticate, logout } = require('./lib');

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

  app.post('/register', registerUser);

  app.get('/logout', logout);
};
