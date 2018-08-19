const mongoose = require('mongoose');
const GoodModel = require('../GoodModel');
const compareErrors = require('../../compareErrors');
//  0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting

const getAll = next => GoodModel.find((err, users) => {
  if (err) return compareErrors(err, next);

  return users;
});

const saveGood = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) return next({ connectionState });

  const { title, price, image } = req.body;

  return GoodModel.create({ title, price, image }, (err, good) => {
    if (err) {
      return res.json(compareErrors(err, next));
    }

    res.end('ok');
  });
};

module.exports = {
  getAll,
  saveGood
};
