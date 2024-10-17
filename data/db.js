const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_URL || "mongodb://localhost:27017";
const client = new MongoClient(uri);
let db;
const connectToDB = async () => {
  try {
    await client.connect();
    db = client.db("todos-app");
    console.log("connected to mongodb");
    return db;
  } catch (error) {
    console.log(error);
    await client.close();
  }
};
const getDB = () => {
  if (!db) {
    throw new Error("Database not initialized. Call connectToDB() first.");
  }
  return db;
};
module.exports = { connectToDB, getDB };
