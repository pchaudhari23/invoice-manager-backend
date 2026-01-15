class Invoice {
  constructor({
    id = null,
    clientName,
    amount,
    service,
    paymentMethod,
    invoiceDate,
    isPaid = false,
  }) {
    this.id = id;
    this.clientName = clientName;
    this.amount = amount;
    this.service = service;
    this.paymentMethod = paymentMethod;
    this.invoiceDate = invoiceDate;
    this.isPaid = isPaid;
  }

  canBeDeleted() {
    return !this.isPaid;
  }
}

module.exports = Invoice;
