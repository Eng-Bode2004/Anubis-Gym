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
        default: true,
    },


    goal_type: {
        type: String,
    },


    description: {
        type: String,
    },


    price: {
        type: Number,
        default: 0,
    },


    is_paid: {
        type: Boolean,
        default: false,
    }

}, { timestamps: true });

module.exports = mongoose.model('workoutPlans', workoutPlans_Schema);
