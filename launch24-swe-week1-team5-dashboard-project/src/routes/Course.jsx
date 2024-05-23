import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import CircularProgress from "../components/CircularProgress.jsx";
import NavBar from "../components/Navbar.jsx";
import '../styles/Course.css';
import fetchCourses from "../utils/fetchCourses";
import fetchStudents from "../utils/fetchStudents";
import {useParams} from "react-router-dom";
import {collection, doc, getDoc, getDocs, query, where} from "firebase/firestore";
import { db } from "../firebase";

const averageScore = 90;

const calculateLetterGrade = (average) => {
    if (average >= 90) return 'A';
    if (average >= 80) return 'B';
    if (average >= 70) return 'C';
    if (average >= 60) return 'D';
    return 'F';
  };

const letterGrade = calculateLetterGrade(averageScore);

const Main = () => {

    const { courseId } = useParams(); // Extract course ID from URL
    const [course, setCourse] = useState(null);
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchCourse = async (courseId) => {
            const courseDocRef = doc(db, "courses", courseId);
            const courseDocSnap = await getDoc(courseDocRef);

            if (!courseDocSnap.exists()) {
                console.log("No such course!");
                return;
            }

            const courseData = courseDocSnap.data();
            const studentIds = courseData.students;

            // Initialize an empty object for student names keyed by their IDs
            let studentNamesById = {};

            for (const studentId of studentIds) {
                const studentDocRef = doc(db, "students", studentId);
                const studentDocSnap = await getDoc(studentDocRef);

                if (studentDocSnap.exists()) {
                    // Assign the student's name to their ID in the object
                    studentNamesById[studentId] = studentDocSnap.data().name;
                } else {
                    console.log(`No such student with ID: ${studentId}`);
                }
            }

            // Set the course state with course data and include the studentNamesById
            setCourse({ ...courseData });
            setStudents(studentNamesById)
        };

        if (courseId) {
            fetchCourse(courseId);
        }
    }, [courseId]);

    console.log(students)
    console.log(course)

    // console.log("HERE")
    // console.log(students)
    // console.log(course)


    //remove student from the class
    //add students to the class

    //remove assignments
    //add assignmnets

    //edit student grades for each assignment
    const courseTitle = "AP Calculus";
    return (
        <>
            <div className = "DirContainer">
                <div className = "row">
                    <div className = "col-sm-3">
                    <NavBar />
                    </div>
                    
                    <div className = "col-sm-9">
                    <div className="course-banner d-flex justify-content-between align-items-center">
                        <h1>{courseTitle}</h1>
                        <CircularProgress percentage={averageScore} letterGrade={letterGrade} />

                    </div>
                                <center><div className = "Roster" >Roster</div></center>

                                <div className = "SecondHeader"><span className = "Students">Students</span> <button className = "add">Add Student</button></div>

                                <div className = "col-sm-6"></div>
                                
                                <div className="row">
                                    <div className="col-sm-2"><strong>Name</strong></div>
                                    <div className="col-sm-2"><strong>Overall Grade</strong></div>
                                </div>

                                {students.map((student,index) => (
                                    <div key={student.id} className={`row ${index % 2 === 0 ? 'even' : 'odd'}`}>
                                        <div className="col-sm-2">{student.Name}</div>
                                        <div className="col-sm-1">{student.Calculus.Exam1}</div>
                                        <div className="col-sm-1">{student.Calculus.Exam2}</div>
                                        <div className="col-sm-1">{student.Calculus.Exam3}</div>
                                        <div className="col-sm-2">{student.Calculus.Exam4}</div>
                                        <div className="col-sm-2">
                                            {((student.Calculus.Exam1 + student.Calculus.Exam2 + student.Calculus.Exam3 + student.Calculus.Exam4) / 4).toFixed(2)}
                                        </div>
                                        <div className="col-sm-2">
                                            <button className = "remove"> Remove Student</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
            </div>
        </>
    );
};

export default Main;