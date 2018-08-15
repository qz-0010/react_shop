const compareErrors = require('../../compareErrors');
const User = require('../UserModel');
const passport = require('passport');

module.exports = {
  registerUser: (data, next) => {
    const { email, password } = data;

    return new Promise(async function(resolve, rejected) {
      const existUser = await User.findOne({ email });
      const user = new User({
        email,
        password
      });
      let _errors = {};

      if (existUser) {
        _errors.email = { message: 'exist'};

        try {
          await user.validate();
          rejected(compareErrors({
            name: 'ValidationError',
            errors: {
              email: _errors.email
            }
          }), next);
        } catch (err) {
          rejected(compareErrors({name: err.name, errors: {..._errors, ...err.errors}}, next));
        }
      }


      try {
        await user.save();
        resolve(user);
      } catch (err) {
        rejected(compareErrors(err, next));
      }
    });
  },
  authenticate: (req, res, next) => {
    if(req.user) return res.end('exist');

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
}