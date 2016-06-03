const {zipObject, map, find} = require('lodash');
const {Product, StoreProduct} = require('../models');

exports.create = function*() {
  const {products} = this.request.body;
  const {storeId} = this.params;

  if (!storeId || !products || products.length < 0) {
    throw new Error('require storeId and products to create');
  }

  const quantities = zipObject(
    map(products, 'id'),
    map(products, 'quantity'));

  const stockRecords = yield products.map(product => {
    return StoreProduct.findOrCreate({
      where: {
        storeId,
        productId: product.id
      },
      defaults: {
        storeId,
        productId: product.id
      }
    }).spread(sr => Promise.resolve(sr));
  });

  const delivery = yield stockRecords.map(sr => {
    let quantity = quantities[sr.productId] || 0;
    let {costPrice, newCostPrice} = find(products, {
      id: sr.getDataValue('productId')
    });

    let newPrice = (newCostPrice + (costPrice*quantity)) /
      (quantity + sr.quantity);

    newPrice = Math.round(newPrice * 100) / 100;

    sr.setDataValue('quantity',  sr.getDataValue('quantity') + quantity);

    Product.update({
      costPrice: newPrice
    }, {
      where: {
        id: sr.productId
      }
    });

    return sr.save();
  });

  this.body = {delivery};
};










