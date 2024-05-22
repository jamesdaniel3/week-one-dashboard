import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import EventModal from './CreateEventModal.jsx';
import { db } from '../firebase.js';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import '../styles/Calendar.css';

/*
 Event Object Format:
 {
    title: 'Event Title',
    allDay: false,
    start: '<YEAR>-<MONTH>-<DAY><TIMEZONE><HOUR>:<MINUTE>:<SECOND>',
    end: '<YEAR>-<MONTH>-<DAY><TIMEZONE><HOUR>:<MINUTE>:<SECOND>'
 }
  {
    title: 'Event Title',
    allDay: true,
    date: '<YEAR>-<MONTH>-<DAY>'
 }
 */

export default function Calendar() {
    const [events, setEvents] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            const querySnapshot = await getDocs(collection(db, 'events'));
            const eventsData = querySnapshot.docs.map(doc => doc.data());
            setEvents(eventsData);
        };

        fetchEvents();
    }, []);

    const handleDateClick = (info) => {
        setSelectedDate(info.date);
        setModalOpen(true);
    };

    const handleSaveEvent = async (event) => {
        try {
            await addDoc(collection(db, 'events'), event);
            setEvents((prevEvents) => [...prevEvents, event]);
        } catch (error) {
            console.error('Error adding document: ', error);
        }
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
        </div>
    );
}