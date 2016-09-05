const co = require('co');
const {Shift} = require('../../models');

module.exports = {
  up: co.wrap(function*(migration, Sequelize) {
    yield migration.addColumn(Shift.tableName, 'cash', {
      type: Sequelize.DECIMAL(10,2),
      defaultValue: 0.00
    });

    yield migration.addColumn(Shift.tableName, 'cashless', {
      type: Sequelize.DECIMAL(10,2),
      defaultValue: 0.00
    });
  }),

  down: co.wrap(function*(migration, Sequelize) {
    yield migration.removeColumn(Shift.tableName, 'cash');
    yield migration.removeColumn(Shift.tableName, 'cashless');
  })
};
