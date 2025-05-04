const FitnessActivity = require('../Models/fitnessActivity.model');

const getActivities = async (req, res) => {
    try {
        const activities = await FitnessActivity.find();
        res.json(activities);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const completeActivity = async (req, res) => {
    const { activityId } = req.params;

    try {
        const activity = await FitnessActivity.findById(activityId);

        activity.completedBy.push(req.user._id);

        await activity.save();
        res.json(activity);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = {
    getActivities,
    completeActivity,
};
