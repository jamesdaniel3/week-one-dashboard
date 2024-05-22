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
            <h2>Delete Event?</h2>
            <form>
                <button type="button" onClick={handleDelete} style={{ backgroundColor: 'red' }}>
                    Delete Event
                </button>
                <button
                    type="button"
                    onClick={onRequestClose}
                    style={{ padding: '10px 20px', cursor: 'pointer' }}
                >
                    Cancel
                </button>
            </form>
        </Modal>
    );
};

export default EditEventModal;
