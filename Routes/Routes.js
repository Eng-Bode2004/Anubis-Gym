const express = require('express')

// Controller
const SpecializationController = require('../Controllers/Controllers');


// Router
const router = express.Router();

// Routes
// Create
router.post("/", SpecializationController.create);

// Get all
router.get("/", SpecializationController.getAll);

// Get by id
router.get("/:id", SpecializationController.getById);

// Update
router.put("/:id", SpecializationController.update);

// Delete
router.delete("/:id", SpecializationController.delete);

module.exports = router;