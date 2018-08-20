const Model = require('./GoodModel');
const { getAll, saveGood } = require('./lib');
const { requireAdmin } = require('../passport/middlewares');
const uuid = require('uuid');

module.exports = (app) => {
  app.all('/admin/*', requireAdmin);

  app.post('/admin/good', saveGood);

  app.get('/catalog', getAll);

  app.post('/basket', (req, res, next) => {
  });
};
