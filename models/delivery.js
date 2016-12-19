module.exports = (sequelize, DataTypes) => {
  const Delivery = sequelize.define("Delivery", {
    items: {
      type: DataTypes.JSON
    }
  }, {
    classMethods: {
      associate({Store, Delivery}) {
        Delivery.belongsTo(Store, {
          foreignKey: 'storeId',
          as: 'store'
        });
      }
    },

    instanceMethods: {}
  });

  return Delivery;
};
