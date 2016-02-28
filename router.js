'use strict';

const Router = require('koa-router');
const jwt = require('koa-jwt');

const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];

const role = require('./middleware/role');
const authAdmin = require('./api/admin/auth');
const users = require('./api/admin/users');

const admin = new Router()
  .post('/admin/login', authAdmin.login);

const adminProtected = new Router()
  .use(jwt({secret: config.jwtSecret}))
  .use(role('admin'))
  .get('/admin/users', users.list)
  .post('/admin/users', users.create)
  .get('/admin/users/:id', users.show)
  .put('/admin/users/:id', users.update);

module.exports = new Router()
  .use(admin.routes())
  .use(adminProtected.routes());
