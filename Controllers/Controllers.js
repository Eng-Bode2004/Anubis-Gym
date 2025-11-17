const WorkoutPlanService = require("../Services/Services");

class WorkoutPlanController {
    async createWorkoutPlan(req, res) {
        try {
            const plan = await WorkoutPlanService.createWorkoutPlan(req.body);
            res.status(201).json({ success: true, data: plan });
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    }

    async getAllWorkoutPlans(req, res) {
        try {
            const plans = await WorkoutPlanService.getAllWorkoutPlans();
            res.status(200).json({ success: true, data: plans });
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    }

    async getWorkoutPlanById(req, res) {
        try {
            const plan = await WorkoutPlanService.getWorkoutPlanById(req.params.id);
            res.status(200).json({ success: true, data: plan });
        } catch (err) {
            res.status(404).json({ success: false, error: err.message });
        }
    }

    async updateWorkoutPlan(req, res) {
        try {
            const updated = await WorkoutPlanService.updateWorkoutPlan(req.params.id, req.body);
            res.status(200).json({ success: true, data: updated });
        } catch (err) {
            res.status(400).json({ success: false, error: err.message });
        }
    }

    async deleteWorkoutPlan(req, res) {
        try {
            await WorkoutPlanService.deleteWorkoutPlan(req.params.id);
            res.status(200).json({ success: true, message: "Workout plan deleted" });
        } catch (err) {
            res.status(400).json({ success: false, error: err.message });
        }
    }

    async getPlansByTrainer(req, res) {
        try {
            const plans = await WorkoutPlanService.getPlansByTrainer(req.params.trainer_id);
            res.status(200).json({ success: true, data: plans });
        } catch (err) {
            res.status(400).json({ success: false, error: err.message });
        }
    }
}

module.exports = new WorkoutPlanController();
