const {basePayment, bonusPercent} = require('../config').admin;

exports.get = function*() {
  this.body = {basePayment, bonusPercent};
};
