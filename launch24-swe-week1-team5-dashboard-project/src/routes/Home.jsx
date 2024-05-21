// Main.jsx
import React, { useEffect, useState } from "react";
import NavBar from "../components/Navbar.jsx";
import { CourseCard } from '../components/CourseCard';
import "../styles/Dashboard.css";
import "../styles/Home.css";
import fetchCourses from "../utils/fetchCourses";
import {auth} from '../firebase.js';

const Main = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const getCourses = async () => {
            console.log('trying')
            const coursesList = await fetchCourses();
            setCourses(coursesList);
        };
        getCourses();
    }, []);

    return (
        <>
            <div className="main-home">
                <NavBar/>
                <div className="dash-body">
                    <div className="dash-header">
                        <h1>Good Morning, {auth.currentUser.email}</h1>
                    </div>
                    <div className="courses-row">
                        {courses.map(course => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Main;