const path = require('path');
// const {should, expect} = require('chai');

const prepareDb = require('./helper');
const testData = require('./fixtures/after-load');

delete require.cache[require.resolve('../models')];
const models = require('../models');
const {sequelize, MenuItem} = models;

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
    it('should create MenuItemProduct with both ids', () => {
      return MenuItem.createWithProducts(testData).then((menuItem) => {
        console.log(menuItem);
      });
    });
  });
});
