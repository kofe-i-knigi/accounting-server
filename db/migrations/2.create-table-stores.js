const co = require('co');
const {Store} = require('../../models');

module.exports = {
  up: co.wrap(function*(migration, Sequelize) {
    yield migration.createTable(Store.tableName, Store.attributes);
  }),

  down: co.wrap(function*(migration, Sequelize) {
    yield migration.dropTable(Store.tableName);
  })
};
