const {MenuItem, Category, MenuItemProduct} = require('../../models');

module.exports = {
  up: (migration, Sequelize) => {
    migration.createTable(MenuItem.tableName, MenuItem.attributes);
    migration.createTable(Category.tableName, Category.attributes);
    migration.createTable(MenuItemProduct.tableName, MenuItemProduct.attributes);
  },

  down: (migration, Sequelize) => {
    migration.dropTable(MenuItem.tableName);
    migration.dropTable(Category.tableName);
    migration.dropTable(MenuItemProduct.tableName);
  }
};
