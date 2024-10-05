const { v4: uuidv4 } = require("uuid");
const { writeTodos, readTodos, isDuplicate } = require("../utils/helpers");

class TodoError extends Error {
  constructor(message, type) {
    super(message);
    this.name = "TodoError";
    this.type = type;
  }
}
class TodoModel {
  static getTodos() {
    return readTodos();
  }
  static getTodo(id) {
    const todos = this.getTodos();
    const todo = todos.find((todo) => todo.id === id);
    if (!todo)
      throw new TodoError("no todo found with this id " + id, "Not found");
    return todo;
  }

  static deleteTodo(id) {
    const todos = this.getTodos();
    const newTodos = todos.filter((todo) => todo.id !== id);
    if (newTodos.length === todos.length) {
      throw new TodoError("no todo found with this id " + id, "Not found");
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

    // check if title already exist
    if (isDuplicate(todo.title, todo.id, todos))
      throw new TodoError(
        "a todo with this title already exist",
        "Duplicate title"
      );
    todos.push(todo);
    writeTodos(todos);
    return todo;
  }

  static updateTodo(id, updateObj) {
    // check if todo exist
    const todos = this.getTodos();
    const todoInx = todos.findIndex((todo) => todo.id === id);
    const todo = todos[todoInx];
    if (todoInx === -1)
      throw new TodoError(
        "No todo with this id " + id + " is found",
        "Not found"
      );

    //check if the update fields are allowed
    const allowedFields = ["title", "description", "completed"];
    const updateFields = Object.keys(updateObj);
    const unallowedFields = [];
    updateFields.forEach((field) => {
      if (!allowedFields.includes(field)) {
        unallowedFields.push(field);
      }
    });

    if (unallowedFields.length) {
      const todoError = TodoError(
        "unallowed to update fields",
        "Unallowed update"
      );
      todoError.unallowedFields = unallowedFields;
      throw todoError;
    }
    // check if new title is being updated and its duplicate

    if (isDuplicate(updateObj.title, todo.id, todos)) {
      throw new TodoError(
        "a todo with this title already exist",
        "Duplicate title"
      );
    }

    // update the completed field
    updateObj.completed = updateObj.completed === "on";
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
module.exports = { TodoModel, TodoError };
