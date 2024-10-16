const express = require("express");
const router = express.Router();

const {
  validateCreateTodo,
  validateUpdateTodo,
  validateAndSanitizeID,
} = require("../middlewares/validators/todoValidators");

const TodoController = require("../controllers/TodoController");
router.get("/", TodoController.listTodos);
router.post("/", validateCreateTodo, TodoController.create);
router.get("/new", TodoController.createForm);
router.get("/:id/delete", validateAndSanitizeID, TodoController.deletePage);
router.get("/:id/edit", validateAndSanitizeID, TodoController.editForm);
router.get("/:id", validateAndSanitizeID, TodoController.getTodo);
router.put("/:id", validateUpdateTodo, TodoController.update);
router.delete("/:id", validateAndSanitizeID, TodoController.deleteTodo);

module.exports = router;
