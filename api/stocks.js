const {DEFAULT_TABLE_PAGE_SIZE, DEFAULT_ORDER} = require('../config/constants');
const {Product, StoreProduct} = require('../models');
const _ = require('lodash');

exports.list = function*() {
  const {storeId} = this.params;
  const limit = this.query.count || DEFAULT_TABLE_PAGE_SIZE;
  const page = this.query.page || 1;
  const filter = this.query.filter || {};

  if (!storeId) {
    throw Error();
  }

  var order = DEFAULT_ORDER;
  if (this.query.sorting && typeof this.query.sorting == 'object') {
    order = _.zip(
      _.keys(this.query.sorting),
      _.values(this.query.sorting));
  }

  Object.keys(filter).forEach(key => {
    if (filter[key] === 'true' || filter[key] === 'false') {
      filter[key] = filter[key] === 'true' ? true : false;
    } else if (key === 'exclude') {
      filter.id = {
        $notIn: filter[key].split(',').map(id => +id)
      };
      delete filter[key];
    } else {
      filter[key] = {
        $iLike: `%${decodeURI(filter[key])}%`
      };
    }
  });

  this.body = yield Product.findAll({
    where: filter,
    order,
    offset: limit * (page - 1),
    limit: limit,
    include: {
      model: StoreProduct,
      as: 'stock',
      where: {storeId}
    }
  });

  const count = yield Product.count({
    where: filter,
    include: {
      model: StoreProduct,
      as: 'stock',
      where: {storeId}
    }
  });

  this.set('Content-Range', `*/${count}`);
};

exports.updateProduct = function*() {
  const {storeId, productId} = this.params;
  const quantity = +this.request.body.quantity;

  if (!(storeId && productId && typeof quantity === 'number')) {
    this.throw(400, 'storeId && productId && quantity are required');
  }

  const result = yield StoreProduct.update({
    quantity
  }, {
    where: {storeId, productId}
  });

  if (result && result[0]) {
    this.body = {status: 1};
  } else {
    this.throw(404);
  }
};

exports.audit = function* () {
  const {items} = this.request.body;
  const {storeId} = this.params;

  yield items.map(({id, quantity}) => {
    return StoreProduct.update({
      quantity
    }, {
      where: {
        storeId,
        productId: id
      }
    });
  });

  this.body = {status: 1};
};

exports.shortage = function*() {
  const {storeId} = this.params;

  if (!storeId) {
    this.throw(400, 'provide storeId');
  }

  const trackedProducts = yield Product.findAll({
    where: {
      standardQuantity: {$gt: 0}
    },

    include: {
      model: StoreProduct,
      as: 'stock',
      where: {storeId}
    }
  });

  this.body = trackedProducts;
};
