const {User} = require('../../models');

module.exports = {
  up: (migration, Sequelize) => {
    migration.createTable(User.tableName, User.attributes);
  },

  down: (migration, Sequelize) => {
    migration.dropTable(User.tableName);
  }
}
