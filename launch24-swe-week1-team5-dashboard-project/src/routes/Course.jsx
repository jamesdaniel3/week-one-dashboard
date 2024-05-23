import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap';
import CircularProgress from "../components/CircularProgress.jsx";
import NavBar from "../components/Navbar.jsx";
import StudentRow from '../components/StudentRows';
import '../styles/Course.css';
import fetchTableInfo from "../utils/fetchTableInfo";
import calculateWeightedAverageGrades from "../utils/calculateStudentAverage";
import calculateAverageClassGrade from "../utils/calculateAverageClassGrade";
import AddProfessorModal from "../components/AddProfessorModal.jsx";
import { useParams } from "react-router-dom";

const Main = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [gradesByStudent, setGradesByStudent] = useState({});
    const [studentFinalGrades, setStudentFinalGrades] = useState({});
    const [classAverage, setClassAverage] = useState(0);
    const [classGrade, setClassGrade] = useState('F');
    const [showModal, setShowModal] = useState(false);

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
            console.log(course, gradesByStudent);
        }
        getTableInfo();
    }, [courseId]);

    const handleCloseModal = () => setShowModal(false);

    if (gradesByStudent) {
        return (
            <>
                <div className="DirContainer">
                    <div className="DirContainer">
                        <div className="row">
                            <div className="col-sm-3">
                                <NavBar />
                            </div>
                            <div className="col-sm-9">
                                <div className="course-banner d-flex justify-content-between align-items-center">
                                    <h1>{course?.title || "Loading course..."}</h1>
                                    <CircularProgress percentage={classAverage} letterGrade={classGrade} />
                                    <Button onClick={() => setShowModal(true)}>Add Professor to Course</Button>
                                </div>
                                <center><div className="Roster">Roster</div></center>
                                <div className="SecondHeader"><span className="Students">Students</span><button className="add">Add Student</button></div>
                                <div className="row">
                                    <div className="col-sm-2"><strong>Name</strong></div>
                                    {course?.assignments && Object.keys(course.assignments).map((assignment, index) => (
                                        <div key={index} className="col-sm-2"><strong>{assignment}</strong></div>
                                    ))}
                                    <div className="col-sm-2"><strong>Final Grade</strong></div>
                                </div>
                                {/* {Object.entries(gradesByStudent).map(([studentName, grades], index) => (
                                    <div key={index} className={`row ${index % 2 === 0 ? 'even' : 'odd'}`}>
                                        <div className="col-sm-2">{studentName}</div>
                                        {Object.values(grades).map((grade, gradeIndex) => (
                                            <div key={gradeIndex} className="col-sm-2">{grade}</div>
                                        ))}
                                        <div className="col-sm-2">{studentFinalGrades[studentName]}</div>
                                    </div>
                                ))} */}
                                <StudentRow />
                            </div>
                        </div>
                    </div>
                </div>
                <AddProfessorModal courseId={courseId} show={showModal} handleClose={handleCloseModal} />
            </>
        );
    }

    else {
        return (
            <>
                <div className="DirContainer">
                    <div className="DirContainer">
                        <div className="row">
                            <div className="col-sm-3">
                                <NavBar />
                            </div>
                            <div className="col-sm-9">
                                <div className="course-banner d-flex justify-content-between align-items-center">
                                    <h1>{course?.title || "Loading course..."}</h1>
                                    {/* <CircularProgress percentage={classAverage} letterGrade={classGrade} /> */}
                                    <Button onClick={() => setShowModal(true)}>Add Professor to Course</Button>
                                </div>
                                 <center><div className="Roster">Roster</div></center>
                                <div className="SecondHeader"><span className="Students">Students</span><button className="add">Add Student</button></div>
                                {/*<div className="row">
                                    <div className="col-sm-2"><strong>Name</strong></div>
                                    {course?.assignments && Object.keys(course.assignments).map((assignment, index) => (
                                        <div key={index} className="col-sm-2"><strong>{assignment}</strong></div>
                                    ))}
                                    <div className="col-sm-2"><strong>Final Grade</strong></div>
                                </div>
                                {Object.entries(gradesByStudent).map(([studentName, grades], index) => (
                                    <div key={index} className={`row ${index % 2 === 0 ? 'even' : 'odd'}`}>
                                        <div className="col-sm-2">{studentName}</div>
                                        {Object.values(grades).map((grade, gradeIndex) => (
                                            <div key={gradeIndex} className="col-sm-2">{grade}</div>
                                        ))}
                                        <div className="col-sm-2">{studentFinalGrades[studentName]}</div>
                                    </div>
                                ))} */}
                            </div>
                        </div>
                    </div>
                </div>
                <AddProfessorModal courseId={courseId} show={showModal} handleClose={handleCloseModal} />
            </>
        );
    }
    
};
export default Main;