module.exports = (sequelize, DataTypes) => {
  var Category = sequelize.define("Category", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    hasDiscount: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    color: {
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate({Category, MenuItem}) {
        Category.hasMany(MenuItem, {
          foreignKey: 'categoryId'
        });
      }
    },

    instanceMethods: {}
  });

  return Category;
};
