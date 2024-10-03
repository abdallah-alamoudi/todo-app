const fs = require("fs");
const path = require("path");
const todosPath = path.join(__dirname, "../data/todos.json");
const readTodos = () => {
  if (!fs.existsSync(todosPath) || fs.readFileSync(todosPath, "utf-8") === "")
    return [];
  const todosJson = fs.readFileSync(todosPath, "utf-8");
  // console.log(todosJson);
  return JSON.parse(todosJson);
};

const writeTodos = (todos) => {
  const todosJson = JSON.stringify(todos);
  fs.writeFileSync(todosPath, todosJson);
};

module.exports = {
  writeTodos,
  readTodos,
};
