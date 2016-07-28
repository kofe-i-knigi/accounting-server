const {DEFAULT_ORDER} = require('../config/constants');
const {MenuItem, Product, Category} = require('../models');

exports.getAllItems = function* () {
  this.body = yield MenuItem.findAll({
    include: [{
      model: Product,
      as: 'products'
    }]
  });
};

exports.getCategories = function* () {
  this.body = yield Category.findAll();
};

exports.getItems = function* () {
  if (!+this.params.categoryId) {
    this.throw(400, 'provide categoryId');
  }

  this.body = yield MenuItem.findAll({
    where: {
      categoryId: this.params.categoryId
    },
    order: DEFAULT_ORDER,
    include: [{
      model: Product,
      as: 'products'
    }]
  });
};
