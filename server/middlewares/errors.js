const compareErrors = require('../services/compareErrors');

module.exports = function (app) {
  function logErrors(err, req, res, next) {
    if (err.name === 'ValidationError') {
      res.send(compareErrors(err));
      return;
    }

    res.send({ error: 'engine' });
    console.log('LOG ERRORS------');
    console.error(err);
    // console.error(err.stack);
    // res.status(500).send('Bad request');
    next(req, res);
  }

  app.use(logErrors);
};
