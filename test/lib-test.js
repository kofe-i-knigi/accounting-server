const {should} = require('chai');
should();

const {calcNewPrice} = require('../lib/helpers');

describe('calcNewPrice', () => {

  it('should count new price correctly', () => {
    calcNewPrice(20, 30, 10, 10).should.be.equal(25);
    calcNewPrice(20, 30, 1000, 100).should.be.equal(20.91);
    calcNewPrice(20, 30, 100, 1000).should.be.equal(29.09);
  });
});
