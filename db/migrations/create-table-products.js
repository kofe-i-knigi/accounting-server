const {Product, StoreProduct} = require('../../models');

module.exports = {
  up: (migration, Sequelize) => {
    migration.createTable(Product.tableName, Product.attributes);
    migration.createTable(StoreProduct.tableName, StoreProduct.attributes);
  },

  down: (migration, Sequelize) => {
    migration.dropTable(Product.tableName);
    migration.dropTable(StoreProduct.tableName);
  }
};
