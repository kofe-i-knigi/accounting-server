const co = require('co');
const {Shift} = require('../../models');

module.exports = {
  up: co.wrap(function*(migration, Sequelize) {
    yield migration.createTable(Shift.tableName, Shift.attributes);
  }),

  down: co.wrap(function*(migration, Sequelize) {
    yield migration.dropTable(Shift.tableName);
  })
};
