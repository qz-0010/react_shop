const config = require('../../../config');
const passport = require('passport');
const wrapAsyncFn = require('../../wrapAsyncFn');
const compareErrors = require('../../compareErrors');
const ServiceError = require('../../ServiceError');
const UserModel = require('../UserModel');

const registerUser = wrapAsyncFn(async (req, res, next) => {
  const { email, password } = req.body;
  const existUser = await UserModel.findOne({ email });

  if (existUser) return res.status(401).send('exist')

  const user = await UserModel.create({
    email,
    password
  });

  res.send({user: { email: user.email }});
  return user;
});

const authenticate = wrapAsyncFn(async (req, res, next) => {
  if (req.user) return res.send({user: { email: req.user.email, admin: req.user.admin }});

  return passport.authenticate('local', (err, user, info) => {
    if (err) throw err;

    if (!user) return res.status(401).send({user: false});

    return req.login(user, (err) => {
      if (err) throw err;

      res.send({user: { email: user.email, admin: user.admin }});
    });
  })(req, res, next);
});

const logout = wrapAsyncFn(async (req, res, next) => {
  if (!req.user) return res.status(401).send('unauthorized');

  await req.session.destroy();
  req.logout();
  res.clearCookie(config.cookie.sessionName, { path: '/' });
  res.send('ok');
});

module.exports = {
  registerUser,
  authenticate,
  logout
};
