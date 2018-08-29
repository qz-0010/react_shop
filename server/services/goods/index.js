const config = require('../../config');
const { getGoodsByPage, saveGood, uploadImage } = require('./lib');
const { requireAdmin } = require('../passport/middlewares');
const ServiceError = require('../ServiceError');

module.exports = (app) => {
  app.all('/admin/*', requireAdmin);

  app.post('/admin/good', uploadImage(), saveGood);

  app.get('/catalog/:page', getGoodsByPage);

  app.post('/basket', (req, res, next) => {
  });
};
