const globalErrorHandler = (err, req, res, next) => {
  console.log(err);
  if (err instanceof TodoError) {
    res.render("todos/createForm", {
      title: "new todo",
      data: {
        error,
        formData: req.body,
      },
    });
  }
};
module.exports = {
  globalErrorHandler,
};
