require('dotenv').config();

const path = require('path');
const config = require('./config');
const express = require('express');
const server = require('./server');
const db = require('./db');
const xssFilter = require('x-xss-protection');
// const frameguard = require('frameguard');
const nosniff = require('dont-sniff-mimetype');
const ienoopen = require('ienoopen');
const csp = require('helmet-csp');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const errorsMW = require('./middlewares/errors');
const passportService = require('./services/passport');
const goodsService = require('./services/goods');

const app = express();

// csp задает заголовок Content-Security-Policy для предотвращения атак межсайтового скриптинга и прочих межсайтовых вмешательств.
// hidePoweredBy удаляет заголовок X-Powered-By.
// hpkp добавляет заголовки Public Key Pinning для предотвращения атак посредника (атак “человек посередине”) с поддельными сертификатами.
// hsts задает заголовок Strict-Transport-Security, принудительно активирующий защиту соединений с сервером (по протоколу HTTP с использованием SSL/TLS).
// ieNoOpen задает заголовок X-Download-Options для IE8+.
// noCache задает заголовок Cache-Control и заголовки Pragma для отключения кеширования на стороне клиента.
// noSniff задает заголовок X-Content-Type-Options для защиты браузеров от прослушивания (сниффинга) MIME ответов с отличным от объявленного типом содержимого (content-type).
// frameguard задает заголовок X-Frame-Options для защиты от кликджекинга.
// xssFilter задает заголовок X-XSS-Protection для активации фильтра XSS (фильтра межсайтового скриптинга) в большинстве современных веб-браузеров.

server(app);
db();

app.use( express.static(config.publicPath) );

app.disable('x-powered-by');
// Only let me be framed by people of the same origin:
// app.use(frameguard({ action: 'sameorigin' }))
app.use(xssFilter());
app.use(nosniff());
app.use(ienoopen());
app.use(csp({
  // Specify directives as normal.
  directives: {
    defaultSrc: ["'self'", 'default.com'],
    scriptSrc: ["'self'", "'unsafe-inline'"],
    styleSrc: ['style.com'],
    fontSrc: ["'self'", 'fonts.com'],
    imgSrc: ['img.com', 'data:'],
    sandbox: ['allow-forms', 'allow-scripts'],
    reportUri: '/report-violation',
    objectSrc: ["'none'"],
    upgradeInsecureRequests: true,
    workerSrc: false  // This is not set.
  },

  // This module will detect common mistakes in your directives and throw errors
  // if it finds any. To disable this, enable "loose mode".
  loose: false,

  // Set to true if you only want browsers to report errors, not block them.
  // You may also set this to a function(req, res) in order to decide dynamically
  // whether to use reportOnly mode, e.g., to allow for a dynamic kill switch.
  reportOnly: false,

  // Set to true if you want to blindly set all headers: Content-Security-Policy,
  // X-WebKit-CSP, and X-Content-Security-Policy.
  setAllHeaders: false,

  // Set to true if you want to disable CSP on Android where it can be buggy.
  disableAndroid: false,

  // Set to false if you want to completely disable any user-agent sniffing.
  // This may make the headers less compatible but it will be much faster.
  // This defaults to `true`.
  browserSniff: true
}));

app.use(bodyParser.urlencoded({
  extended: true,
  verify: function(req, res, buf, encoding) {
    if(encoding === 'multipart/form-data') throw new Error('multipart')
  }
}));

app.use(bodyParser.json());

app.use(cookieParser());



passportService(app);
goodsService(app);
// == UPLOAD SERVICE ==
// uploadService( app, path.join(publicPath, 'files') );
// == UPLOAD SERVICE ==


errorsMW(app);
