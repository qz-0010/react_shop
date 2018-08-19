// let passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./UserModel');


module.exports = (passport) => {
  passport.use(new LocalStrategy(
    {
      usernameField: 'email', // 'username' by default
      passwordField: 'password',
      passReqToCallback: true // all strategies support ctx: req for more complex cases
    },
    // Три возможных итога функции
    // done(null, user[, info]) ->
    //   strategy.success(user, info)
    // done(null, false[, info]) ->
    //   strategy.fail(info)
    // done(err) ->
    //   strategy.error(err)
    ((req, email, password, done) => {
      User.findOne({ email }, (err, user) => {
        if (err) return done(err);

        if (!user) return done(null, false, 'wrong');

        user.checkPassword(password, (err, isMatch) => {
          if (err) return done(err);

          if (!isMatch) {
            return done(null, false, 'wrong');
          }
          return done(null, user);
        });
      });
    })
  ));
};
// Стратегия берёт поля из req.body
// Вызывает для них функцию
