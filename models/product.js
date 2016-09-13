module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    costPrice: {
      type: DataTypes.DECIMAL(10,2),
      defaultValue: 0.00
    },
    isIngridient: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    unit: {
      type: DataTypes.STRING,
      defaultValue: 'шт'
    },
    standardQuantity: {
      type: DataTypes.INTEGER
    }
  }, {
    getterMethods: {
      totalCostPrice() {
        if (!this.stock || !this.stock[0]) {
          return 0;
        }

        return this.costPrice * (this.stock[0].quantity || 0);
      },

      shortage() {
        if (!this.standardQuantity || !this.stock || !this.stock[0]) {
          return 0;
        }

        return -Math.min(0, this.stock[0].quantity - this.standardQuantity);
      }
    },
    classMethods: {
      associate({Product, Store, StoreProduct, MenuItem, MenuItemProduct}) {
        Product.hasMany(StoreProduct, {
          as: 'stock',
          foreignKey: 'productId'
        });

        Product.belongsToMany(Store, {
          through: StoreProduct,
          as: 'products',
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




