const co = require('co');
const {Audit} = require('../../models');

module.exports = {
  up: co.wrap(function*(migration, Sequelize) {
    yield migration.createTable(Audit.tableName, Audit.attributes);
  }),

  down: co.wrap(function*(migration, Sequelize) {
    yield migration.dropTable(Audit.tableName);
  })
};
