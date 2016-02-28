'use strict';

const co = require('co');

const models = require('../models');
const config = require('../config').admin;

function seedAdmin() {
  return co(function*() {
    let admin = yield models.User.find({name: 'admin'});

    if (admin) { return; }

    admin = models.User.build({
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

co(function*() {
  yield models.sequelize.sync({force: false});

  yield seedAdmin();

  process.exit();
});
