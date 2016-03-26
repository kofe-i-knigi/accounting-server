'use strict';

const Router = require('koa-router');
const jwt = require('koa-jwt');

const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];

const roles = require('./middleware/roles');
const auth = require('./api/auth');
const users = require('./api/users');
const stores = require('./api/stores');
const products = require('./api/products');

const everyone = new Router()
  .post('/auth/login', auth.login)
  .post('/auth/register', auth.register)

  .get('/stores', stores.list)
  .get('/stores/:id', stores.show);

const baristaProtected = new Router()
  .use(jwt({secret: config.jwtSecret}))
  .use(roles(['barista', 'admin']))

  .get('/products', products.list);

const adminProtected = new Router()
  .use(jwt({secret: config.jwtSecret}))
  .use(roles(['admin']))

  .get('/admin/auth/regtoken', auth.regToken)

  .get('/admin/users', users.list)
  .get('/admin/users/:id', users.show)
  .put('/admin/users/:id', users.update)

  .post('/stores', stores.create)
  .put('/stores/:id', stores.update)
  .delete('/stores/:id', stores.remove)

  .post('/products', products.create)
  .put('/products/:id', products.update)
  .delete('/products/:id', products.remove);

module.exports = new Router({prefix: '/api'})
  .use(everyone.routes())
  .use(baristaProtected.routes())
  .use(adminProtected.routes());
