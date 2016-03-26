'use strict';

const _ = require('lodash');

module.exports = (roles) => {
  if (!_.isArray(roles)) {
    throw new Error('roles must be an array');
  }

  return function*(next) {
    if (!this.state || !this.state.user) {
      return yield next;
    }

    if (!_.includes(roles, this.state.user.role)) {
      this.throw(403);
    }

    yield next;
  };
}
