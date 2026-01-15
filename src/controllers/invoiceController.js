const invoiceService = require("../services/invoiceService");

// CREATE
async function addInvoice(req, res) {
  try {
    await invoiceService.addInvoice(req.body);
    res.status(201).send("Invoice added successfully");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// RETRIEVE ALL
async function getAllInvoices(req, res) {
  try {
    const invoices = await invoiceService.getAllInvoices();
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// RETRIEVE ONE
async function getInvoiceById(req, res) {
  try {
    const invoice = await invoiceService.getInvoiceById(req.params.id);
    res.status(200).json(invoice);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

// UPDATE
async function updateInvoice(req, res) {
  try {
    await invoiceService.updateInvoice(req.params.id, req.body);
    res.status(200).send("Invoice updated successfully");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

// DELETE
async function deleteInvoice(req, res) {
  try {
    await invoiceService.deleteInvoice(req.params.id);
    res.status(200).send("Invoice deleted successfully");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  addInvoice,
  getAllInvoices,
  getInvoiceById,
  updateInvoice,
  deleteInvoice,
};
