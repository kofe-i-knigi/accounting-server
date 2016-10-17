module.exports = (sequelize, DataTypes) => {
  var Shift = sequelize.define("Shift", {
    total: {
      type: DataTypes.DECIMAL(10,2),
      defaultValue: 0.00
    },

    cash: {
      type: DataTypes.DECIMAL(10,2),
      defaultValue: 0.00
    },

    cashless: {
      type: DataTypes.DECIMAL(10,2),
      defaultValue: 0.00
    },

    salary: {
      type: DataTypes.DECIMAL(10,2),
      defaultValue: 0.00
    },

    fullSalary: {
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
    getterMethods: {
      difference() {
        return this.cash + this.cashless - this.total;
      }
    },

    classMethods: {
      associate({Shift, Receipt, User}) {
        Shift.belongsTo(User, {
          foreignKey: 'userId',
          as: 'user'
        });

        Shift.hasMany(Receipt, {
          foreignKey: 'shiftId',
          as: 'receipts'
        });
      }
    },

    instanceMethods: {}
  });

  return Shift;
};
