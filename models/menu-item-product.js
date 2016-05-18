module.exports = (sequelize, DataTypes) => {
  var MenuItemProduct = sequelize.define('MenuItemProduct', {
    menuItemId: {
      type: DataTypes.INTEGER,
      notNull: true
    },
    productId: {
      type: DataTypes.INTEGER,
      notNull: true
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

  return MenuItemProduct;
};
