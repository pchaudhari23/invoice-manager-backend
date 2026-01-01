require("dotenv").config();
const { MongoClient } = require("mongodb");

let _db;
let _client;

const connectDB = async () => {
  try {
    _client = await MongoClient.connect(process.env.CONNECTION_STRING);
    console.log("Connected to MongoDB");

    _db = _client.db();
    return _db;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
};

const getDb = () => {
  if (!_db) {
    throw new Error("No database found. Did you call connectToDatabase?");
  }
  return _db;
};

const closeDb = async () => {
  if (_client) {
    await _client.close();
    console.log("MongoDB connection closed");
  }
};

module.exports = {
  connectDB,
  getDb,
  closeDb,
};
