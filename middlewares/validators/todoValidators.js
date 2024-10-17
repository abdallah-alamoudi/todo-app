const { body, param } = require("express-validator");
const { checkValidation } = require("../../utils/helpers");
const validateCreateTodo = [
  body("title")
    .notEmpty()
    .withMessage("title must exist")
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
  checkValidation("create"),
];
const validateUpdateTodo = [
  param("id")
    .isMongoId()
    .withMessage("no todo with this id")
    .trim()
    .escape()
    .bail(),
  body("title")
    .optional()
    .notEmpty()
    .withMessage("title must exist")
    .isLength({ min: 5, max: 100 })
    .withMessage("title must be between 5 and 100 characters long ")
    .trim()
    .escape(),
  body("description").optional().trim().escape(),
  body("completed")
    .optional()
    .isIn(["on", undefined])
    .withMessage("todo must be a completed or uncompleted")
    .customSanitizer((val) => val === "on"),
  checkValidation("update"),
];
const validateAndSanitizeID = [
  param("id").trim().isMongoId().escape(),
  checkValidation("invalid id"),
];
module.exports = {
  validateCreateTodo,
  validateUpdateTodo,
  validateAndSanitizeID,
};
