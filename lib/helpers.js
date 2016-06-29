const _ = require('lodash');

exports.calcNewPrice = function(oldPrice, newPrice, oldQuantity, newQuantity) {
  if (oldQuantity == 0) {
    return newPrice;
  } else {
    const price = oldPrice - ((oldPrice - newPrice) *
      (newQuantity / (oldQuantity + newQuantity)));

    return Math.round(price * 100) / 100;
  }
};

function sumQuantities(items, subItems, countQuantity) {
  return   _(items)
    .map(subItems)
    .flatten()
    .uniqBy('id')
    .map(uniq => {
      return _.extend(uniq, {
        quantity: items.reduce((total, item) => {
          const subItem = _.find(item[subItems], {id: uniq.id});
          if (!subItem) { return total; }

          return total + countQuantity(item, subItem);
        }, 0)
      });
    })
    .value();
}

exports.sumItems = function(receipts) {
  function countQuantity(item, subItem) {
    return subItem.quantity;
  }

  return sumQuantities(receipts, 'items', countQuantity);
};

/**
 * take an array of menuItems and sum quantities
 * of all included products
 *
 * @function   calcProductsQuantity
 * @param      {Object[]}  items - array of menuItems
 * @param      {Number}  items.quantity - required
 * @return     {Object[]} products with quantities
 */
exports.calcProductsQuantity = function(items) {
  function countQuantity(item, subItem) {
    return item.quantity * subItem.MenuItemProduct.quantity;
  }

  return sumQuantities(items, 'products', countQuantity);
};
