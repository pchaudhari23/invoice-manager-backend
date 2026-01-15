const getDb = require("../config/database").getDb;

const userRepository = {
  findByUsername(username) {
    const db = getDb();
    return db.collection("users").findOne({ username });
  },

  create(user) {
    const db = getDb();
    return db.collection("users").insertOne(user);
  },
};

module.exports = userRepository;
