module.exports = (sequelize, DataTypes) => {
  const Audit = sequelize.define("Audit", {
    items: {
      type: DataTypes.JSON
    }
  }, {
    classMethods: {
      associate({Store, Audit}) {
        Audit.belongsTo(Store, {
          foreignKey: 'storeId',
          as: 'store'
        });
      }
    },

    instanceMethods: {}
  });

  return Audit;
};
