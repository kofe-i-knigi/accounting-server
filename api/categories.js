'use strict';

const {Category, MenuItem} = require('../models');
const restify = require('../lib/restify');

const controller = restify(Category);

controller.toggleDiscount = function*() {
  if(!this.params.id) {
    this.throw('id is required', 400);
  }

  let result = yield Category.update(this.request.body, {
    where: {id: this.params.id},
    returning: true
  });

  if(!result[0]) {
    this.throw(404);
  }

  yield MenuItem.update({
    hasDiscount: this.request.body.hasDiscount
  }, {
    where: {categoryId: this.params.id}
  });

  this.body = result[1][0];
}

module.exports = controller;
