require('dotenv').config();

const path = require('path');
const config = require('./config');
const express = require('express');
const server = require('./server');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const db = require('./db');
const errorsMW = require('./middlewares/errors');
const viewsService = require('./services/views');
const passportService = require('./services/passport');
const goodsService = require('./services/goods');

const app = express();

const publicPath = path.join(__dirname, 'public');

app.use(express.static(publicPath));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

server(app);

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cookieParser());

db(app);

// app.use(session({
//   secret: config.secret,
//   resave: false,
//   saveUninitialized: false
// }));

// == PASSPORT SERVICE ==
passportService(app);
// == PASSPORT SERVICE ==

// console.log(require('./services/goods/lib/findGoods')().then((users) => {console.log('then users', users)}));

// == GOODS SERVICE ==
goodsService(app);
// == GOODS SERVICE ==

// require('./services/goods/addGood');

viewsService(app);

errorsMW(app);
