module.exports = function(app) {
  
  function logErrors(err, req, res, next) {
    console.log('LOG ERRORS------');
    console.error(err);
    console.error(err.stack);
    res.status(500).send('Bad request');
    next(req, res);
  }

  app.use(logErrors);
};
