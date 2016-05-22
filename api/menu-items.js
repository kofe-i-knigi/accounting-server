'use strict';

const {MenuItem, Product} = require('../models');
const restify = require('../lib/restify');

module.exports = restify(MenuItem, {
  include: [{
    model: Product
  }]
});
