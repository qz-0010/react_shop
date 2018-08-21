const config = require('../../config');
const Model = require('./GoodModel');
const { getAll, saveGood, uploadImage } = require('./lib');
const { requireAdmin } = require('../passport/middlewares');
const uuid = require('uuid');
const ServiceError = require('../ServiceError');

module.exports = (app) => {
  app.all('/admin/*', requireAdmin);

  app.post('/admin/good', uploadImage(), saveGood);

  app.get('/catalog', getAll);

  app.post('/basket', (req, res, next) => {
  });
};
