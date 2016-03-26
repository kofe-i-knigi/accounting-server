'use strict';

const {Product} = require('../models');
const restify = require('../lib/restify');

module.exports = restify(Product);
