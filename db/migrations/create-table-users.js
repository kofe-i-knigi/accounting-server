const _ = require('lodash');
const {User} = require('../../models');

module.exports = {
  up: (migration, Sequelize) => {
    attributes = _.omit(User.attributes, ['password', 'passwordConfirm']);

    migration.createTable(User.tableName, attributes);
  },

  down: (migration, Sequelize) => {
    migration.dropTable(User.tableName);
  }
};
