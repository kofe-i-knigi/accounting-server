'use strict';

const {Store} = require('../models');
const restify = require('../lib/restify');

module.exports = restify(Store);
