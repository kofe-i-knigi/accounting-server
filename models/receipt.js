const co = require('co');
const {extend} = require('lodash');
const {calcProductsQuantity, sumItems} = require('../lib/helpers');

module.exports = (sequelize, DataTypes) => {
  var Receipt = sequelize.define("Receipt", {
    type: {
      type: DataTypes.STRING,
      defaultValue: 'cash'
    },

    date: {
      type: DataTypes.DATE
    },

    selfPaid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },

    discount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },

    total: {
      type: DataTypes.DECIMAL(10,2),
      defaultValue: 0.00
    }
  }, {
    classMethods: {
      associate({MenuItem, Receipt, ReceiptMenuItem, User}) {
        Receipt.belongsToMany(MenuItem, {
          through: ReceiptMenuItem,
          foreignKey: 'receiptId',
          as: 'items'
        });

        MenuItem.belongsToMany(Receipt, {
          through: ReceiptMenuItem,
          foreignKey: 'menuItemId',
          as: 'receipts'
        });

        Receipt.belongsTo(User, {
          foreignKey: 'userId',
          as: 'user'
        });
      },

      /**
       * create a new receipt with items and user
       *
       * @method     createBatchWithItems
       * @param      {Object[]}  data - array of receipts
       * @param      {Object[]}  data.items - array of attached items
       * @param      {Number}  data.items.quantity - required
       * @param      {number}  userId - id of responsible user
       * @return     {Object[]} receipts
       */
      createBatchWithItems: co.wrap(function*(data, userId, shiftId) {
        const {sequelize, StoreProduct, Store} = require('./index');

        const receipts = yield this.bulkCreate(data.map(receipt => {
          return extend({userId, shiftId}, receipt);
        }), {
          returning: true
        });

        yield receipts.map((receipt, i) => {
          let items = data[i].items;

          return items.map(item => {
            return receipt.addItem(item.id, {quantity: item.quantity});
          });
        });

        const store = yield Store.find();
        const products = calcProductsQuantity(sumItems(data));
        yield products.map(product => {
          return StoreProduct.update({
            quantity: sequelize.literal(`quantity - ${product.quantity}`)
          }, {
            where: {
              productId: product.id,
              storeId: store.id
            }
          });
        });

        return receipts;
      })
    },

    instanceMethods: {}
  });

  return Receipt;
};
