const { body } = require("express-validator");
const { checkValidation } = require("../../utils/helpers");
const createTodoValidator = [
  body("title")
    .notEmpty()
    .withMessage("title must exist")
    .isAlphanumeric()
    .withMessage("title must be alphanumeric")
    .isLength({ min: 5, max: 100 })
    .withMessage("title must be between 5 and 100 characters long ")
    .trim()
    .escape(),
  body("description")
    .notEmpty()
    .withMessage("todo must have a description")
    .trim()
    .escape(),
  checkValidation,
];
module.exports = {
  createTodoValidator,
};
