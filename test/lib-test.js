const {should} = require('chai');
const {find} = require('lodash');
should();
const testData = require('./fixtures/lib');

const {calcNewPrice, calcProductsQuantity} = require('../lib/helpers');

describe('calcNewPrice', () => {
  it('should count new price correctly', () => {
    calcNewPrice(20, 30, 10, 10).should.be.equal(25);
    calcNewPrice(20, 30, 1000, 100).should.be.equal(20.91);
    calcNewPrice(20, 30, 100, 1000).should.be.equal(29.09);
  });
});

describe('calcProductsQuantity', () => {
  it('should return array of product ids with correct quantities', () => {
    const quantities = calcProductsQuantity(testData.menuItems);

    find(quantities, {id: 1}).quantity.should.be.equal(6);
    find(quantities, {id: 2}).quantity.should.be.equal(4);
    find(quantities, {id: 3}).quantity.should.be.equal(5);
  });
});
