const express = require("express");
const Invoice = require("../models/invoice");
const authenticateToken = require("../middlewares/authorization");

const router = express.Router();

// TO-DO: Move callbacks to controller file

// CREATE
router.post("/addinvoice", authenticateToken, async (req, res) => {
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
});

// RETRIEVE ALL
router.get("/invoices", authenticateToken, async (req, res) => {
  try {
    const invoices = await Invoice.fetchAll();
    res.status(200).send(invoices);
  } catch (error) {
    console.error("Failed to fetch invoices: ", error);
    res.status(404).send("Failed to fetch invoices");
  }
});

// RETRIEVE ONE
router.get("/invoices/:id", authenticateToken, async (req, res) => {
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
});

// UPDATE
router.put("/invoices/:id", authenticateToken, async (req, res) => {
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
});

// DELETE
router.delete("/invoices/:id", authenticateToken, async (req, res) => {
  const invoiceId = req.params.id;
  try {
    await Invoice.deleteById(invoiceId);
    res.status(200).send("Invoice deleted successfully");
  } catch (error) {
    console.error("Failed to delete invoice: ", error);
    res.status(404).send("Invoice not found");
  }
});

module.exports = router;

// ------------------------------------------------------------------------------------------------------
// // PUT modifies the entire record and PATCH modifies the parts of the record which client sends
// app.patch("/invoices/:id", authenticateToken, function (req, res) {
//   const invoiceId = req.params.id;

//   Invoice.findById(invoiceId)
//     .then((invoice) => {
//       if (!invoice) {
//         res.status(404).send("The invoice with the given ID was not found.");
//       } else {
//         if (req.body) {
//           console.log(req.body);
//           const updatedClientName = req.body.clientName || invoice.clientName;
//           const updatedAmount = req.body.amount || invoice.amount;
//           const updatedService = req.body.service || invoice.service;
//           const updatedPaymentMethod = req.body.paymentMethod || invoice.paymentMethod;
//           const updatedInvoiceDate = req.body.invoiceDate || invoice.invoiceDate;
//           const updatedIsPaid = req.body.isPaid !== undefined ? req.body.isPaid : invoice.isPaid;

//           const updatedInvoice = new Invoice(
//             invoiceId,
//             updatedClientName,
//             updatedAmount,
//             updatedService,
//             updatedPaymentMethod,
//             updatedInvoiceDate,
//             updatedIsPaid
//           );

//           updatedInvoice
//             .update()
//             .then((result) => console.log(result))
//             .catch((error) => console.log(error));

//           res.status(201).send("Invoice updated successfully");
//         }
//       }
//     })
//     .catch(() => {
//       res.status(404).send("The invoice with the given ID was not found.");
//     });
// });
