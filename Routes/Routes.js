const express = require("express");
const router = express.Router();

const WorkoutPlanController = require("../Controllers/Controllers");

// CRUD
router.post("/", WorkoutPlanController.createWorkoutPlan);
router.get("/", WorkoutPlanController.getAllWorkoutPlans);
router.get("/:id", WorkoutPlanController.getWorkoutPlanById);
router.put("/:id", WorkoutPlanController.updateWorkoutPlan);
router.delete("/:id", WorkoutPlanController.deleteWorkoutPlan);

// Get plans created by a specific trainer
router.get("/trainer/:trainer_id", WorkoutPlanController.getPlansByTrainer);

module.exports = router;
