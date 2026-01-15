const Invoice = require("../models/invoiceModel");
const invoiceRepository = require("../repositories/invoiceRepository");

class InvoiceService {
  async addInvoice(data) {
    const invoice = new Invoice(data);
    return invoiceRepository.create(invoice);
  }

  async getAllInvoices() {
    return invoiceRepository.findAll();
  }

  async getInvoiceById(id) {
    const invoice = await invoiceRepository.findById(id);
    if (!invoice) {
      throw new Error("Invoice not found");
    }
    return invoice;
  }

  async updateInvoice(id, data) {
    const existing = await invoiceRepository.findById(id);
    if (!existing) {
      throw new Error("Invoice not found");
    }

    const invoice = new Invoice({ id, ...data });
    return invoiceRepository.update(id, invoice);
  }

  async deleteInvoice(id) {
    const existing = await invoiceRepository.findById(id);
    if (!existing) {
      throw new Error("Invoice not found");
    }

    const invoice = new Invoice({ ...existing, id });

    if (!invoice.canBeDeleted()) {
      throw new Error("Paid invoices cannot be deleted");
    }

    return invoiceRepository.delete(id);
  }
}

module.exports = new InvoiceService();
