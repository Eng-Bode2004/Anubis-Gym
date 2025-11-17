const express = require('express');
const router = express.Router();

// Controller
const WorkoutPlanController = require('../Controllers/Controllers');

// CRUD Routes
router.post('/', WorkoutPlanController.createWorkoutPlan);       // Create
router.get('/', WorkoutPlanController.getAllWorkoutPlans);       // Read all
router.get('/:id', WorkoutPlanController.getWorkoutPlanById);    // Read one
router.put('/:id', WorkoutPlanController.updateWorkoutPlan);     // Update
router.delete('/:id', WorkoutPlanController.deleteWorkoutPlan);  // Delete

// Get plans by trainer
router.get('/trainer/:trainer_id', WorkoutPlanController.getPlansByTrainer);

module.exports = router;
