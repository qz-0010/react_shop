const GoodModel = require('../GoodModel');

const getAll = (next) => {
  return GoodModel.find((err) => {
    if(err) return next(err);
    next({x: 'x'});
    // cb(docs);
  })
};

module.exports.getAll = getAll;
