module.exports = (app) => {
  app.get('/goods', (req, res) => {
    console.log('getting goods');
    res.json({
      goods: [
        {
          id: 1
        },
        {
          id: 2
        }
      ]
    });
  });
};
