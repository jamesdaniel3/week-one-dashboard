import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase";

const AddProfessorModal = ({ courseId, show, handleClose }) => {
    const [professorEmail, setProfessorEmail] = useState('');

    const handleAddProfessor = async () => {
        const usersRef = doc(db, "users", professorEmail);
        const docSnap = await getDoc(usersRef);

        if (docSnap.exists() && !docSnap.data().courses_taught.includes(courseId)) {
            await updateDoc(usersRef, {
                courses_taught: arrayUnion(courseId)
            });
            handleClose();
        } else {
            handleClose();
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Enter the professor's email</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={(e) => setProfessorEmail(e.target.value)} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                <Button variant="primary" onClick={handleAddProfessor}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddProfessorModal;