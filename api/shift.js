const {sumBy} = require('lodash');
const {Receipt, Shift, User} = require('../models');
const restify = require('../lib/restify');

const resource = restify(Shift, {
  include: [{
    model: User,
    as: 'user'
  }]
});

resource.close = function*() {
  const {receipts} = this.request.body;
  const userId = this.state.user.id;
  const total = sumBy(receipts, 'total');
  const salary = this.request.body.salary || 0;

  const shift = yield Shift.create({
    userId,
    salary,
    total,
    isClosed: true,
    closedAt: new Date()});

  yield Receipt.createBatchWithItems(receipts, userId, shift.id);

  this.body = {status: 1};
};

module.exports = resource;
