module.exports = (sequelize, DataTypes) => {
  var Shift = sequelize.define("Shift", {
    total: {
      type: DataTypes.DECIMAL(10,2),
      defaultValue: 0.00
    },

    salary: {
      type: DataTypes.DECIMAL(10,2),
      defaultValue: 0.00
    },

    isClosed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },

    closedAt: {
      type: DataTypes.DATE
    }
  }, {
    classMethods: {
      associate({Shift, Receipt, User}) {
        Shift.belongsTo(User, {
          foreignKey: 'userId',
          as: 'user'
        });

        Shift.hasMany(Receipt, {
          foreignKey: 'shiftId'
        });
      }
    },

    instanceMethods: {}
  });

  return Shift;
};
