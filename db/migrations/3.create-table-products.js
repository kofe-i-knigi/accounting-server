const co = require('co');
const {Product, StoreProduct} = require('../../models');

module.exports = {
  up: co.wrap(function*(migration, Sequelize) {
    yield migration.createTable(Product.tableName, Product.attributes);
    yield migration.createTable(StoreProduct.tableName, StoreProduct.attributes);
  }),

  down: co.wrap(function*(migration, Sequelize) {
    yield migration.dropTable(Product.tableName);
    yield migration.dropTable(StoreProduct.tableName);
  })
};
