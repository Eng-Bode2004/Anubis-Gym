const mongoose = require('mongoose');

const SpecializationSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    imageUrl: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Specialization', SpecializationSchema);
