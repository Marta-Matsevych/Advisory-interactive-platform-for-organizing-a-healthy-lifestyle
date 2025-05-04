const controller = require("../Controllers/calendar.controller");
const authJwt = require("../Middlewares/authJwt")
module.exports = function(app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.use("/api/calendar", authJwt.verifyToken);

    app.get("/api/calendar", controller.retrieveCalendar);
    app.put("/api/calendar/:eventId/complete", controller.completeEvent);
    app.post("/api/calendar", authJwt.isModerator, controller.createEvent);
}
