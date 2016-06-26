const co = require('co');

module.exports = (sequelize, DataTypes) => {
  const MenuItem = sequelize.define('MenuItem', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    price: {
      type: DataTypes.DECIMAL,
      defaultValue: 0.00
    },
    isComposite: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {

    getterMethods: {

      /**
       * calcs sum of costPrices of all included prods
       *
       * @method costPrice
       */
      costPrice() {
        if (!this.products) {
          return 0;
        }

        return this.products.reduce((sum, p) => {
          return sum + p.costPrice * p.MenuItemProduct.quantity;
        }, 0);
      }
    },

    classMethods: {
      associate({MenuItem, Category, Product, MenuItemProduct}) {
        MenuItem.belongsTo(Category, {
          foreignKey: 'categoryId'
        });

        MenuItem.belongsToMany(Product, {
          through: MenuItemProduct,
          foreignKey: 'menuItemId',
          as: 'products'
        });
      },

       /**
       * attaches passed products to menuItem
       *
       * @method     createWithProducts
       * @param      {Object}  data -menuItem json
       * @param      {Object[]}  data.products - array of attached products
       * @param      {Number}  data.products.quantity - required
       * @return     {Object} menuItem
       */
      createWithProducts: co.wrap(function*(data) {
        const menuItem = this.build(data);

        yield menuItem.save();

        yield data.products.map(product => {
          return menuItem.addProduct(product.id, {quantity: product.quantity});
        });

        return menuItem;
      })
    },

    instanceMethods: {}
  });

  return MenuItem;
};
