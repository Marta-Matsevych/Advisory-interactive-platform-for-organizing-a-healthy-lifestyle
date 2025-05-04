import React, { useState, useEffect } from 'react';
import { EventService } from '../Services/EventService';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../Styles/Calendarr.css';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format } from 'date-fns';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';

const locales = {
    'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const Calendar1 = () => {
    const [events, setEvents] = useState([]);
    const [dataEvents, setDataEvents] = useState([]);
    const [showEventForm, setShowEventForm] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        const data = await EventService.getEvents();
        setEvents(data);
        const formattedEvents = data.map((event) => ({
            id: event._id,
            start: new Date(event.start),
            end: new Date(event.end),
            title: event.title,
            description: event.description,
            completed: event.completed || false,
        }));
        setDataEvents(formattedEvents);
    };

    const handleSelectSlot = (slotInfo) => {
        setSelectedEvent({
            start: slotInfo.start,
            end: slotInfo.end,
            title: '',
            description: '',
            completed: false,
        });
        setShowEventForm(true);
    };

    const handleSelectEvent = (event) => {
        setSelectedEvent(event);
        setShowEventForm(true);
    };

    const handleCloseEventForm = () => {
        setShowEventForm(false);
        setSelectedEvent(null);
    };

    const handleEventSubmit = async (event) => {
        if (selectedEvent.id) {
            await EventService.updateEvent(selectedEvent.id, event);
        } else {
            await EventService.createEvent(event);
        }
        fetchEvents();
        handleCloseEventForm();
    };

    const handleCompleteEvent = async (eventId) => {
        await EventService.completeEvent(eventId);
        fetchEvents();
    };

    const eventStyleGetter = (event, start, end, isSelected) => {
        const style = {
            backgroundColor: isSelected ? '#3174ad' : '#3788d8',
            borderRadius: '4px',
            opacity: 0.8,
            color: 'white',
            display: 'block',
            marginBottom: '5px',
        };

        const sameStartEndDay =
            start.getDate() === end.getDate() &&
            start.getMonth() === end.getMonth() &&
            start.getFullYear() === end.getFullYear();

        if (!sameStartEndDay) {
            const daysBetween = Math.round((end - start) / (1000 * 60 * 60 * 24));

            if (daysBetween > 1) {
                style.borderRadius = '4px 4px 0 0';
                style.marginBottom = 0;
            }

            const events = dataEvents.filter(
                (e) => e.title === event.title && !e.completed
            );

            if (events.length > 1) {
                const eventIndex = events.findIndex((e) => e.id === event.id);

                if (eventIndex === 0) {
                    style.marginTop = '10px';
                } else if (eventIndex === events.length - 1) {
                    style.borderRadius = '0 0 4px 4px';
                    style.marginTop = '10px';
                } else {
                    style.borderRadius = 0;
                    style.marginTop = '10px';
                }
            }
        }

        return {
            style: style,
        };
    };

    return (
        <div className="calendar-container">
            <div className="calendar-view">
                <Calendar
                    localizer={localizer}
                    events={dataEvents}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500, margin: '30px' }}
                    onSelectSlot={handleSelectSlot}
                    onSelectEvent={handleSelectEvent}
                    selectable
                    eventPropGetter={eventStyleGetter}
                />
            </div>
            {showEventForm && (
                <div className="event-form-overlay">
                    <EventForm
                        event={selectedEvent}
                        onSubmit={handleEventSubmit}
                        onClose={handleCloseEventForm}
                        onCompleteEvent={handleCompleteEvent}
                    />
                </div>
            )}
        </div>
    );
};

const EventForm = ({ event, onSubmit, onClose, onCompleteEvent }) => {
    const [title, setTitle] = useState(event.title || '');
    const [description, setDescription] = useState(event.description || '');
    const [start, setStart] = useState(event.start || new Date());
    const [end, setEnd] = useState(event.end || new Date());

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedEvent = {
            ...event,
            title,
            description,
            start,
            end,
        };
        onSubmit(updatedEvent);
    };

    const handleComplete = () => {
        onCompleteEvent(event.id);
        onClose();
    };

    return (
        <div className="event-form-container">
            <div className="event-form-content">
                <h2>{event.id ? 'Edit Event' : 'Add Event'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="start">Start Date</label>
                        <input
                            type="datetime-local"
                            id="start"
                            value={start.toISOString().slice(0, 16)}
                            onChange={(e) => setStart(new Date(e.target.value))}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="end">End Date</label>
                        <input
                            type="datetime-local"
                            id="end"
                            value={end.toISOString().slice(0, 16)}
                            onChange={(e) => setEnd(new Date(e.target.value))}
                            required
                        />
                    </div>
                    <div className="form-buttons">
                        <button type="submit" className="submit-button">
                            Add Event
                            {/*{event.id ? 'Update Event' : 'Add Event'}*/}
                        </button>
                        {event.id && !event.completed && (
                            <button type="button" className="complete-button" onClick={handleComplete}>
                                Complete
                            </button>
                        )}
                        <button type="button" className="close-button" onClick={onClose}>
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Calendar1;
