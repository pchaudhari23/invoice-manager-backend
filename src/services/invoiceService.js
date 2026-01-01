const Invoice = require("../models/invoice_class");

class InvoiceService {
  async addInvoice(data) {
    const {
      clientName,
      amount,
      service,
      paymentMethod,
      invoiceDate,
      isPaid = false,
    } = data;

    const invoice = new Invoice(
      null,
      clientName,
      amount,
      service,
      paymentMethod,
      invoiceDate,
      isPaid
    );

    return invoice.create();
  }

  async getAllInvoices() {
    return Invoice.fetchAll();
  }

  async getInvoiceById(id) {
    const invoice = await Invoice.findById(id);
    if (!invoice) {
      throw new Error("Invoice not found");
    }
    return invoice;
  }

  async updateInvoice(id, data) {
    const existingInvoice = await Invoice.findById(id);
    if (!existingInvoice) {
      throw new Error("Invoice not found");
    }

    const updatedInvoice = new Invoice(
      id,
      data.clientName,
      data.amount,
      data.service,
      data.paymentMethod,
      data.invoiceDate,
      data.isPaid
    );

    return updatedInvoice.update();
  }

  async deleteInvoice(id) {
    const invoice = await Invoice.findById(id);

    if (!invoice) {
      throw new Error("Invoice not found");
    }

    if (invoice.isPaid) {
      throw new Error("Paid invoices cannot be deleted");
    }

    return Invoice.deleteById(id);
  }
}

module.exports = new InvoiceService();
