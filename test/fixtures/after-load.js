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
    createdAt: new Date([5, 10, 2016]).toString(),
    type: 'cash',
    items: [{
      id: 1,
      quantity: 2
    }]
  }, {
    createdAt: new Date([5, 11, 2016]).toString(),
    type: 'card',
    items: [{
      id: 1,
      quantity: 1
    }]
  }]
};
