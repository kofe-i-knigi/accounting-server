const co = require('co');
const {Product} = require('../../models');

module.exports = {
  up: co.wrap(function*(migration, Sequelize) {
    yield migration.addColumn(Product.tableName, 'standardQuantity', {
      type: Sequelize.INTEGER
    });
  }),

  down: co.wrap(function*(migration, Sequelize) {
    yield migration.removeColumn(Product.tableName, 'standardQuantity');
  })
};
