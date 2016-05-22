'use strict';

const {DEFAULT_TABLE_PAGE_SIZE} = require('../config/constants');

module.exports = function restify(Model, options) {
  options = options || {}

  return {list, show, update, create, remove};

  function* list() {
    const limit = this.query.count || DEFAULT_TABLE_PAGE_SIZE;
    const page = this.query.page || 1;
    const include = options.include || [];
    const filter = this.query.filter || {};

    Object.keys(filter).map(key => {
      if (filter[key] === 'true' || filter[key] === 'false') {
        filter[key] = filter[key] === 'true' ? true : false;
      } else {
        filter[key] = {
          like: `%${filter[key]}%`
        };
      }
    });
    console.log(filter);
    this.body = yield Model.findAll({
      offset: limit * (page - 1),
      limit: limit,
      where: filter,
      include
    });

    const count = yield Model.count();

    this.set('Content-Range', `*/${count}`);
  }

  function* show() {
    if(!this.params.id) {
      throw('id is required', 400);
    }

    this.body = yield Model.findOne({
      where: { id: this.params.id }
    });
  }

  function* update() {
    if(!this.params.id) {
      this.throw('id is required', 400);
    }

    let result = yield Model.update(this.request.body, {
      where: { id: this.params.id },
      returning: true
    });

    if(!result[0]) {
      this.throw(404);
    }

    this.body = result[1][0];
  }

  function* create() {
    this.body = yield Model.create(this.request.body);
  }

  function* remove() {
    let result = yield Model.destroy({
      where: { id: this.params.id }
    });

    if (!result) {
      this.throw(404);
    }

    this.body = { success: true };
  }
}