import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import CircularProgress from "../components/CircularProgress.jsx";
import NavBar from "../components/Navbar.jsx";
import '../styles/Course.css';
import fetchTableInfo from "../utils/fetchTableInfo";
import { useParams } from "react-router-dom";

const Main = () => {
    const { courseId } = useParams(); // Extract course ID from URL
    const [course, setCourse] = useState(null);
    const [gradesByStudent, setGradesByStudent] = useState({});

    useEffect(() => {
        const getTableInfo = async () => {
            const infoList = await fetchTableInfo(courseId);
            const [courseData, , gradesByStudentData] = infoList; // Skipping studentsData as it's not directly used
            setCourse(courseData);
            setGradesByStudent(gradesByStudentData);
        }
        getTableInfo();
    }, [courseId]);

    const averageScore = 90; // Placeholder for actual logic to calculate average score
    const letterGrade = calculateLetterGrade(averageScore);

    return (
        <>
            <div className="DirContainer">
                <div className="row">
                    <div className="col-sm-3">
                        <NavBar />
                    </div>
                    <div className="col-sm-9">
                        <div className="course-banner d-flex justify-content-between align-items-center">
                            <h1>{course?.title || "Loading course..."}</h1>
                            <CircularProgress percentage={averageScore} letterGrade={letterGrade} />
                        </div>
                        <center><div className="Roster">Roster</div></center>
                        <div className="SecondHeader"><span className="Students">Students</span> <button className="add">Add Student</button></div>
                        <div className="col-sm-6"></div>
                        <div className="row">
                            <div className="col-sm-2"><strong>Name</strong></div>
                            {course?.assignments && Object.keys(course.assignments).map((assignment, index) => (
                                <div key={index} className="col-sm-2"><strong>{assignment}</strong></div>
                            ))}
                        </div>
                        {Object.entries(gradesByStudent).map(([studentName, grades], index) => (
                            <div key={index} className={`row ${index % 2 === 0 ? 'even' : 'odd'}`}>
                                <div className="col-sm-2">{studentName}</div>
                                {Object.values(grades).map((grade, gradeIndex) => (
                                    <div key={gradeIndex} className="col-sm-2">{grade}</div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

function calculateLetterGrade(average) {
    if (average >= 90) return 'A';
    if (average >= 80) return 'B';
    if (average >= 70) return 'C';
    if (average >= 60) return 'D';
    return 'F';
}

export default Main;
