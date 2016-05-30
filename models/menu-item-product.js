module.exports = (sequelize, DataTypes) => {
  var MenuItemProduct = sequelize.define('MenuItemProduct', {
    menuItemId: {
      type: DataTypes.INTEGER,
      notNull: true,
      primaryKey: true
    },
    productId: {
      type: DataTypes.INTEGER,
      notNull: true,
      primaryKey: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1
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
