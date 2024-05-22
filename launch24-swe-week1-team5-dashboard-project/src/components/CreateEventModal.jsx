import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

/*TODO:
    - prevent users from using conflicting times (start must be after end)
    - allow users to select date after clicking on a date?
    - style modal
 */

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '400px',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 999,
    },
};

const EventModal = ({ isOpen, onRequestClose, onSave, selectedDate }) => {
    const [title, setTitle] = useState('');
    const [allDay, setAllDay] = useState(false);
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');

    useEffect(() => {
        if (selectedDate) {
            const dateStr = selectedDate.toISOString().split('T')[0];
            setStart(`${dateStr}T00:00`);
            setEnd(`${dateStr}T01:00`);
        }
    }, [selectedDate]);

    const handleSave = () => {
        const event = allDay
            ? { title, allDay, date: selectedDate.toISOString().split('T')[0] }
            : { title, allDay, start: new Date(start).toISOString(), end: new Date(end).toISOString() };
        onSave(event);
        onRequestClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Add Event"
            style={customStyles}
        >
            <h2>Add Event</h2>
            <form>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                    />
                </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={allDay}
                            onChange={(e) => setAllDay(e.target.checked)}
                        />
                        All Day
                    </label>
                </div>
                {!allDay && (
                    <>
                        <div>
                            <label>Start Time:</label>
                            <input
                                type="time"
                                value={start.split('T')[1]}
                                onChange={(e) => setStart(`${start.split('T')[0]}T${e.target.value}`)}
                                style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                            />
                        </div>
                        <div>
                            <label>End Time:</label>
                            <input
                                type="time"
                                value={end.split('T')[1]}
                                onChange={(e) => setEnd(`${end.split('T')[0]}T${e.target.value}`)}
                                style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                            />
                        </div>
                    </>
                )}
                <button type="button" onClick={handleSave} style={{ marginRight: '10px' }}>
                    Create Event
                </button>
                <button type="button" onClick={onRequestClose}>
                    Cancel
                </button>
            </form>
        </Modal>
    );
};

export default EventModal;