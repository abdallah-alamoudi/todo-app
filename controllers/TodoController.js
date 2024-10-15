const { TodoModel, TodoError } = require("../models/TodoModel");
const { asyncHandler } = require("../utils/helpers");
const listTodos = asyncHandler((req, res, next) => {
  const todos = TodoModel.getTodos();
  res.render("todos/index", { todos, title: "todos" });
});
const getTodo = asyncHandler((req, res, next) => {
  const todo = TodoModel.getTodo(req.params.id);
  res.render("todos/showTodo", { title: "todo", todo });
});
const deletePage = asyncHandler((req, res, next) => {
  const todo = TodoModel.getTodo(req.params.id);
  res.render("todos/deleteTodo", { title: "Delete todo", todo });
});
const deleteTodo = asyncHandler((req, res, next) => {
  TodoModel.deleteTodo(req.params.id);
  res.redirect("/todos");
});
const createForm = asyncHandler((req, res, next) => {
  res.render("todos/createForm", {
    title: "new todo",
    data: {},
  });
});
const create = asyncHandler((req, res, next) => {
  const { title, description } = req.body;
  const todo = TodoModel.createTodo({ title, description });
  res.redirect(`/todos`);
});
const editForm = asyncHandler((req, res, next) => {
  const todoId = req.params.id;
  const todo = TodoModel.getTodo(todoId);
  res.render("todos/editForm", { title: "edit todo", todo, error: null });
});
const update = asyncHandler((req, res, next) => {
  const todoId = req.params.id;
  const updateObj = req.body;
  TodoModel.updateTodo(todoId, updateObj);
  res.redirect(`/todos`);
});
module.exports = {
  listTodos,
  getTodo,
  deletePage,
  deleteTodo,
  createForm,
  create,
  editForm,
  update,
};
