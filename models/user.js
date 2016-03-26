'use strict';

const co = require('co');
const crypto = require('crypto');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    role: {
      type: DataTypes.STRING,
      defaultValue: 'barista'
    },
    isBlocked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING
    },
    hash: DataTypes.TEXT,
    salt: {
      type: DataTypes.STRING,
      defaultValue() {
        return crypto.randomBytes(4).toString('hex');
      }
    },

    passwordConfirm: DataTypes.VIRTUAL,
    password: {
      type: DataTypes.VIRTUAL,
      validate: {
        isLongEnough: longerThan(6),
        matchesConfirm(password) {
          if (password !== this.passwordConfirm) {
            throw new Error('password and password match must be equal');
          }
        }
      }
    }
  }, {
    classMethods: {
      associate(models) {
        return models;
      }
    },

    instanceMethods: {

      /**
       * @method     hashPass
       * @param      {String}  pass
       * @return     {String} { pass hashed with salt }
       */
      hashPass(pass) {
        return crypto.pbkdf2Sync(pass, this.salt, 1000, 256).toString('hex');
      },

      /**
       * hash passed password with salt and compare
       * to hash saved to db
       *
       * @method     authenticate
       * @param      {String}  pass
       * @return     {Boolean}
       */
      authenticate: co.wrap(function*(pass) {
        return this.hash === this.hashPass(pass);
      })
    },
    hooks: {
      beforeCreate(user) {
        user.dataValues.hash = user.hashPass(user.password);
      }
    }
  });

  return User;
};

function longerThan(n) {
  return (string) => {
    if (string.length < n) {
      throw new Error(`Must be longer than ${n}`);
    }
  };
}
