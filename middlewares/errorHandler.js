const { ValidationError } = require("../utils/errorClasses");
const globalErrorHandler = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    switch (err.page) {
      case "update":
        res.send(err.errors);
        break;
      case "create":
        res.send(err.errors);
        break;
      case "invalid id":
        res.send(err.errors);
        break;
      default:
        break;
    }
  }
};
module.exports = {
  globalErrorHandler,
};
