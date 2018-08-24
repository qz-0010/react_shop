const { PORT, MONGO_URI, NODE_ENV } = process.env;
const path = require('path');

module.exports = {
  port: PORT || 5000,
  secret: 'mysecret',
  db: MONGO_URI || 'mongodb://qz-0010:skatepark1@ds115022.mlab.com:15022/react_shop',
  bcrypt: {
    hash: {
      iterations: NODE_ENV === 'development' ? 1 : 100
    }
  },
  cookie: {
    sessionName: 'zombarik'
  },
  relPathToImages: '/img/goods',
  publicPath: path.join(__dirname, '../../public'),
  pathToImages: path.join(__dirname, '../../public/img/goods')
};
