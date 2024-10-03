const express = require("express");
const router = express.Router();

const TodoController = require("../controllers/TodoController");
router.get("/", TodoController.listTodos);
router.post("/", TodoController.create);
router.get("/new", TodoController.createForm);
router.get("/:id/delete", TodoController.deletePage);
router.get("/:id/edit", TodoController.editForm);
router.get("/:id", TodoController.getTodo);
// router.put("/:id", TodoController.editTodo);
router.delete("/:id", TodoController.deleteTodo);

module.exports = router;
