'use strict';

const {MenuItem, Product, Category} = require('../models');
const restify = require('../lib/restify');

const resource = restify(MenuItem, {
  include: [{
    model: Product,
    as: 'products'
  }, {
    model: Category,
    as: 'category'
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

resource.update = function* update() {
  if(!this.params.id) {
    this.throw('id is required', 400);
  }

  if (this.request.body.category) {
    this.request.body.categoryId = this.request.body.category.id;
  }

  let result = yield MenuItem.update(this.request.body, {
    where: { id: this.params.id },
    returning: true
  });

  if(!result[0]) {
    this.throw(404);
  }

  this.body = result[1][0];
}


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
