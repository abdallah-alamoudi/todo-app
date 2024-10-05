const fs = require("fs");
const path = require("path");
const todosPath = path.join(__dirname, "../data/todos.json");
const dataDir = path.join(__dirname, "../data");

// create data folder if not found
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}
const readTodos = () => {
  if (!fs.existsSync(todosPath) || fs.readFileSync(todosPath, "utf-8") === "") {
    return [];
  }
  const todosJson = fs.readFileSync(todosPath, "utf-8");
  // console.log(todosJson);
  return JSON.parse(todosJson);
};

const writeTodos = (todos) => {
  const todosJson = JSON.stringify(todos);

  fs.writeFileSync(todosPath, todosJson);
};
const isDuplicate = (title, id, todos) => {
  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];
    if (title === todo.title && id !== todo.id) {
      return true;
    }
  }
  return false;
};
module.exports = {
  writeTodos,
  readTodos,
  isDuplicate,
};
