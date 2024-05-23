import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase";

export const AddCourseModal = ({ courseId, show, handleClose, user }) => {

    const [courseTitle, setCourseTitle] = useState('');
    const [courseDesc, setCourseDesc] = useState('');
    const [courseID, setCourseID] = useState('');
    const [courseLimit, setCourseLimit] = useState(0);
    const [courseColor, setCourseColor] = useState('');

    const handleAddCourse = async () => {
        // code to add course to database
        if(courseTitle == '' || courseDesc == '' || courseID == '' || courseLimit == 0 || courseColor == '') {
            console.log('data not filled!');
        }
        const course = {
                'title': courseTitle,
                'desc': courseDesc,
                'ID': courseID,
                'limit': courseLimit,
                'color': courseColor,
                'professor': user,
        }
        console.log(course);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create a Course</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Course Title</Form.Label>
                        <Form.Control placeholder="Title" onChange={(e) => setCourseTitle(e.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Course Description</Form.Label>
                        <Form.Control placeholder="Description" onChange={(e) => setCourseDesc(e.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Course ID</Form.Label>
                        <Form.Control placeholder="Ex: 'MATH 100'" onChange={(e) => setCourseID(e.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Enrollment Limit</Form.Label>
                        <Form.Control placeholder="Ex: 100" onChange={(e) => setCourseLimit(e.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Course Color</Form.Label>
                        <Form.Select onChange={(e) => setCourseColor(e.target.value)}>
                            <option>blue</option>
                            <option>faintgreen</option>
                            <option>green</option>
                            <option>lilac</option>
                            <option>light red</option>
                            <option>orange</option>
                            <option>pink</option>
                            <option>red</option>
                            <option>yellow</option>
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                <Button variant="primary" onClick={handleAddCourse}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
};