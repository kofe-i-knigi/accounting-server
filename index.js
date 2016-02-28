var koa = require('koa');
var logger = require('koa-logger');
var compress = require('koa-compress');
var conditional = require('koa-conditional-get');
var etag = require('koa-etag');
var bodyParser = require('koa-bodyparser');
var favicon = require('koa-favicon');

var config = require('./config');
var router = require('./router');
var models = require('./models');

var env = process.env.NODE_ENV || 'development'

var app = koa();

app.use(conditional());
app.use(etag());
app.use(compress());
app.use(bodyParser());
app.use(favicon());

if (env == 'development') {
  app.use(logger());
}

app.use(router.routes());
app.use(router.allowedMethods());

module.exports = app;
