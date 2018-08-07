var { PORT, MONGO_URI, NODE_ENV } = process.env;
var isDev = NODE_ENV == 'development';

module.exports = {
    port: PORT || 5000,
    secret:   'mysecret',
    db: MONGO_URI || 'mongodb://qz-0010:skatepark1@ds115022.mlab.com:15022/react_shop',
    crypto: {
        hash: {
          length: 128,
          // may be slow(!): iterations = 12000 take ~60ms to generate strong password
          iterations: isDev ? 1 : 12000
        }
    }
};
