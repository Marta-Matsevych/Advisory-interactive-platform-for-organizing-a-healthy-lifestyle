import axios from 'axios';

const API_URL = '/api/events';

const getEvents = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

const createEvent = async (event) => {
    const response = await axios.post(API_URL, event);
    return response.data;
};

const completeEvent = async (eventId) => {
    console.log(eventId)
    return await axios.delete(API_URL + `/${eventId}`)
}

export const EventService = {
    getEvents,
    createEvent,
    completeEvent
};
