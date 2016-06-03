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
