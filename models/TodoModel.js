const { ObjectId } = require("mongodb");
const { getDB } = require("../data/db");

class Todo {
  constructor(title, description, completed) {
    this._id = new ObjectId();
    this.title = title;
    this.description = description;
    this.completed = completed;
  }
  static async findAll() {
    const todoCollection = getDB().collection("todos");
    return await todoCollection.find({}).toArray();
  }
  static async findByID(id) {
    const todoCollection = getDB().collection("todos");
    return await todoCollection.findOne({ _id: ObjectId(id) });
  }
}
module.exports = { Todo };
