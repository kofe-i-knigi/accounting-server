const config = require('../../config').admin;

module.exports = [{
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
  model: 'User',
  data: {
    login: 'admin',
    name: 'admin',
    role: 'admin',
    password: config.password,
    passwordConfirm: config.password
  }
}];
