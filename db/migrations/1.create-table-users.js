const _ = require('lodash');
const co = require('co');
const {User} = require('../../models');

module.exports = {
  up: co.wrap(function*(migration, Sequelize) {
    attributes = _.omit(User.attributes, ['password', 'passwordConfirm']);

    migration.createTable(User.tableName, attributes);
  }),

  down: co.wrap(function*(migration, Sequelize) {
    migration.dropTable(User.tableName);
  })
};
