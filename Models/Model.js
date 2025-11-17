const mongoose = require('mongoose');

const workoutPlans_Schema = new mongoose.Schema({
    trainer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'trainer-Profile',
    },
    name: {
        type: String,
        required: true,
    },
    difficulty_level: {
        type: String,
    },
    duration_weeks: {
        type: Number,
    },
    is_public: {
        type: Boolean,
        default: true, // بشكل افتراضي العامة
    },
    goal_type: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {               // السعر
        type: Number,
        default: 0,        // 0 يعني مجانية
    },
    is_paid: {             // هل الخطة مدفوعة؟
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

module.exports = mongoose.model('workoutPlans', workoutPlans_Schema);
