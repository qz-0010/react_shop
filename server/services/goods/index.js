const Model = require('./GoodModel');
const { getAll, saveGood } = require('./lib');
const { requireAdmin } = require('../passport/middlewares');
const uuid = require('uuid');

module.exports = (app) => {
  app.post('/admin/*', requireAdmin);
  
  app.post('/admin/good', saveGood);

  app.get('/catalog', async (req, res, next) => {
    const goods = await getAll(next);
    res.json(goods);
  });


  app.post('/basket', (req, res, next) => {
    // client
    // let { order } = req.cookies;

    // if(order) {
    //     try{
    //         order = JSON.parse(order)
    //     } catch(e) {
    //         next(e);
    //     }
    // } else {
    //     order = {orderid: uuid(), items: []}
    // }

    // const { id, count } = req.body;

    // if(order.items.indexOf(id) !== -1) return res.json(order);

    // let newOrder = JSON.stringify({...order, items: [...order.items, req.body]});

    // res.cookie('order', newOrder, { path: '/' });
    // res.json(newOrder);
  });

  app.post('/cart/', requireAdmin, async (req, res, next) => {
    const goods = await saveGood(req.body, next);
    res.end('ok');
  });
};
