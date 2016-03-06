'use strict';

const Router = require('koa-router');
const jwt = require('koa-jwt');

const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];

const role = require('./middleware/role');
const auth = require('./api/auth');
const users = require('./api/users');
const stores = require('./api/stores');

const everyone = new Router()
  .post('/auth/login', auth.login)
  .post('/auth/register', auth.register)

  .get('/stores', stores.list)
  .get('/stores/:id', stores.show);

const adminProtected = new Router()
  .use(jwt({secret: config.jwtSecret}))
  .use(role('admin'))

  .get('/admin/auth/regtoken', auth.regToken)

  .get('/admin/users', users.list)
  .get('/admin/users/:id', users.show)
  .put('/admin/users/:id', users.update)

  .post('/stores', stores.create)
  .put('/stores/:id', stores.update)
  .delete('/stores/:id', stores.remove);

module.exports = new Router()
  .use(everyone.routes())
  .use(adminProtected.routes());
