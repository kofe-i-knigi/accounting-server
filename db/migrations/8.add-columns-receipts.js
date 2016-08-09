const co = require('co');
const {Receipt} = require('../../models');

module.exports = {
  up: co.wrap(function*(migration, Sequelize) {
    yield migration.addColumn(Receipt.tableName, 'total', {
      type: Sequelize.DECIMAL(10,2),
      defaultValue: 0
    });

    yield migration.addColumn(Receipt.tableName, 'shiftId', {
      type: Sequelize.INTEGER
    });
  }),

  down: co.wrap(function*(migration, Sequelize) {
    yield migration.removeColumn(Receipt.tableName, 'total');
    yield migration.removeColumn(Receipt.tableName, 'shiftId');
  })
};
