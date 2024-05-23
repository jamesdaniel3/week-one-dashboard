import React, { useEffect, useState } from "react";
import NavBar from "../components/Navbar.jsx";
import { CourseCard } from '../components/CourseCard';
import { AddCourseCard } from '../components/AddCourseCard';
import "../styles/Dashboard.css";
import "../styles/Home.css";
import fetchCourses from "../utils/fetchCourses";
import {Link} from "react-router-dom";
import {auth} from '../firebase.js';
import { AddCourseModal } from '../components/AddCourseModal.jsx'

const Main = () => {

    const [courses, setCourses] = useState([]);
    const [userData, setUser] = useState('null')
    const [userDetails, setDetails] = useState('null');
    const [coursesGot, setCoursesGot] = useState(false);
    const [showModal, setShowModal] = useState(false);

        useEffect(() => {
            if(auth) {
                auth.onAuthStateChanged(async function(user) {
                    if(user) {
                        console.log("got user");
                        setUser(user)
                    }
                    else {
                        console.log('failed');
                    }
                })
            }
        }, [])

        // if(auth) {
        //     auth.onAuthStateChanged(async function(user) {
        //         if(user) {
        //             console.log("got user");
        //             setUser(user)
        //         }
        //         else {
        //             console.log('failed');
        //         }
        //     })
        // }

        const getCourses = async () => {
            if(userData.email && !coursesGot) {
                console.log('user is authenticated, getting courses for:',userData.email);
                const coursesList = await fetchCourses(userData.email);
                setCourses(coursesList);
                console.log(coursesList)
                setCoursesGot(true);
            }
            else {
                console.log("user not loaded");
            }
        }

        if (!coursesGot && userData) {
            getCourses();
        }

    const handleCloseModal = () => setShowModal(false);
    const handleOpenModal = () => setShowModal(true);
    

    return (
        <>
            <div className="main-home">
                <NavBar/>
                <div className="dash-body">
                    <div className="dash-header">
                        <h1>Home</h1>
                    </div>
                    <div className="courses-row">
                        {courses.map(course => (
                            <Link key={course.id} to={`/course/${course.id}`}>
                                <CourseCard course={course} />
                            </Link>
                                ))}
                        <AddCourseCard handleOpen={handleOpenModal}/>
                    </div>
                </div>
            </div>
            <AddCourseModal show={showModal} handleClose={handleCloseModal} user={userData.email}/>
        </>
);
};

export default Main;





