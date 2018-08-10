const mongoose = require('mongoose');
const GoodModel = require('../GoodModel');
const connectionState = mongoose.connection.readyState;
//  0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting

const getAll = (next) => {
  return GoodModel.find((err) => {
    if(err) return next(err);
    
    next({x: 'x'});
    // cb(docs);
  })
};

const saveGood = (data, next) => {
  if(connectionState !== 1) return next({connectionState});

  return GoodModel.create(data, (err, good) => {
    console.log('saveGood', err);

    if(err) {
      return next(err);
    }
  });
};

module.exports = {
  getAll,
  saveGood
};
