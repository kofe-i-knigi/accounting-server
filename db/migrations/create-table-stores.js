const {Store} = require('../../models');

module.exports = {
  up: (migration, Sequelize) => {
    migration.createTable(Store.tableName, Store.attributes);
  },

  down: (migration, Sequelize) => {
    migration.dropTable(Store.tableName);
  }
};
