const co = require('co');
const {MenuItem, Category, MenuItemProduct} = require('../../models');

module.exports = {
  up: co.wrap(function*(migration, Sequelize) {
    yield migration.createTable(Category.tableName, Category.attributes);
    yield migration.createTable(MenuItem.tableName, MenuItem.attributes);
    yield migration.createTable(MenuItemProduct.tableName, MenuItemProduct.attributes);
  }),

  down: co.wrap(function*(migration, Sequelize) {
    yield migration.dropTable(MenuItem.tableName);
    yield migration.dropTable(Category.tableName);
    yield migration.dropTable(MenuItemProduct.tableName);
  })
};
