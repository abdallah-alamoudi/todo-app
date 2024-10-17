const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_URL || "mongodb://localhost:27017";
const client = new MongoClient(uri);
let db;
const getDB = async () => {
  try {
    if (!db) {
      await client.connect();
      db = client.db("todos-app");
      console.log("connected to mongodb");
    }
    return db;
  } catch (error) {
    console.log(error);
    await client.close();
  }
};
module.exports = { getDB };
