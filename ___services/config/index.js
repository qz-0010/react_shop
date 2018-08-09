const { NODE_ENV } = process.env;
const isDev = NODE_ENV === 'development';

module.exports = {
  secret: 'mysecret',
  cdn: 'http://dtf9vso0dcj98.cloudfront.net',
  bcrypt: {
    hash: {
      iterations: isDev ? 1 : 12000
    }
  }
};
