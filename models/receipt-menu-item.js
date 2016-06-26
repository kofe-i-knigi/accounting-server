module.exports = (sequelize, DataTypes) => {
  var ReceiptMenuItem = sequelize.define("ReceiptMenuItem", {
    receiptId: {
      type: DataTypes.INTEGER,
      notNull: true,
      primaryKey: true
    },
    menuItemId: {
      type: DataTypes.INTEGER,
      notNull: true,
      primaryKey: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    classMethods: {
      associate(models) {
        return models;
      }
    },

    instanceMethods: {}
  });

  return ReceiptMenuItem;
};
