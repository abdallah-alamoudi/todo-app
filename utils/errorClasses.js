class ValidationError extends Error {
  constructor(errors, page) {
    super();
    this.page = page;
    this.errors = errors.map((err) => {
      return { field: err.path, msg: err.msg, value: err.value };
    });
  }
}
module.exports = {
  ValidationError,
};
