import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import EventModal from './CreateEventModal';
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
    const [events, setEvents] = useState([
        { title: 'Event 1', allDay: false, start: '2024-05-21T14:30:00', end: '2024-05-21T17:30:00' },
        { title: 'Event 2', allDay: true, date: '2024-05-22' }
    ]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateClick = (info) => {
        setSelectedDate(info.date);
        setModalOpen(true);
    };

    const handleSaveEvent = (event) => {
        setEvents((prevEvents) => [...prevEvents, event]);
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