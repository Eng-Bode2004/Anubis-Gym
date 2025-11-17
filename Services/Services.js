const WorkoutPlan = require('../Models/Model');

class WorkoutPlanService {

    async createWorkoutPlan(data) {
        try {
            const plan = new WorkoutPlan(data);
            return await plan.save();
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getAllWorkoutPlans() {
        try {
            return await WorkoutPlan.find();
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getWorkoutPlanById(id) {
        try {
            const plan = await WorkoutPlan.findById(id);
            if (!plan) throw new Error('Workout plan not found');
            return plan;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async updateWorkoutPlan(id, data) {
        try {
            const plan = await WorkoutPlan.findById(id);
            if (!plan) throw new Error('Workout plan not found');

            // تحديث الحقول المتاحة
            plan.name = data.name || plan.name;
            plan.difficulty_level = data.difficulty_level || plan.difficulty_level;
            plan.duration_weeks = data.duration_weeks || plan.duration_weeks;
            plan.is_public = data.is_public !== undefined ? data.is_public : plan.is_public;
            plan.goal_type = data.goal_type || plan.goal_type;
            plan.description = data.description || plan.description;
            plan.price = data.price !== undefined ? data.price : plan.price;
            plan.is_paid = data.is_paid !== undefined ? data.is_paid : plan.is_paid;

            return await plan.save();
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async deleteWorkoutPlan(id) {
        try {
            const deleted = await WorkoutPlan.findByIdAndDelete(id);
            if (!deleted) throw new Error('Workout plan not found');
            return deleted;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getPlansByTrainer(trainer_id) {
        try {
            return await WorkoutPlan.find({ trainer_id });
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = new WorkoutPlanService();
