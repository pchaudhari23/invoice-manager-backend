const mongodb = require("mongodb");
const dbHelpers = require("../db/dbHelpers");

// TO-DO: Add mongoose schema validation

class Invoice {
  constructor(
    _id,
    clientName,
    amount,
    service,
    paymentMethod,
    invoiceDate,
    isPaid = false
  ) {
    this._id = _id ? new mongodb.ObjectId(_id) : null;
    this.clientName = clientName;
    this.amount = amount;
    this.service = service;
    this.paymentMethod = paymentMethod;
    this.invoiceDate = invoiceDate;
    this.isPaid = isPaid;
  }

  create() {
    return dbHelpers.createInvoice(this);
  }

  update() {
    if (!this._id) {
      throw new Error("Cannot update an invoice without an ID.");
    }
    return dbHelpers.updateInvoice(this._id.toString(), this);
  }

  static fetchAll() {
    return dbHelpers.fetchAllInvoices();
  }

  static findById(invoiceId) {
    return dbHelpers.findInvoiceById(invoiceId);
  }

  static deleteById(invoiceId) {
    return dbHelpers.deleteInvoiceById(invoiceId);
  }
}

module.exports = Invoice;
