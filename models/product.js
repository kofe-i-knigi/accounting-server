module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    costPrice: {
      type: DataTypes.DECIMAL,
      defaultValue: 0.00
    },
    isIngridient: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    unit: {
      type: DataTypes.STRING,
      defaultValue: 'шт'
    }
  }, {
    classMethods: {
      associate({Product, Store, StoreProduct, MenuItem, MenuItemProduct}) {
        Product.belongsToMany(Store, {
          through: StoreProduct,
          foreignKey: 'productId'
        });

        Product.belongsToMany(MenuItem, {
          through: MenuItemProduct,
          foreignKey: 'productId'
        });
      }
    },

    instanceMethods: {}
  });

  return Product;
};
