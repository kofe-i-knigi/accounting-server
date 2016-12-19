const {zipObject, map, find} = require('lodash');
const {Product, StoreProduct, Delivery} = require('../models');
const {calcNewPrice} = require('../lib/helpers');

const restify = require('../lib/restify');

module.exports = restify(Delivery, {
  order: [['createdAt', 'DESC']]
});

module.exports.create = function*() {
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

  const items = yield stockRecords.map(sr => {
    const oldQuantity = sr.quantity;
    const quantity = +quantities[sr.productId] || 0;
    const {costPrice, newCostPrice} = find(products, {
      id: sr.getDataValue('productId')
    });

    const newPrice = calcNewPrice(
      +costPrice,
      +newCostPrice / +quantity,
      +sr.quantity,
      +quantity
    );

    sr.setDataValue('quantity',  sr.quantity + quantity);

    return sr.save().then(() => {
      return Product.update({
        costPrice: newPrice
      }, {
        where: {
          id: sr.productId
        },
        returning: true
      });
    })
    .then((result) => {
      const [,[product]] = result;

      return {
        name: product.getDataValue('name'),
        unit: product.getDataValue('unit'),
        quantity,
        oldQuantity,
        newQuantity: sr.quantity,
        oldPrice: +costPrice,
        newPrice
      };
    });
  });
  console.log(storeId, items);
  const delivery = yield Delivery.create({storeId, items});

  this.body = {delivery};
};
