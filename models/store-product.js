module.exports = (sequelize, DataTypes) => {
  var StoreProduct = sequelize.define("StoreProduct", {
    storeId: {
      type: DataTypes.INTEGER,
      notNull: true,
      primaryKey: true
    },
    productId: {
      type: DataTypes.INTEGER,
      notNull: true,
      primaryKey: true,
      references: {
        model: "Product",
        key: "id"
      }
    },
    quantity: {
      type: DataTypes.DECIMAL,
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
