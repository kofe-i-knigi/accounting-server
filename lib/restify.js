'use strict';

module.exports = function restify(Model) {

  return {list, show, update, create, remove};

  function* list() {
    this.body = yield Model.findAll();
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
