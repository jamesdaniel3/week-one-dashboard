import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import CircularProgress from "../components/CircularProgress.jsx";
import NavBar from "../components/Navbar.jsx";
import '../styles/Course.css';
import fetchCourses from "../utils/fetchCourses";
import fetchStudents from "../utils/fetchStudents";

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

    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const coursesList = await fetchCourses();
            setCourses(coursesList);

            const studentsList = await fetchStudents();
            setStudents(studentsList);

        };
        fetchData();
    }, []);

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
                                    <div className="col-sm-1"><strong>Exam 1</strong></div>
                                    <div className="col-sm-1"><strong>Exam 2</strong></div>
                                    <div className="col-sm-1"><strong>Exam 3</strong></div>
                                    <div className="col-sm-2"><strong>Final Exam</strong></div>
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