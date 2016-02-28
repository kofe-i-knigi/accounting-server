'use strict';

const co = require('co');
const crypto = require('mz/crypto');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    role: {
      type: DataTypes.STRING,
      defaultValue: 'barista'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hash: DataTypes.TEXT,
    salt: DataTypes.STRING
  }, {
    classMethods: {
      associate(models) {

      }
    },

    instanceMethods: {

      /**
       * @method     hashPass
       * @param      {String}  pass
       * @return     {String} { pass hashed with salt }
       */
      hashPass: co.wrap(function*(pass) {
        let buffer = yield crypto.pbkdf2(pass, this.salt, 10000, 256);

        return buffer.toString('hex');
      }),

      /**
       * hash passed password with salt and compare
       * to hash saved to db
       *
       * @method     authenticate
       * @param      {String}  pass
       * @return     {Boolean}
       */
      authenticate: co.wrap(function*(pass) {
        let hashedPass = yield this.hashPass(pass);

        return this.hash === hashedPass;
      })
    },
    hooks: {
      beforeCreate: co.wrap(function*(user) {
        let saltBuffer = yield crypto.randomBytes(16);

        user.dataValues.salt = saltBuffer.toString('hex');
        user.dataValues.hash = yield user.hashPass(user.password);
      })
    }
  });

  return User;
};
