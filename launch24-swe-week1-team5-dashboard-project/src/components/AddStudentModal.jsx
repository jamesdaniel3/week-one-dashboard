import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, ListGroup } from 'react-bootstrap';
import { collection, getDocs, query, where, doc, getDoc, addDoc, updateDoc, arrayUnion } from "firebase/firestore";
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

    const getAssignmentsForCourse = async (courseId) => {
        try {
          const courseDoc = await getDoc(doc(db, 'courses', courseId))
          if (courseDoc) {
            const assignments = courseDoc.data().assignments;
            return assignments;
          } else {
            console.log('Course document not found');
            return [];
          }
        } catch (error) {
          console.error('Error getting course document:', error);
          return [];
        }
      };

    const handleAddStudents = async () => {
        for (let student of selectedStudents) {
            const studentRef = doc(db, "students", student.id);
            const courseRef = doc(db, "courses", courseId);
            const gradesRef = collection(db, "grades");
            const q = query(gradesRef, where("course_id", "==", courseId));
            const querySnapshot = await getDocs(q);
            const grades = {};
            querySnapshot.forEach((doc) => {
                const gradeData = doc.data();
                for (const assignment of Object.keys(gradeData.assignments)) {
                    grades[assignment] = null;
                }
            });

            await addDoc(collection(db, 'grades'), {
                'student_id': student.id,
                'course_id': courseId,
                'assignments': grades,
            });
            await updateDoc(courseRef, {
                students: arrayUnion(student.id)
            });
        }
        handleClose();
    };

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
