exports.calcNewPrice = function(oldPrice, newPrice, oldQuantity, newQuantity) {
  if (oldQuantity == 0) {
    return newPrice;
  } else {
    const price = oldPrice - ((oldPrice - newPrice) *
      (newQuantity / (oldQuantity + newQuantity)));

    return Math.round(price * 100) / 100;
  }
};
