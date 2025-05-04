const express = require('express');
const router = express.Router();
const EventController = require('../Controllers/event.controller');
const {authJwt} = require("../Middlewares");


module.exports = function(app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });
    app.use('/api/events', authJwt.verifyToken)
    app.get('/api/events', EventController.getEvents);

    app.post('/api/events', EventController.createEvent);

    app.delete(`/api/events/:id`, EventController.completeEvent);
}
