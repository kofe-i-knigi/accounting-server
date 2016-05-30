const path = require('path');
const {expect} = require('chai');
const co = require('co');

const prepareDb = require('./helper');
const testData = require('./fixtures/after-load');

delete require.cache[require.resolve('../models')];
const models = require('../models');
const {sequelize, MenuItem, Product} = models;

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
});













