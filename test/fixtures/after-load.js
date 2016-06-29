module.exports = {
  menuItem: {
    name: 'cappucchino',
    isComposite: true,
    products: [{
      id: 1,
      name: 'coffee',
      quantity: 45
    }, {
      id: 2,
      name: 'sugar',
      quantity: 50
    }]
  },

  receipts: [{
    date: new Date([5, 10, 2016]),
    type: 'cash',
    items: [{
      id: 1,
      quantity: 2,
      products: [{
        id: 1,
        MenuItemProduct: {
          menuItemId: 1,
          productId: 1,
          quantity: 10
        }
      }]
    }]
  }, {
    date: new Date([5, 11, 2016]),
    type: 'card',
    items: [{
      id: 1,
      quantity: 1,
      products: [{
        id: 1,
        MenuItemProduct: {
          menuItemId: 1,
          productId: 1,
          quantity: 10
        }
      }]
    }]
  }]
};
