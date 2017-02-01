const co = require('co');
const {Delivery} = require('../../models');

module.exports = {
  up: co.wrap(function*(migration, Sequelize) {
    yield migration.addColumn(Delivery.tableName, 'isWriteoff', {
      type: Sequelize.BOOLEAN
    });
  }),

  down: co.wrap(function*(migration, Sequelize) {
    yield migration.removeColumn(Delivery.tableName, 'isWriteoff');
  })
};
