const TodoModel = require("../models/TodoModel");
// TodoModel.createTodo({ title: "doing 5", description: "after tomorow" });
const listTodos = (req, res, next) => {
  try {
    const todos = TodoModel.getTodos();
    res.render("todos/index", { todos, title: "todos" });
  } catch (error) {
    next(error);
  }
};
const getTodo = (req, res, next) => {
  try {
    const todo = TodoModel.getTodo(req.params.id);
    res.render("todos/showTodo", { title: "todo", todo });
  } catch (error) {
    next(error);
  }
};
const deletePage = (req, res, next) => {
  try {
    const todo = TodoModel.getTodo(req.params.id);
    res.render("todos/deleteTodo", { title: "Delete todo", todo });
  } catch (error) {
    next(error);
  }
};
const deleteTodo = (req, res, next) => {
  try {
    TodoModel.deleteTodo(req.params.id);
    res.redirect("/todos");
  } catch (error) {
    next(error);
  }
};
const createForm = (req, res, next) => {
  try {
    res.render("todos/createForm", {
      title: "new todo",
      data: {},
    });
  } catch (error) {
    next(error);
  }
};
const create = (req, res, next) => {
  try {
    const { title, description } = req.body;
    const todo = TodoModel.createTodo({ title, description });
    res.redirect(`/todos/${todo.id}`);
  } catch (error) {
    console.log(req.body);
    res.render("todos/createForm", {
      title: "new todo",
      data: {
        error,
        formData: req.body,
      },
    });
  }
};
const editForm = (req, res, next) => {
  try {
    const todoId = req.params.id;
    const todo = TodoModel.getTodo(todoId);
    res.render("todos/editForm", { title: "edit todo", todo });
  } catch (error) {
    next(error);
  }
};
const update = (req, res, next) => {
  try {
    const todoId = req.params.id;
    const updateObj = req.body;
    TodoModel.updateTodo(todoId, updateObj);
    res.redirect(`/todos/${todoId}`);
  } catch (error) {}
};
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
