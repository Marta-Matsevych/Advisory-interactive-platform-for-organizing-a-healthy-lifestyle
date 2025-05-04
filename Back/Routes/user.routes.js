const { authJwt } = require("../Middlewares");
const controller = require("../Controllers/user.controller");
const PersonalizedPlan = require("../Models/personalizedPlan");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.use("/api/personalized-plan", [authJwt.verifyToken]);

    app.get("/api/test/all", controller.allAccess);

    app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

    app.get(
        "/api/test/mod",
        [authJwt.verifyToken, authJwt.isModerator],
        controller.moderatorBoard
    );

    app.get(
        "/api/test/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    );

    app.get('/api/personalized-plan/:id', async (req, res) => {
        try {
            const userId = req.params.userId;
            const personalizedPlan = await PersonalizedPlan.findOne({ userId: userId });
            res.json(personalizedPlan);
        } catch (error) {
            console.error('Error fetching personalized plan:', error);
            res.status(500).send('Error fetching personalized plan');
        }
    });
};
