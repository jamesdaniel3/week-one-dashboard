import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, ListGroup } from 'react-bootstrap';
import { collection, getDocs, query, where, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase";

const AddStudentModal = ({ courseId, show, handleClose }) => {
    const [students, setStudents] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchStudents = async () => {
            const studentsRef = collection(db, "students");
            const q = query(studentsRef);
            const querySnapshot = await getDocs(q);
            const allStudents = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setStudents(allStudents);
        };

        fetchStudents();
    }, []);

    const handleAddStudents = async () => {
        for (let student of selectedStudents) {
            const studentRef = doc(db, "students", student.id);
            const courseRef = db.collection('courses').doc(courseId);
            await updateDoc(courseRef, {
                students: arrayUnion(studentRef)
            });
        }
        handleClose();
    };
    
    // const handleAddStudents = (students) => {
    //     const addStudentToCourse = async (courseId, studentId) => {
    //         try {
    //           const courseRef = db.collection('courses').doc(courseId);
    //           await courseRef.update({
    //             students: firebase.firestore.FieldValue.arrayUnion(studentId)
    //           });
      
    //           console.log('Student added successfully');
    //         } catch (error) {
    //           // Handle any errors that occur during the process
    //           console.error('Error adding student to course:', error);
    //         }
    //       };
    //     students.forEach(student => {
    //         const studentId = student.id
    //         addStudentToCourse(courseId, studentId)
    //     });
    // };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleCheckboxChange = (student) => {
        if (selectedStudents.includes(student)) {
            setSelectedStudents(selectedStudents.filter(s => s !== student));
        } else {
            setSelectedStudents([...selectedStudents, student]);
        }
    };

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.student_number.includes(searchQuery)
    );

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Students</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Search by name or student number</Form.Label>
                        <Form.Control type="text" placeholder="Search" value={searchQuery} onChange={handleSearch} />
                    </Form.Group>
                </Form>
                <ListGroup>
                    {filteredStudents.map(student => (
                        <ListGroup.Item key={student.id}>
                            <Form.Check 
                                type="checkbox"
                                label={`${student.name} (${student.student_number})`}
                                checked={selectedStudents.includes(student)}
                                onChange={() => handleCheckboxChange(student)}
                            />
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                <Button variant="primary" onClick={handleAddStudents}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddStudentModal;
