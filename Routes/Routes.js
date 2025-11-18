const express = require('express');
const SpecializationController = require('../Controllers/SpecializationController');

const router = express.Router();

// CRUD
router.post('/', SpecializationController.create);
router.get('/', SpecializationController.getAll);
router.get('/:id', SpecializationController.getById);
router.put('/:id', SpecializationController.update);
router.delete('/:id', SpecializationController.delete);

module.exports = router;
