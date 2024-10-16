const { ValidationError } = require("../utils/errorClasses");
const globalErrorHandler = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    switch (err.page) {
      case "update":
        res.send("update error");
        break;
      case "create":
        res.send("create error");
        break;
      case "invalid id":
        res.send("invalid id");
        break;
      default:
        break;
    }
  }
};
module.exports = {
  globalErrorHandler,
};
