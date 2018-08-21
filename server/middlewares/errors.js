const compareErrors = require('../services/compareErrors');

module.exports = function (app) {
  function logErrors(err, req, res, next) {
    if(err.code === 'LIMIT_FILE_SIZE' && err.field) {
      let errors = {};
      errors[err.field] = {message: 'filesize'};
      return res.send(compareErrors({errors}));
    }

    switch(err.name) {
      case 'UploadMimeType':
      case 'UploadService':
        res.send(compareErrors(err));
        return;
      default:
        res.send({ error: 'engine' });
        console.log('LOG ERRORS------');
        console.error(err);
    }
    return;
    // console.error(err.stack);
    // res.status(500).send('Bad request');
    // next(req, res);
  }

  app.use(logErrors);
};
