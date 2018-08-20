module.exports = function compareErrors(err, next) {
  const keys = Object.keys(err.errors);
  const result = [];

  keys.map((key) => {
    const error = {};
    error[key] = err.errors[key].message;
    result.push(error);
  });
  return result;
};
