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
    classMethods: {
      associate({MenuItem, Category, Product, MenuItemProduct}) {
        MenuItem.belongsTo(Category, {
          foreignKey: 'categoryId'
        });

        MenuItem.belongsToMany(Product, {
          through: MenuItemProduct,
          foreignKey: 'menuItemId'
        });
      }
    },

    instanceMethods: {}
  });

  return MenuItem;
};
