const {Product, StoreProduct} = require('../models');

exports.list = function*() {
  const {storeId} = this.params;

  if (!storeId) {
    throw Error();
  }

  this.body = yield Product.findAll({
    include: {
      model: StoreProduct,
      as: 'stock',
      where: {storeId}
    }
  });
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
