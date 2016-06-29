module.exports = [{
  model: 'User',
  data: {
    id: 1,
    login: '1'
  }
}, {
  model: 'Store',
  data: {
    id: 1,
    name: 'Родник'
  }
}, {
  model: 'Product',
  data: {
    id: 1,
    name: 'coffee',
    costPrice: 10
  }
}, {
  model: 'Product',
  data: {
    id: 2,
    name: 'sugar',
    costPrice: 2
  }
}, {
  model: 'MenuItem',
  data: {
    id: 1,
    name: 'cola',
    price: 10
  }
}, {
  model: 'MenuItemProduct',
  data: {
    menuItemId: 1,
    productId: 1,
    quantity: 10
  }
}, {
  model: 'StoreProduct',
  data: {
    storeId: 1,
    productId: 1,
    quantity: 100
  }
}];
