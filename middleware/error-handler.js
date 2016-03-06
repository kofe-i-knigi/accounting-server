module.exports = function *(next) {
  try {
    yield next;
  } catch (err) {
    if (err.status) {
      this.status = err.status;
      this.body = {
        code: this.status,
        error: err.message
      };
    } else {
      this.status = 500;
      this.body = {
        code: 500,
        error: 'Internal Server Error'
      };
    }

    this.app.emit('error', err, this);
  }
};
