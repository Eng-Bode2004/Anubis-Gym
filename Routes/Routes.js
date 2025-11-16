const express = require('express')

// Controller
const RoleController = require('../Controllers/Controllers');

// Middlewares
const CreationProcess = require('../Middlewares/CreationProcess');


// Router
const router = express.Router();

// Routes
router.post('/',CreationProcess,RoleController.createRole);
router.get('/', RoleController.getAllRoles);                   // Get All
router.get('/:id', RoleController.getRoleById);                // Get By ID
router.delete('/:id', RoleController.deleteRole);              // Delete
router.put('/:id', RoleController.updateRole);
router.get('/exclude/:id', RoleController.getRolesExcept);

module.exports = router;