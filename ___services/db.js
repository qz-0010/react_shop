const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const config = require('./config');

module.exports = (app) => {
  mongoose.Promise = Promise;

  if (process.env.MONGOOSE_DEBUG) {
    mongoose.set('debug', true);
  }

  mongoose.connect(process.env.MONGO_URI, {
    // useMongoClient: true,
    autoIndex: false, // Don't build indexes
    reconnectTries: 100, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0
  })
    .then(
      () => {
        console.log('connect db');
      },
      (err) => {
        console.error('connect db failed');
      }
    );

  app.use(session({
    secret: config.secret,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: {
      expires: null,
      maxAge: false
    }
  }));
};
