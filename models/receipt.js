const co = require('co');
const {extend} = require('lodash');

module.exports = (sequelize, DataTypes) => {
  var Receipt = sequelize.define("Receipt", {
    type: {
      type: DataTypes.STRING,
      defaultValue: 'cash'
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
          foreignKey: 'userId'
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
      createBatchWithItems: co.wrap(function*(data, userId) {
        const receipts = yield this.bulkCreate(data.map(receipt => {
          extend(receipt, {userId});
        }), {
          returning: true
        });

        yield receipts.map((receipt, i) => {
          let items = data[i].items;

          return items.map(item => {
            return receipt.addItem(item.id, {quantity: item.quantity});
          });
        });

        return receipts;
      })
    },

    instanceMethods: {}
  });

  return Receipt;
};
