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
  this.body = yield MenuItem.findAll({
    where: {
      categoryId: this.params.categoryId
    },
    include: [{
      model: Product,
      as: 'products'
    }]
  });
};
