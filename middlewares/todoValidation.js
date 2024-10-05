const existTodo = (req, res, next) => {
  const todoId = req.params.id;
  const todos = this.getTodos();
  const todo = todos.find((todo) => todo.id === todoId);
  if (todo) {
    req.todo = todo;
    next;
  }
};
