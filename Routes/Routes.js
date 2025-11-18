const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/Controllers');

// Create a payment
router.post('/', PaymentController.create);

// Complete a payment
router.post('/:paymentId/complete', PaymentController.complete);

// Optional: list all payments
router.get('/', PaymentController.getAll);

// In paymentRoutes.js
router.get('/pending', PaymentController.getPending);


module.exports = router;
