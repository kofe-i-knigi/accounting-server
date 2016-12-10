const {Audit} = require('../models');
const restify = require('../lib/restify');

module.exports = restify(Audit, {
  order: [['createdAt', 'DESC']]
});
