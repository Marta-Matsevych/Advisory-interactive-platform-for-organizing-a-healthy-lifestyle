const db = require("../Models");
const PersonalizedPlan = db.personalizedPlan;


exports.saveRecommendations = async (req, res) => {
    try {
        const { personalizedPlan } = req.body;
        if (!personalizedPlan) {
            return res.status(400).json({ error: "Missing recommendations in request body" });
        }
        const userId = req.userId;
        const user = await PersonalizedPlan.find({user:userId});
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }
        const savedPlan = await new PersonalizedPlan({
            ...personalizedPlan,
            user: userId,
        }).save();
        res.status(201).json(savedPlan);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to save recommendations." });
    }
};
