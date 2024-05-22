import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import '../styles/Calendar.css'

export default function Calendar() {
    const [events, setEvents] = useState([
        { title: 'Event 1', date: '2024-05-21' },
        { title: 'Event 2', date: '2024-05-22' }
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
        </div>
    );
}