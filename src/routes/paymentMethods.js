const express = require("express");
const paymentMethodsController = require("../controllers/paymentMethods/paymentMethods.controller");

const router = express.Router();

// Create a new payment method
router.post("/", paymentMethodsController.createPaymentMethod);

// Get all payment methods
router.get("/", paymentMethodsController.getAllPaymentMethods);

// Get payment method by ID
router.get("/:id", paymentMethodsController.getPaymentMethodById);

// Update payment method by ID
router.put("/:id", paymentMethodsController.updatePaymentMethod);

// Delete payment method by ID
router.delete("/:id", paymentMethodsController.deletePaymentMethod);

module.exports = router;
