const compareErrors = require('../services/compareErrors');

module.exports = function (app) {
  function logErrors(err, req, res, next) {
    let errors = {};

    switch(err.code) {
      case 'LIMIT_FILE_SIZE':
      case 'MIMETYPE':
        errors[err.field] = {message: 'filesize'};
        res.status(413).send(compareErrors({errors}));
        break;
      default:
        res.status(500).send({ error: 'engine' });
        console.error(err);
    }
    return;
  }

  app.use(logErrors);
};
