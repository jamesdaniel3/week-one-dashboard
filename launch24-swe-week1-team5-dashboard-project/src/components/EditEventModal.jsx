import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';

const EditEventModal = ({ isOpen, onRequestClose, event, onDelete }) => {
    const handleDelete = async () => {
        if (event && event.id) {
            await deleteDoc(doc(db, 'events', event.id));
            onDelete(event.id);
            onRequestClose();
        }
    };

    return (
        <Modal show={isOpen} onHide={onRequestClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Event</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this event?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onRequestClose}>Cancel</Button>
                <Button variant="danger" onClick={handleDelete}>Delete</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditEventModal;