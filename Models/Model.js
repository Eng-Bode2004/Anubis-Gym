const mongoose = require("mongoose");

const TrainerProfileSchema = new mongoose.Schema({

    name: {
        first_name: {
            type: String,
            required: true
        },
        middle_name: {
            type: String
        },
        last_name: {
            type: String,
            required: true
        }
    },

    isVerified: {
        type: Boolean,
        default: false
    },

    specialization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Specialization",
        required: true
    },

    experience_years: {
        type: Number,
        required: true
    },

    rating: {
        type: Number,
        default: 0
    },

    total_reviews: {
        type: Number,
        default: 0
    },

    trainees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trainee Profile"
    }]

}, { timestamps: true });

module.exports = mongoose.model("Trainer Profile", TrainerProfileSchema);
