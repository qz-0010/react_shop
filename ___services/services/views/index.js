const findGoods = require('../goods/lib/findGoods');

module.exports = (app) => {
  app.get('/', async (req, res) => {
    const goods = await findGoods();
    console.log(goods);
    res.render('index', goods);
    console.log('isAuthenticated', req.isAuthenticated(), req.user);
  });

  // app.get('*', (req, res) => {
  //   res.render('index');
  // });
};
