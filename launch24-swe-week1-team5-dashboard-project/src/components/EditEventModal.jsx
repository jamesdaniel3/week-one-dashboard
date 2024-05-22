import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

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

const EditEventModal = ({ isOpen, onRequestClose, event, onSave, onDelete }) => {
    const [title, setTitle] = useState('');
    const [allDay, setAllDay] = useState(false);
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');

    useEffect(() => {
        if (event) {
            setTitle(event.title);
            setAllDay(event.allDay);
            setStart(event.start instanceof Date ? event.start.toISOString() : event.start || '');
            setEnd(event.end instanceof Date ? event.end.toISOString() : event.end || '');
        }
    }, [event]);

    const handleSave = () => {
        const updatedEvent = { ...event, title, allDay, start, end };
        onSave(updatedEvent);
        onRequestClose();
    };

    const handleDelete = () => {
        onDelete(event.id);
        onRequestClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Edit Event"
            style={customStyles}
        >
            <h2>Edit Event</h2>
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
                            onChange={(e) => {
                                setAllDay(e.target.checked);
                                if (e.target.checked) {
                                    setStart('');
                                    setEnd('');
                                }
                            }}
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
                                value={start ? start.split('T')[1] : ''}
                                onChange={(e) => setStart(`${start.split('T')[0]}T${e.target.value}`)}
                                style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                            />
                        </div>
                        <div>
                            <label>End Time:</label>
                            <input
                                type="time"
                                value={end ? end.split('T')[1] : ''}
                                onChange={(e) => setEnd(`${end.split('T')[0]}T${e.target.value}`)}
                                style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                            />
                        </div>
                    </>
                )}
                <button type="button" onClick={handleSave} style={{ marginRight: '10px' }}>
                    Save Changes
                </button>
                <button type="button" onClick={handleDelete} style={{ backgroundColor: 'red' }}>
                    Delete Event
                </button>
                <button type="button" onClick={onRequestClose}>
                    Cancel
                </button>
            </form>
        </Modal>
    );
};

export default EditEventModal;
