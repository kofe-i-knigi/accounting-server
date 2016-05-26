'use strict';

const {omit, clone} = require('lodash');
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
  const menuItem = MenuItem.build(omit(
    clone(this.request.body),
    'products'));

  yield menuItem.save();
  
  let products = this.request.body.products.map(product => {
    Product.build(product);
  });

  products = yield menuItem
    .addProduct(products[0], {quantity: this.request.body.products[0].quantity});

  this.body = menuItem;
}

module.exports = resource;










