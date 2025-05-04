const Event = require('../Models/event.model');

const getEvents = async (req, res) => {
    try {
        const id = req.userId
        const events = await Event.find({user: id});
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createEvent = async (req, res) => {
    const { title, description, start, end } = req.body;
    const id = req.userId

    const newEvent = new Event({ title, description, start, end, user: id });

    try {
        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const completeEvent = async (req, res) => {
    try{
        const id = req.params.id
        console.log(id)
        const eventToComplete = await Event.findByIdAndDelete(id);

        if(!eventToComplete){
            return res.status(404).json('Task not found')
        }

        res.status(200).json(eventToComplete)
    } catch (error){
        res.status(500).json("Couldn't delete item")
    }
}

module.exports = {
    getEvents,
    createEvent,
    completeEvent,
};
