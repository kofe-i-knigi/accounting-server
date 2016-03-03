'use strict';

const co = require('co');

const models = require('../models');
const config = require('../config').admin;

function seedAdmin() {
  return co(function*() {
    let admin = yield models.User.find({name: 'admin'});

    if (admin) { return; }

    admin = models.User.build({
      login: 'admin',
      name: 'admin',
      role: 'admin'
    });

    admin.password = config.password;

    try {
      yield admin.save();
    } catch (err) {
      console.error(err);
    }
  });
}

module.exports = co.wrap(function*() {
  yield models.sequelize.sync();

  yield seedAdmin();
});
