const User = require('./UserModel');
const passport = require('passport');
const compareErrors = require('../compareErrors');

module.exports = (app) => {
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

        return res.redirect(req.path);
        // res.send('ok');
      });
    })(req, res, next);
  }

  app.post('/login', authenticate);

  app.post('/register', async (req, res, next) => {
    const { email, password } = req.body;
    const existUser = await User.find({ email });

    if (existUser.length !== 0) {
      return res.send(compareErrors({
        errors: {
          email: { message: 'exist' }
        }
      }));
    }

    const user = new User({
      email,
      password
    });

    try {
      await user.save();
      return authenticate(req, res, next);
    } catch (err) {
      if (err.name !== 'ValidationError') {
        return next(err);
      }
      return res.send(compareErrors(err));
    }
  });

  app.get('/logout', async (req, res, next) => {
    try {
      await req.session.destroy();
    } catch (err) {
      return next(err);
    }
    req.logout();
    return res.status(200).clearCookie('connect.sid', { path: '/' }).redirect('/');
  });
};
