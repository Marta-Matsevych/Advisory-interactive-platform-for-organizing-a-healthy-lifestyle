const mongoose = require("mongoose");

const CalendarEvent = mongoose.model(
    "CalendarEvent",
    new mongoose.Schema({
        title: String,
        date: Date,
        description: String,
        completed: {
            type: Boolean,
            default: false,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    })
)

module.exports = CalendarEvent;
