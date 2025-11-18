// Routes/PaymentProvider_Routes.js
const express = require("express");
const router = express.Router();

const PaymentProviderController = require("../Controllers/Controllers");

// Create
router.post("/", PaymentProviderController.create);

// Get all
router.get("/", PaymentProviderController.getAll);

// Update
router.put("/:id", PaymentProviderController.update);

// Delete
router.delete("/:id", PaymentProviderController.delete);

// Activate / Deactivate
router.patch("/status/:id", PaymentProviderController.toggleStatus);

module.exports = router;
