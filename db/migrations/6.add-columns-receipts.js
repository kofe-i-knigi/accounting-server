const co = require('co');
const {Receipt} = require('../../models');

module.exports = {
  up: co.wrap(function*(migration, Sequelize) {
    yield migration.addColumn(Receipt.tableName, 'discount', {
      type: Sequelize.INTEGER,
      defaultValue: 0
    });

    yield migration.addColumn(Receipt.tableName, 'selfPaid', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    });
  }),

  down: co.wrap(function*(migration, Sequelize) {
    yield migration.removeColumn(Receipt.tableName, 'discount');
    yield migration.removeColumn(Receipt.tableName, 'selfPaid');
  })
};
