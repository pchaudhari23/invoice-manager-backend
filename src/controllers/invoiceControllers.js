const Invoice = require("../models/invoice_class");

// CREATE
async function addInvoice(req, res) {
  const {
    clientName,
    amount,
    service,
    paymentMethod,
    invoiceDate,
    isPaid = false,
  } = req.body;

  const invoice = new Invoice(
    null,
    clientName,
    amount,
    service,
    paymentMethod,
    invoiceDate,
    isPaid
  );

  try {
    await invoice.create();
    res.status(201).send("Invoice added successfully");
  } catch (error) {
    console.error("Failed to add invoice: ", error);
    res.status(500).send("Failed to add invoice");
  }
}

// RETRIEVE ALL
async function getAllInvoices(req, res) {
  try {
    const invoices = await Invoice.fetchAll();
    res.status(200).send(invoices);
  } catch (error) {
    console.error("Failed to fetch invoices: ", error);
    res.status(404).send("Failed to fetch invoices");
  }
}

// RETRIEVE ONE
async function getInvoiceById(req, res) {
  const invoiceId = req.params.id;
  try {
    const invoice = await Invoice.findById(invoiceId);
    if (!invoice) {
      return res
        .status(404)
        .send("The invoice with the given ID was not found.");
    }
    res.status(200).send(invoice);
  } catch (error) {
    console.error("Failed to fetch invoice: ", error);
    res.status(404).send("Failed to fetch invoice");
  }
}

// UPDATE
async function updateInvoice(req, res) {
  const invoiceId = req.params.id;
  const { clientName, amount, service, paymentMethod, invoiceDate, isPaid } =
    req.body;

  try {
    const existingInvoice = await Invoice.findById(invoiceId);
    if (!existingInvoice) {
      return res
        .status(404)
        .send("The invoice with the given ID was not found.");
    }

    const updatedInvoice = new Invoice(
      invoiceId,
      clientName,
      amount,
      service,
      paymentMethod,
      invoiceDate,
      isPaid
    );

    await updatedInvoice.update();
    res.status(200).send("Invoice updated successfully");
  } catch (error) {
    console.error("Failed to update invoice: ", error);
    res.status(500).send("Failed to update invoice");
  }
}

// DELETE
async function deleteInvoice(req, res) {
  const invoiceId = req.params.id;
  try {
    await Invoice.deleteById(invoiceId);
    res.status(200).send("Invoice deleted successfully");
  } catch (error) {
    console.error("Failed to delete invoice: ", error);
    res.status(404).send("Invoice not found");
  }
}

module.exports = {
  addInvoice,
  getAllInvoices,
  getInvoiceById,
  updateInvoice,
  deleteInvoice,
};
