const mongodb = require("mongodb");
const invoiceRepository = require("../repositories/invoiceRepository");

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
    return invoiceRepository.createInvoice(this);
  }

  update() {
    if (!this._id) {
      throw new Error("Cannot update an invoice without an ID.");
    }
    return invoiceRepository.updateInvoice(this._id.toString(), this);
  }

  static fetchAll() {
    return invoiceRepository.fetchAllInvoices();
  }

  static findById(invoiceId) {
    return invoiceRepository.findInvoiceById(invoiceId);
  }

  static deleteById(invoiceId) {
    return invoiceRepository.deleteInvoiceById(invoiceId);
  }
}

module.exports = Invoice;
