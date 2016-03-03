'use strict';

const crypto = require('mz/crypto');
const jwt = require('koa-jwt');

const env = process.env.NODE_ENV || 'development';
const {jwtSecret, registrationToken} = require('../../config')[env];

const {User} = require('../../models');

/**
 * @api {post} /admin/login Логин админа
 * @apiName AdminLogin
 * @apiGroup AdminAuth
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
    this.throw(401);
  }

  let user = yield User.find({
    login: login
  });

  let authenticated = yield user.authenticate(password);

  if (!(user && authenticated)) {
    this.throw(401);
  }

  let token = jwt.sign(user.toJSON(), jwtSecret);

  this.body = {
    token: token
  };
};

/**
 * @api {get} /admin/auth/regtoken Токен регистрации
 * @apiName RegistrationToken
 * @apiGroup AdminAuth
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
  let currentDay = Math.floor(Date.now() / (1000 * 60 * 60 * 24)).toString();
  let buffer = yield crypto.pbkdf2(registrationToken, currentDay, 100, 8);

  this.body = {
    token: buffer.toString('hex')
  };
};
