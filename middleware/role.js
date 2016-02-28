module.exports = (role) => {
  return function*(next) {
    if (!this.state || !this.state.user) {
      return yield next;
    }

    if (this.state.user.role !== role) {
      this.throw(403);
    }

    yield next;
  };
}
