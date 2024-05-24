import NavBar from "../components/Navbar.jsx";
import Calendar from "../components/Calendar.jsx";
import React from "react";
import "../styles/CalendarPage.css";

const Main = () => {
    return (
        <>
            <div className="main-home">
                <NavBar/>
                <div className="dash-body">
                    <div className="dash-header">
                        <h1> Calendar</h1>
                    </div>
                    <div className="main-calendar">
                        <Calendar />
                    </div>
                </div>
            </div>
        </>
    )
};

export default Main;