const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('./../../config');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: [
      {
        validator: function checkEmail(value) {
          return /^.+@.+/.test(value);
        },
        msg: 'novalid'
      }
    ]
  },
  password: {
    type: String,
    required: true,
    minlength: [4, 'minlength']
  }
}, {
  timestamps: true
});

userSchema.pre('save', function (next) {
  const user = this;

  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(config.bcrypt.hash.iterations, (err, salt) => {
    if (err) return next(err);

    // hash the password along with our new salt
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.checkPassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', userSchema);
