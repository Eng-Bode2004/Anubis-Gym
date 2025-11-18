// Routes/PaymentProvider_Routes.js
const express = require("express");
const router = express.Router();

const PaymentProviderController = require("../Controllers/Controllers");

// Create
router.post("/create", PaymentProviderController.create);

// Get all
router.get("/all", PaymentProviderController.getAll);

// Update
router.put("/update/:id", PaymentProviderController.update);

// Delete
router.delete("/delete/:id", PaymentProviderController.delete);

// Activate / Deactivate
router.patch("/status/:id", PaymentProviderController.toggleStatus);

module.exports = router;
