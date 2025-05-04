const db = require("../Models")
const CalendarEvent = db.calendar
const authJwt= require("../Middlewares/authJwt");

exports.retrieveCalendar = async (req, res) => {
    try {
        const calendarEvents = await CalendarEvent.find();
        res.status(200).json(calendarEvents);
    } catch (error) {
        res.status(500).json({ error: 'Could not retrieve calendar items.' });
    }
}

exports.completeEvent = async (req, res) => {
    try {
        const eventId = req.params.eventId;
        await CalendarEvent.findByIdAndUpdate(eventId, { completed: true });
        res.status(200).json({ message: 'Event completed successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Could not complete event.' });
    }
};

exports.createEvent = async (req, res) => {
    try {
        if (!req.body.title || !req.body.date) {
            return res.status(400).json({error: "Missing required fields: title and date."});
        }

        const newEvent = new CalendarEvent({
            title: req.body.title,
            date: req.body.date,
            description: req.body.description || "",
        });

        if (!await authJwt.isModerator(req)) {
            return res.status(403).json({ error: "Only moderators can create events." });
        }

        const savedEvent = await newEvent.save();

        res.status(201).json(savedEvent);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Failed to create event."});
    }
};
