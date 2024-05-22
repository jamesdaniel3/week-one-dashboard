// Main.jsx
import React, { useEffect, useState } from "react";
import {doc, collection, getDocs, getDoc} from "firebase/firestore";
import NavBar from "../components/Navbar.jsx";
import { CourseCard } from '../components/CourseCard';
import "../styles/Dashboard.css";
import "../styles/Home.css";
import fetchCourses from "../utils/fetchCourses";
import {auth, db} from '../firebase.js';

const Main = () => {
    const [courses, setCourses] = useState([]);
    const [userData, setUser] = useState('null')
    const [userDetails, setDetails] = useState('null');
    const [coursesGot, setCoursesGot] = useState(false);

    if(auth) {
        auth.onAuthStateChanged(function(user) {
            if(user) {
                setUser(user);
                getCourses();
            }
            else {
                console.log('failed');
            }
        })
    }

    const getCourses = async () => {
        if(userData.email && !coursesGot) {
            console.log('user is authenticated, getting courses for:',userData.email);
            const coursesList = await fetchCourses(userData.email);
            setCourses(coursesList);
            setCoursesGot(true);
        }
        else {
            console.log("user not loaded");
        }
    }

    return (
        <>
            <div className="main-home">
                <NavBar/>
                <div className="dash-body">
                    <div className="dash-header">
                        <h1>Good Morning {}</h1>
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