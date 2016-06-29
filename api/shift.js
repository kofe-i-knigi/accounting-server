const {Receipt} = require('../models');

exports.close = function*() {
  const receipts = this.request.body;

  yield Receipt.createBatchWithItems(receipts, this.state.user.id);

  this.body = {status: 1};
};
