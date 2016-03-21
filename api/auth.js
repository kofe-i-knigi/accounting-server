'use strict';
const jwt = require('koa-jwt');

const env = process.env.NODE_ENV || 'development';
const {jwtSecret} = require('../config')[env];

const {User} = require('../models');
const regToken = require('../lib/reg-token');

/**
 * @api {post} /admin/login Авторизация
 * @apiName AuthLogin
 * @apiGroup Auth
 * @apiDescription Админов нельзя регистрировать.
 * Можно только логиниться с данными указанными в сорцах
 * (до смены пароля).
 *
 * @apiParam {String} login
 * @apiParam {String} password
 *
 * @apiSuccess {String} token jwt, use it in Authorization header
 *
 * @apiUse NotAuthorizedError
 */
exports.login = function*() {
  let {login, password} = this.request.body;

  if (!(login && password)) {
    this.throw(400, 'login and password are required');
  }

  let user = yield User.findOne({
    where: { login: login }
  });

  if (!(user && user.authenticate(password))) {
    this.throw(401, 'Неверные логин или пароль');
  }

  if (user.isBlocked) {
    this.throw(401, 'Пользователь заблокирован');
  }

  let token = jwt.sign(user.toJSON(), jwtSecret);

  this.body = {
    token: token
  };
};

exports.register = function*() {
  let currentRegToken = yield regToken();

  if (this.request.body.regToken !== currentRegToken) {
    this.throw(401, 'Invalid registration token');
  }

  let user = User.build(this.request.body);

  try {
    yield user.save();
  } catch(err) {
    this.throw(400, err.message);
  }

  let token = jwt.sign(user.toJSON(), jwtSecret);

  this.body = {
    token: token
  };
};

/**
 * @api {get} /admin/auth/regtoken Токен регистрации
 * @apiName RegistrationToken
 * @apiGroup Auth
 * @apiDescription Отдает токен, который используется
 * при регистрации юзеров. Генерит новый токен каждый день
 *
 * @apiSuccess {String} token Админ будет давать этот токен юзерам для регистрации
 *
 * @apiSuccessExample {json} registration token
 * {
 *   "token": "1234567890abcdef"
 * }
 *
 * @apiUse BadRequestError
 */
exports.regToken = function*() {
  let token = yield regToken();

  this.body = {
    token: token
  };
};
