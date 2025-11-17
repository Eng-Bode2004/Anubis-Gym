const WorkoutPlan = require("../Models/Model");

class WorkoutPlanService {
    async createWorkoutPlan(data) {
        const plan = new WorkoutPlan(data);
        return await plan.save();
    }

    async getAllWorkoutPlans() {
        return await WorkoutPlan.find();
    }

    async getWorkoutPlanById(id) {
        const plan = await WorkoutPlan.findById(id);
        if (!plan) throw new Error("Workout plan not found");
        return plan;
    }

    async updateWorkoutPlan(id, data) {
        return await WorkoutPlan.findByIdAndUpdate(id, { $set: data }, { new: true });
    }

    async deleteWorkoutPlan(id) {
        return await WorkoutPlan.findByIdAndDelete(id);
    }

    async getPlansByTrainer(trainer_id) {
        return await WorkoutPlan.find({ trainer_id });
    }
}

module.exports = new WorkoutPlanService();
