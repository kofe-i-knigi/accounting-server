'use strict';

const {Store} = require('../models');

/**
 * @apiDefine StoreResource
 *
 * @apiSuccess {Object} store
 * @apiSuccess {Number} store.id
 * @apiSuccess {String} store.name
 * @apiSuccess {String} store.location широта,долгота
 *
 * @apiSuccessExample {json} user object:
 * {
 *   "id": 1,
 *   "name": "Родник",
 *   "location": "55.1706042,61.358359"
 * }
 */

/**
 * @api {get} /admin/stores Список точек-складов-касс
 * @apiName StoresList
 * @apiGroup Stores
 * @apiDescription Используется много где.
 * Для начала он нам нужен, чтобы логиниться в клиент
 *
 * @apiSuccess {Object[]} stores
 * @apiSuccess {Number} stores.id
 * @apiSuccess {String} stores.name
 * @apiSuccess {String} stores.location широта,долгота
 *
 * @apiSuccessExample {json} user list:
 * [{
 *   "id": 1,
 *   "name": "Родник",
 *   "location": "55.1706042,61.358359"
 * }, {
 *   "id": 2,
 *   "name": "МФЦ",
 *   "location": "55.1706042,61.358359"
 * }]
 *
 * @apiUse BadRequestError
 */
exports.list = function*() {
  this.body = yield Store.findAll();
};

/**
 * @api {get} /stores/:id Отдельная точка
 * @apiName StoresShow
 * @apiGroup Stores
 *
 * @apiParam {Number} id
 *
 * @apiUse StoreResource
 *
 * @apiUse BadRequestError
 */
exports.show = function*() {
  if(!this.params.id) {
    throw('id is required', 400);
  }

  this.body = yield Store.findOne({
    where: { id: this.params.id }
  });
};

/**
 * @api {put} /stores/:id Обновление точки
 * @apiName StoresUpdate
 * @apiGroup Stores
 * @apiDescription Доступно только админу
 *
 * @apiParam {Number} id
 * @apiParam {Object} store объект, содержащий обновляемые поля
 * @apiParam {String} user.name поле, например, `name`
 *
 * @apiUse StoreResource
 *
 * @apiUse BadRequestError
 */
exports.update = function*() {
  if(!this.params.id) {
    this.throw('id is required', 400);
  }

  let result = yield Store.update(this.request.body, {
    where: { id: this.params.id },
    returning: true
  });

  if(!result[0]) {
    this.throw(404);
  }

  this.body = result[1][0];
};

/**
 * @api {post} /stores Создание точки
 * @apiName StoresCreate
 * @apiGroup Stores
 * @apiDescription Доступно только админу
 *
 * @apiParam {Object} store
 * @apiParam {String} store.name
 * @apiParam {String} store.location
 *
 * @apiUse StoreResource
 *
 * @apiUse BadRequestError
 */
exports.create = function*() {
  this.body = yield Store.create(this.request.body);
}

/**
 * @api {delete} /stores/:id Удаление точки
 * @apiName StoresDelete
 * @apiGroup Stores
 * @apiDescription Доступно только админу
 *
 * @apiParam {Number} id
 *
 * @apiUse BadRequestError
 */
exports.remove = function*() {
  let result = yield Store.destroy({
    where: { id: this.params.id }
  });

  if (!result) {
    this.throw(404);
  }

  this.body = { success: true };
}
