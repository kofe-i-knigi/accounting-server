'use strict';

const {MenuItem, Product} = require('../models');
const restify = require('../lib/restify');

const resource = restify(MenuItem, {
  include: [{
    model: Product,
    as: 'products'
  }]
});

resource.show = function*() {
  if(!this.params.id) {
    throw('id is required', 400);
  }

  this.body = yield MenuItem.findOne({
    where: { id: this.params.id }
  });  
};

resource.create = function*() {
  this.body = yield MenuItem.createWithProducts(this.request.body);
};

resource.addIngridient = function*() {
  const {id} = this.request.body;
  const {quantity} = this.request.body.MenuItemProduct;

  const menuItem = yield MenuItem.findById(this.params.id);

  yield menuItem.addProduct(+id, {quantity});

  this.body = menuItem;
};

resource.removeIngridient = function*() {
  const menuItem = yield MenuItem.findById(this.params.id);

  yield menuItem.removeProduct(+this.params.productId);
  this.body = menuItem;
};

resource.updateIngridient = function*() {
  const {quantity} = this.request.body.MenuItemProduct;

  const menuItem = yield MenuItem.findById(this.params.id);

  yield menuItem.addProduct(+this.params.productId, {quantity});
  this.body = menuItem;
};

module.exports = resource;












