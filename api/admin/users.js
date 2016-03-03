const {User} = require('../../models');

/**
 * @apiDefine UserResource
 *
 * @apiSuccess {Object} user
 * @apiSuccess {Number} user.id
 * @apiSuccess {String} user.login
 * @apiSuccess {String} user.name
 * @apiSuccess {String} user.role по умолчанию `barista`
 *
 * @apiSuccessExample {json} user object:
 * {
 *   "id": 1,
 *   "login": "vlad",
 *   "name": "Влад",
 *   "role": "barista"
 * }
 */

/**
 * @api {get} /admin/users Список бариста
 * @apiName UsersList
 * @apiGroup Users
 * @apiDescription не выдает админов
 *
 * @apiSuccess {Object[]} users список юзеров
 * @apiSuccess {Number} users.id
 * @apiSuccess {String} users.login
 * @apiSuccess {String} users.name
 * @apiSuccess {String} users.role по умолчанию `barista`
 *
 * @apiSuccessExample {json} user list:
 * [{
 *   "id": 1,
 *   "login": "vlad",
 *   "name": "Влад",
 *   "role": "barista"
 * }, {
 *   "id": 2,
 *   "login": "anton",
 *   "name": "Антон",
 *   "role": "barista"
 * }]
 *
 * @apiUse BadRequestError
 */
exports.list = function*() {
  this.body = yield User.findAll({
    where: { role: 'barista' },
    attributes: ['id', 'login', 'name', 'role']
  });
};

/**
 * @api {get} /admin/users/:id Отдельный пользователь
 * @apiName UsersShow
 * @apiGroup Users
 *
 * @apiParam {Number} id
 *
 * @apiUse UserResource
 *
 * @apiUse BadRequestError
 */
exports.show = function*() {
  this.body = yield User.findOne({
    where: { id: this.params.id },
    attributes: ['id', 'login', 'name', 'role']
  });
};

/**
 * @api {put} /admin/users/:id Обновление пользователя
 * @apiName UsersShow
 * @apiGroup Users
 * @apiDescription Пока, думаю, админу у юзеров
 * нечего обновлять, но метод пускай будет
 *
 * @apiParam {Number} id
 * @apiParam {Object} user объект, содержащий обновляемые поля
 * @apiParam {String} user.name поле, например, `name`
 *
 * @apiUse UserResource
 *
 * @apiUse BadRequestError
 */
exports.update = function*() {

};
