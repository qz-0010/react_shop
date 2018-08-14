module.exports = function (err, next) {
  const keys = Object.keys(err.errors);
  const result = [];

  if (err.name !== 'ValidationError') {
    if(next) {
      next(err);
    } else {
      console.warn('next function not exist', module.parent.filename);
    }
    return {'error': 'engine'};
  }

  keys.map((key) => {
    const error = {};
    error[key] = err.errors[key].message;
    result.push(error);
  });
  return result;
};
