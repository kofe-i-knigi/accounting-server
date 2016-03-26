module.exports = (sequelize, DataTypes) => {
  var StoreProduct = sequelize.define("StoreProduct", {
    storeId: {
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

  return StoreProduct;
};
