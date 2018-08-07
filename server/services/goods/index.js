module.exports = (app) => {
  app.get('/goods', (req, res, next) => {
    console.log('getting goods');
    try {
      JSON.parse('{s}')
    } catch(e) {
      next(e)
    }

    // res.json({
    //   goods: [
    //     {
    //       id: 1
    //     },
    //     {
    //       id: 2
    //     }
    //   ]
    // });
  });
};
