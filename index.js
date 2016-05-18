'use strict';

const koa = require('koa');
const logger = require('koa-logger');
const compress = require('koa-compress');
const conditional = require('koa-conditional-get');
const etag = require('koa-etag');
const bodyParser = require('koa-bodyparser');
const favicon = require('koa-favicon');
const cors = require('koa-cors');

const router = require('./router');
const errorHandler = require('./middleware/error-handler');

const env = process.env.NODE_ENV || 'development'

const app = koa();

app.use(conditional());
app.use(etag());
app.use(compress());
app.use(bodyParser());
app.use(favicon());
app.use(cors({
  expose: ['Content-Range']
}));

if (env == 'development') {
  app.use(logger());
}


app.use(errorHandler);
app.use(router.routes());
app.use(router.allowedMethods());

module.exports = app;
