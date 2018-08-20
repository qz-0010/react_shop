const GoodModel = require('../GoodModel');
const wrapAsyncFn = require('../../wrapAsyncFn');
// const compareErrors = require('../../compareErrors');
//  0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting

const getAll = wrapAsyncFn(async (req, res, next) => {
  const goods = await GoodModel.find();

  res.send(goods);
  return goods;
});

const saveGood = wrapAsyncFn(async (req, res, next) => {
  // if (mongoose.connection.readyState !== 1) return next({ connectionState });
  const { title, price, image } = req.body;

  const good = await GoodModel.create({ title, price, image });
  res.end('ok');
  return good;
});

module.exports = {
  getAll,
  saveGood
};
