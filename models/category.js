module.exports = (sequelize, DataTypes) => {
  var Category = sequelize.define("Category", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
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
