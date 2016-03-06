'use strict';

const co = require('co');

const {User, Store, sequelize} = require('../models');
const config = require('../config').admin;

const seedAdmin = co.wrap(function*() {
  let admin = yield User.find({name: 'admin'});

  if (admin) { return; }

  admin = User.build({
    login: 'admin',
    name: 'admin',
    role: 'admin',
    password: config.password,
    passwordConfirm: config.password
  });

  try {
    yield admin.save();
  } catch (err) {
    console.error(err);
  }
});

const seedStore = co.wrap(function*() {
  let store = yield Store.find({name: 'Родник'});

  if (store) { return; }

  try {
    yield Store.create({
      name: 'Родник',
      location: '55.1706042,61.358359'
    });
  } catch (err) {
    console.error(err);
  }
});

module.exports = co.wrap(function*() {
  yield sequelize.sync();

  yield seedAdmin();
  yield seedStore();
});
