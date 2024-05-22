import React, { useState, useEffect } from 'react';
// calendar
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
// modals
import EventModal from './CreateEventModal';
import EditEventModal from './EditEventModal';
// firebase
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
// functions
import fetchEvents from "../utils/fetchEvents.js";
// style
import '../styles/Calendar.css';


export default function Calendar() {
    const [events, setEvents] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        const getEvents = async () => {
            const eventsList = await fetchEvents();
            setEvents(eventsList);
        };
        getEvents();
    }, []);

    const handleDateClick = (info) => {
        setSelectedDate(info.date);
        setModalOpen(true);
    };

    const handleEventClick = (info) => {
        setSelectedEvent(info.event);
        setEditModalOpen(true);
    };

    const handleSaveEvent = async (event) => {
        try {
            const docRef = await addDoc(collection(db, 'events'), event);
            setEvents((prevEvents) => [...prevEvents, { id: docRef.id, ...event }]);
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    };

    const handleUpdateEvent = (updatedEvent) => {
        setEvents((prevEvents) =>
            prevEvents.map((event) => (event.id === updatedEvent.id ? updatedEvent : event))
        );
    };

    const handleDeleteEvent = (eventId) => {
        setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
    };

    return (
        <div className="Calendar">
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                events={events}
                dateClick={handleDateClick}
                eventClick={handleEventClick}
                editable={true}
                droppable={true}
                style={{
                    border: 0,
                    width: '100%',
                    height: '100%',
                }}
            />
            <EventModal
                isOpen={modalOpen}
                onRequestClose={() => setModalOpen(false)}
                onSave={handleSaveEvent}
                selectedDate={selectedDate}
            />
            <EditEventModal
                isOpen={editModalOpen}
                onRequestClose={() => setEditModalOpen(false)}
                event={selectedEvent}
                onSave={handleUpdateEvent}
                onDelete={handleDeleteEvent}
            />
        </div>
    );
}