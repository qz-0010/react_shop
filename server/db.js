const mongoose = require('mongoose');
const config = require('./config');
mongoose.Promise = Promise;

module.exports = async () => {
    if (process.env.MONGOOSE_DEBUG) {
      mongoose.set('debug', true);
    }

    mongoose.connect(config.db, {
      useNewUrlParser: true
    }).then(
      (data) => console.log(`db connected`),
      (err) => console.error(err)
    );

};
