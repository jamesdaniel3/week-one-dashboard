import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap';
import CircularProgress from "../components/CircularProgress.jsx";
import NavBar from "../components/Navbar.jsx";
import StudentRow from '../components/StudentRows';
import '../styles/Course.css';
import '../styles/StudentRows.css';
import fetchTableInfo from "../utils/fetchTableInfo";
import calculateWeightedAverageGrades from "../utils/calculateStudentAverage";
import calculateAverageClassGrade from "../utils/calculateAverageClassGrade";
import AddProfessorModal from "../components/AddProfessorModal.jsx";
import { useParams } from "react-router-dom";
import { doc, getDoc, addDoc, collection, updateDoc, arrayUnion,} from "firebase/firestore";
import { db } from "../firebase";


const Main = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [gradesByStudent, setGradesByStudent] = useState({});
    const [studentFinalGrades, setStudentFinalGrades] = useState({});
    const [classAverage, setClassAverage] = useState(0);
    const [classGrade, setClassGrade] = useState('F');
    const [showModal, setShowModal] = useState(false);

    const [studentsInCourse, setStudentsInCourse] = useState(null);

    // a note about the add student button
        // I would implement it by taking in a student ID number (not the same as id, the field is student_id)
        // With that number, you should check if there exists a student who has that number whose id (not student id) is not in the students section of the course
            // note that the course info  can be accessed with the courseID field
        // If you don't find a student to add, just close the modal
        // If you do find a student to add, you will also have to create a document in the grades collection
            // If we make it so that grades can be updated just take all the assignments from the assignments field in class and assign all the grades as 0
            // If we don't make it so grades can be updated I'm not sure how feasible this is


    useEffect(() => {
        const getTableInfo = async () => {
            const infoList = await fetchTableInfo(courseId);
            const [courseData, , gradesByStudentData] = infoList;
            setCourse(courseData);
            setGradesByStudent(gradesByStudentData);
            const finalGrades = calculateWeightedAverageGrades(gradesByStudentData, courseData);
            setStudentFinalGrades(finalGrades);
            const [average, grade] = await calculateAverageClassGrade(finalGrades, courseId); // Ensure finalGrades is used
            setClassAverage(average);
            setClassGrade(grade);
        }
        getTableInfo();
    }, [courseId]);

    useEffect(() => {
        // function to get an array of students enrolled in this course (to display in the columns)
        const getStudentsInCourse = async () => {
            const docRef = await getDoc(doc(db, 'courses', courseId));
            if (docRef) {
                setStudentsInCourse(docRef.data().students);
            }
        }
        getStudentsInCourse();

    }, []);

    const handleCloseModal = () => setShowModal(false);

    if (gradesByStudent && studentsInCourse && studentFinalGrades != [] && course) {
        return (
            <>
                <div className="main-home">
                    <NavBar/>
                    <div className="dash-body">

                        <div className="dash-header">
                            <h1> Detailed View: {course.title} </h1>
                        </div>

                        {/* HEADER */}

                        <div className={"course-banner d-flex justify-content-between align-items-center "+course.color}>
                            <h1 className="course-title">{course?.title || "Loading course..."}</h1>
                            <CircularProgress percentage={classAverage} letterGrade={classGrade} />
                            {/* <Button onClick={() => setShowModal(true)}>Add Professor to Course</Button> */}
                        </div>

                        {/* BODY */}

                        <div className="course-details-body">
                                <div className="Roster">Roster</div>
                                <button className="add">Add Student</button>
                                {/* <div className="SecondHeader"><span className="Students">Students</span></div> */}
                                <div className="grades-body">

                                    <div className="student-row-body">
                                        <div className="student-row-static head">Name</div>
                                        {course?.assignments && Object.keys(course.assignments).sort().map((assignment, index) => (
                                        <div key={index} className="student-row-static head">{assignment}</div>
                                        ))}
                                        <div className="student-row-static head">Final Grade</div>
                                    </div>

                                    {
                                        studentsInCourse.map((student, key) => {
                                            return <StudentRow courseId={courseId} student={student} finalGrade={studentFinalGrades[student]}/>
                                        })
                                    }
                                    
                                    <Button className="add-instructor" onClick={() => setShowModal(true)}>Add Instructor to Course</Button>

                                </div>
                        </div>

                        {/* MODAL (EXISTS ON ITS OWN) */}
                        <AddProfessorModal courseId={courseId} show={showModal} handleClose={handleCloseModal} />


                    </div>
                </div>
            </>
        );
    }
    
};
export default Main;