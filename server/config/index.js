var { PORT, MONGO_URI, NODE_ENV } = process.env;
var isDev = NODE_ENV == 'development';

console.log('NODE_ENV',NODE_ENV);

module.exports = {
    port: PORT || 5000,
    secret:   'mysecret',
    db: MONGO_URI || 'mongodb://qz-0010:skatepark1@ds115022.mlab.com:15022/react_shop',
    bcrypt: {
      hash: {
        iterations: 1
      }
    }
};
