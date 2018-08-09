const Model = require('./GoodModel');
const { getAll } = require('./lib');

module.exports = (app) => {
  app.get('/goods', async (req, res, next) => {
    // for (let i = 0; i < 10; i++) {
    //   let item = {
    //     title: 'good title ' + Math.round(Math.random() * 10),
    //     image: 'http://placekitten.com/300/20' + Math.round(Math.random() * 10),
    //     price: 1000 * Math.round(Math.random() * 10)
    //   };
    //
    //   let model = new Model(item);
    //
    //   model.save();
    // }
    const goods = await getAll(next);
    res.send(goods);
  });
};
