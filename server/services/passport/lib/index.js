const config = require('../../../config');
const passport = require('passport');
const wrapAsyncFn = require('../../wrapAsyncFn');
const compareErrors = require('../../compareErrors');
const ServiceError = require('../../ServiceError');
const UserModel = require('../UserModel');

const registerUser = wrapAsyncFn(async (req, res, next) => {
  const { email, password } = req.body;
  const existUser = await UserModel.findOne({ email });

  if (existUser) throw new ServiceError('ValidationError', {email: { message: 'exist' } })

  const user = await UserModel.create({
    email,
    password
  });

  res.send({email: user.email});
  return user;
});

const authenticate = wrapAsyncFn(async (req, res, next) => {
  if (req.user) return res.send({ email: req.user.email });

  return passport.authenticate('local', (err, user, info) => {
    if (err) throw err;

    if (!user) return res.send('no');

    return req.login(user, (err) => {
      if (err) throw err;

      res.send({ email: user.email });
    });
  })(req, res, next);
});

const logout = wrapAsyncFn(async (req, res, next) => {
  if (!req.user) return res.send('unauthorized');

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
