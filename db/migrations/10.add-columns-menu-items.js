const co = require('co');
const {MenuItem} = require('../../models');

module.exports = {
  up: co.wrap(function*(migration, Sequelize) {
    yield migration.addColumn(MenuItem.tableName, 'hasDiscount', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    });
  }),

  down: co.wrap(function*(migration, Sequelize) {
    yield migration.removeColumn(MenuItem.tableName, 'hasDiscount');
  })
};
