const co = require('co');
const {Delivery} = require('../../models');

module.exports = {
  up: co.wrap(function*(migration, Sequelize) {
    yield migration.createTable(Delivery.tableName, Delivery.attributes);
  }),

  down: co.wrap(function*(migration, Sequelize) {
    yield migration.dropTable(Delivery.tableName);
  })
};
