'use strict';

const crypto = require('mz/crypto');
const co = require('co');

const env = process.env.NODE_ENV || 'development';
const {registrationToken} = require('../config')[env];

module.exports = co.wrap(function*() {
  let currentDay = Math.floor(Date.now() / (1000 * 60 * 60 * 24)).toString();
  let buffer = yield crypto.pbkdf2(registrationToken, currentDay, 100, 4);

  return buffer.toString('hex');
});
