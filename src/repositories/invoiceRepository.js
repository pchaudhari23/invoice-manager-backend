const mongodb = require("mongodb");
const getDb = require("../config/database").getDb;

const invoiceRepository = {
  create(invoice) {
    const db = getDb();
    return db.collection("invoices").insertOne(invoice);
  },

  findAll() {
    const db = getDb();
    return db.collection("invoices").find().toArray();
  },

  findById(id) {
    if (!mongodb.ObjectId.isValid(id)) {
      throw new Error("Invalid ID");
    }
    const db = getDb();
    return db
      .collection("invoices")
      .findOne({ _id: new mongodb.ObjectId(id) });
  },

  update(id, invoice) {
    const { id: _, ...data } = invoice;
    const db = getDb();
    return db.collection("invoices").updateOne(
      { _id: new mongodb.ObjectId(id) },
      { $set: data }
    );
  },

  delete(id) {
    const db = getDb();
    return db
      .collection("invoices")
      .deleteOne({ _id: new mongodb.ObjectId(id) });
  },
};

module.exports = invoiceRepository;
