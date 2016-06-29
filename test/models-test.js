const path = require('path');
const {expect} = require('chai');
const co = require('co');

const prepareDb = require('./helper');
const testData = require('./fixtures/after-load');

delete require.cache[require.resolve('../models')];
const models = require('../models');
const {sequelize, MenuItem, Product, Receipt, StoreProduct} = models;

const migrationsPath = path.resolve(__dirname, '../db/migrations');
const fixtures = [path.resolve(__dirname, './fixtures/before-load.js')];

describe('models', () => {
  beforeEach(() => {
    return prepareDb({
      sequelize,
      migrationsPath,
      models,
      fixtures
    });
  });

  describe('MenuItem#createWithProducts', () => {
    it('should create MenuItemProduct with both ids', co.wrap(function*() {
      let menuItem = yield MenuItem.createWithProducts(testData.menuItem);

      menuItem = yield MenuItem.findById(menuItem.id, {
        include: {
          model: Product,
          as: 'products'
        }
      });

      expect(menuItem.products.length).to.be.equal(2);

    }));
  });

  describe('Receipt#createBatchWithItems', () => {
    it('creates some receipts with items and user', co.wrap(function*() {
      let receipts = yield Receipt.createBatchWithItems(
        testData.receipts,
        1);

      let receipt = yield Receipt.findById(receipts[1].id, {
        include: {
          model: MenuItem,
          as: 'items'
        }
      });

      expect(receipt.items.length).to.be.gt(0);
      expect(receipt.items[0].ReceiptMenuItem.quantity).to.equal(1);

      yield new Promise(resolve => {
        setTimeout(resolve, 200);
      });

      let storeProduct = yield StoreProduct.find({
        where: {
          storeId: 1,
          productId: 1
        }
      });

      expect(storeProduct.quantity).to.equal(70);

      // expect(new Date(receipt.date)).to.equal(new Date([5, 10, 2016]));
    }));
  });
});
