const _ = require('lodash');
const {Receipt, Shift, User} = require('../models');
const restify = require('../lib/restify');
const {basePayment, bonusPercent} = require('../config/index.js').admin;

function calcSalary(receipts, skipSelfPaid) {
  const totalBonus = _.sum(receipts.map(receipt => {
    if (receipt.selfPaid) {
      return skipSelfPaid ? 0 : receipt.total;
    } else {
      return _.sum(receipt.items.map((item) => {
        const markup = Math.max(+item.price - item.costPrice, 0);
        var bonus = markup / 100 * bonusPercent * item.quantity;
        if (item.hasDiscount) {
          bonus -= bonus * receipt.discount;
        }

        return Math.ceil(bonus);
      }));
    }
  }));

  return basePayment + totalBonus;
}

const resource = restify(Shift, {
  include: [{
    model: User,
    as: 'user'
  }]
});

resource.close = function*() {
  const {receipts, cash, cashless} = this.request.body;
  const userId = this.state.user.id;
  const total = _.sumBy(receipts, 'total');

  const salary = calcSalary(receipts);
  const fullSalary = calcSalary(receipts, true);

  const shift = yield Shift.create({
    userId,
    salary,
    fullSalary,
    total,
    cash,
    cashless,
    isClosed: true,
    closedAt: new Date()});

  yield Receipt.createBatchWithItems(receipts, userId, shift.id);

  this.body = {status: 1};
};

module.exports = resource;
