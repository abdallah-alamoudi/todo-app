const { v4: uuidv4 } = require("uuid");
const { writeTodos, readTodos } = require("../utils/helpers");

class TodoError extends Error {
  constructor(message) {
    super(message), (this.name = "TodoError");
  }
}
class TodoModel {
  static getTodos() {
    return readTodos();
  }
  static getTodo(id) {
    const todos = this.getTodos();
    const todo = todos.find((todo) => todo.id === id);
    if (!todo) throw new TodoError("no todo found with this id " + id);
    return todo;
  }

  static deleteTodo(id) {
    const todos = this.getTodos();
    const newTodos = todos.filter((todo) => todo.id !== id);
    if (newTodos.length === todos.length) {
      throw new TodoError("no todo found with this id " + id);
    }
    writeTodos(newTodos);
    return true;
  }
  static createTodo({ title, description }) {
    const todo = {
      id: uuidv4(),
      title,
      description,
      completed: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    const todos = this.getTodos();
    const duplicateTodo = todos.find((todo) => todo.title === title);
    if (duplicateTodo)
      throw new TodoError("a todo with this title already exist");
    todos.push(todo);
    writeTodos(todos);
    return todo;
  }

  static updateTodo(id, updateObj) {
    //check if the update fields are allowed
    const allowedFields = ["title", "description", "completed"];
    const updateFields = Object.keys(updateObj);
    const isAllowed = updateFields.every((field) =>
      allowedFields.includes(field)
    );
    if (!isAllowed) throw new TodoError("unallowed to update fields");
    // creating to do
    const todos = this.getTodos();
    const todoInx = todos.findIndex((todo) => todo.id === id);
    const todo = this.getTodo(id);
    const newTodo = {
      ...todo,
      ...updateObj,
      updated_at: new Date().toISOString(),
    };
    // updating todos
    todos[todoInx] = newTodo;
    writeTodos(todos);
    return newTodo;
  }
}
module.exports = TodoModel;
