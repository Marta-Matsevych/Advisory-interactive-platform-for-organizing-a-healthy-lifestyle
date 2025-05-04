const express = require('express');
const router = express.Router();
const FitnessController = require('../Controllers/fitness.controller');
const authMiddleware = require('../Middlewares/authJwt');
const {authJwt} = require("../Middlewares");

module.exports = function(app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });
    app.get('/api/fitness', FitnessController.getActivities);

    app.put('/:activityId/complete', authJwt.verifyToken, FitnessController.completeActivity);
}
