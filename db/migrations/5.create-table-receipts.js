const co = require('co');
const {Receipt, ReceiptMenuItem} = require('../../models');

module.exports = {
  up: co.wrap(function*(migration, Sequelize) {
    yield migration.createTable(Receipt.tableName, Receipt.attributes);
    yield migration.createTable(ReceiptMenuItem.tableName, ReceiptMenuItem.attributes);
  }),

  down: co.wrap(function*(migration, Sequelize) {
    yield migration.dropTable(ReceiptMenuItem.tableName);
    yield migration.dropTable(Receipt.tableName);
  })
};
