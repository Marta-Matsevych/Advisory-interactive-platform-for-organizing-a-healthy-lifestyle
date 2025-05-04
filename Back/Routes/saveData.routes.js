const controller = require("../Controllers/saveData.controller");
const authJwt = require("../Middlewares/authJwt");

module.exports = function(app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });


    app.use("/api/calendar", authJwt.verifyToken); // Assuming this is for another route
    app.post("/api/save-recommendations/:id", authJwt.verifyToken, controller.saveRecommendations);
};
