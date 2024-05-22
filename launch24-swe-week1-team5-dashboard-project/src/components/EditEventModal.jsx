import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';

Modal.setAppElement('#root');

/*TODO:
    - create modal where users can edit an event (change time and delete)
 */


const EditEventModal = ({ isOpen, onRequestClose, event, onSave, onDelete }) => {
    return (
        <>
        </>
    );
};

export default EditEventModal;