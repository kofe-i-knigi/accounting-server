'use strict';

const {Category} = require('../models');
const restify = require('../lib/restify');

module.exports = restify(Category);
