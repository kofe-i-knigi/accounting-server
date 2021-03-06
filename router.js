'use strict';

const Router = require('koa-router');
const jwt = require('koa-jwt');

const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];

const roles = require('./middleware/roles');
const auth = require('./api/auth');
const users = require('./api/users');
const stores = require('./api/stores');
const stocks = require('./api/stocks');
const audits = require('./api/audits');
const deliveries = require('./api/deliveries');
const products = require('./api/products');
const menuItems = require('./api/menu-items');
const categories = require('./api/categories');
const settings = require('./api/settings');
const shift = require('./api/shift');
const menu = require('./api/menu');

const everyone = new Router()
  .post('/auth/login', auth.login)
  .post('/auth/register', auth.register)

  .get('/stores', stores.list)
  .get('/stores/:id', stores.show);

const baristaProtected = new Router()
  .use(jwt({secret: config.jwtSecret}))
  .use(roles(['barista', 'admin']))

  .get('/settings', settings.get)
  .get('/products', products.list)
  .get('/menu', menu.getCategories)
  .get('/menu/:categoryId', menu.getItems)
  .post('/shift', shift.close);

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
  .get('/stocks/:storeId', stocks.list)
  .get('/stocks/:storeId/shortage', stocks.shortage)
  .put('/stocks/:storeId/audit', stocks.audit)
  .put('/stocks/:storeId/products/:productId', stocks.updateProduct)
  .post('/stocks/:storeId/deliveries', deliveries.create)
  .post('/stocks/:storeId/writeoffs', deliveries.writeOff)

  .get('/audits', audits.list)
  .get('/audits/:id', audits.show)

  .get('/deliveries', deliveries.list)
  .get('/deliveries/:id', deliveries.show)

  .post('/products', products.create)
  .put('/products/:id', products.update)
  .delete('/products/:id', products.remove)

  .get('/menuitems', menuItems.list)
  .post('/menuitems', menuItems.create)
  .put('/menuitems/:id', menuItems.update)
  .delete('/menuitems/:id', menuItems.remove)
  .post('/menuitems/:id/products', menuItems.addIngridient)
  .delete('/menuitems/:id/products/:productId', menuItems.removeIngridient)
  .put('/menuitems/:id/products/:productId', menuItems.updateIngridient)

  .get('/categories', categories.list)
  .post('/categories', categories.create)
  .delete('/categories/:id', categories.remove)
  .put('/categories/:id', categories.update)
  .put('/categories/:id/discount', categories.toggleDiscount)

  .get('/shifts', shift.list)
  .get('/shifts/:id', shift.show);

module.exports = new Router({prefix: '/api'})
  .use(everyone.routes())
  .use(baristaProtected.routes())
  .use(adminProtected.routes());
