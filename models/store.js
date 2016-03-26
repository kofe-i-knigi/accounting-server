module.exports = (sequelize, DataTypes) => {
  var Store = sequelize.define("Store", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    location: {
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate({Product, Store, StoreProduct}) {
        Store.belongsToMany(Product, {
          through: StoreProduct,
          foreignKey: 'storeId'
        });
      }
    },

    instanceMethods: {}
  });

  return Store;
};
