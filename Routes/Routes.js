const express = require('express')

// Controller
const RoleController = require('../Controllers/Controllers');

// Middlewares
const CreationProcess = require('../Middlewares/CreationProcess');


// Router
const router = express.Router();

// Routes
router.post('/',CreationProcess,RoleController.createRole);

module.exports = router;