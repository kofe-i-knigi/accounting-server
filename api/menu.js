const {MenuItem, Product} = require('../models');

exports.getAllItems = function* () {
  this.body = yield MenuItem.findAll({
    include: [{
      model: Product,
      as: 'products'
    }]
  });
};
