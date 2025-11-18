const express = require("express");
const router = express.Router();
const PaymentProviderController = require("../Controllers/Controllers");

// Create
router.post("/", PaymentProviderController.create);

// Get All
router.get("/", PaymentProviderController.getAll);

// Update
router.put("/:id", PaymentProviderController.update);

// Delete
router.delete("/:id", PaymentProviderController.delete);

// Activate / Deactivate
router.patch("/status/:id", PaymentProviderController.toggleStatus);

// Get Only Active Providers
router.get("/active", PaymentProviderController.getActive);


module.exports = router;
