'use strict';

const jwt = require('koa-jwt');

const env = process.env.NODE_ENV || 'development';
const config = require('../../config')[env];

const {User} = require('../../models');


/**
 * @api {post} /admin/auth/login Authenticate admin
 *
 * @apiParam {String} name
 * @apiParam {String} password
 *
 * @apiSuccess {String} token jwt
 *
 * @apiUse NotAuthorizedError
 */
exports.login = function*() {
  let {name, password} = this.request.body;

  if (!(name && password)) {
    this.throw(401);
  }

  let user = yield User.find({
    name: name
  });

  let authenticated = yield user.authenticate(password);

  if (!(user && authenticated)) {
    this.throw(401);
  }

  let token = jwt.sign(user.toJSON(), config.jwtSecret);

  this.body = {
    token: token
  };
};
