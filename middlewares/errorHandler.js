const { ValidationError } = require("../utils/errorClasses");
const globalErrorHandler = (err, req, res, next) => {
  console.log(err);
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
    res.send(err);
  }
  res.send(err);
};
module.exports = {
  globalErrorHandler,
};
