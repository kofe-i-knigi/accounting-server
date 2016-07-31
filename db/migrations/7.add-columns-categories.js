const co = require('co');
const {Category} = require('../../models');

module.exports = {
  up: co.wrap(function*(migration, Sequelize) {
    yield migration.addColumn(Category.tableName, 'hasDiscount', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    });
  }),

  down: co.wrap(function*(migration, Sequelize) {
    yield migration.removeColumn(Category.tableName, 'hasDiscount');
  })
};
