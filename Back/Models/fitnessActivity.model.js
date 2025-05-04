const mongoose = require('mongoose');

const fitnessActivitySchema = new mongoose.Schema({
    name: String,
    description: String,
    completedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('FitnessActivity', fitnessActivitySchema);
