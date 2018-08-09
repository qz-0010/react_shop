const compareErrors = require('../compareErrors');

module.exports = (app) => {
  app.use((req, res, next) => {
    console.log('goods service');
    next();
  });

  function setOrder(res, order, newId) {
    return res.cookie('order', JSON.stringify([...order, newId]), { httpOnly: true, path: '/' });
  }

  app.post('/bucket', (req, res, next) => {
    let { order } = req.cookies;
    order = order ? JSON.parse(order) : [];
    const { id } = req.body;

    // if(!id) return res.send(compareErrors({errors: { good: { message: 'no_id'} } } ))

    if (order.indexOf(id) !== -1) return;

    setOrder(res, order, id);
    res.end('ok');
  });
};
