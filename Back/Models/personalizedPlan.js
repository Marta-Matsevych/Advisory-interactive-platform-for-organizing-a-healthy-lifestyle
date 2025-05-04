const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personalizedPlanSchema = new Schema({
    dietRecommendations: String,
    exerciseRecommendations: String,
    generalTips: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

const PersonalizedPlan = mongoose.model('PersonalizedPlan', personalizedPlanSchema);

module.exports = PersonalizedPlan;
