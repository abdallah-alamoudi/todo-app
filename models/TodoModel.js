const { ObjectId } = require("mongodb");
const { getDB } = require("../data/db");

class Todo {
  constructor({ title, description, completed = false }) {
    this.title = title;
    this.description = description;
    this.completed = completed;
  }
  static async findAll() {
    const todoCollection = getDB().collection("todos");
    const result = await todoCollection.find({}).toArray();
    return result;
  }
  static async findByID(id) {
    const todoCollection = getDB().collection("todos");
    const result = await todoCollection.findOne({ _id: new ObjectId(id) });
    return result;
  }
  async save(todo) {
    const todoCollection = getDB().collection("todos");
    const result = await todoCollection.insertOne(todo);
    return result;
  }
  async delete(id) {
    const todoCollection = getDB().collection("todos");
    const result = await todoCollection.deleteOne({ _id: new ObjectId(id) });
    return result;
  }
}
module.exports = { Todo };
