const compareErrors = require('../../compareErrors');
const User = require('../UserModel');

module.exports.registerUser = (data, next) => {
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
}