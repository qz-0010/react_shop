const passport = require('passport');
const compareErrors = require('../../compareErrors');
const User = require('../UserModel');

module.exports = {
  registerUser: (data, next) => {
    const { email, password } = data;

    return new Promise((async (resolve, rejected) => {
      const existUser = await User.findOne({ email });
      const user = new User({
        email,
        password
      });
      const _errors = {};

      if (existUser) {
        _errors.email = { message: 'exist' };

        try {
          await user.validate();
          rejected(compareErrors({
            name: 'ValidationError',
            errors: {
              email: _errors.email
            }
          }), next);
        } catch (err) {
          rejected(compareErrors({ name: err.name, errors: { ..._errors, ...err.errors } }, next));
        }
      }


      try {
        await user.save();
        resolve(user);
      } catch (err) {
        rejected(compareErrors(err, next));
      }
    }));
  },
  authenticate: (req, res, next) => {
    if (req.user) return res.json({ email: req.user.email });

    return passport.authenticate('local', async (err, user, info) => {
      if (err) return next(err);

      if (!user) return res.end('no');

      return req.login(user, (err) => {
        if (err) return next(err);

        res.json({ email: user.email });
      });
    })(req, res, next);
  }
};
