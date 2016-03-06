module.exports = (sequelize, DataTypes) => {
  var Store = sequelize.define("Store", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate(models) {
        return models;
      }
    },

    instanceMethods: {}
  });

  return Store;
};
