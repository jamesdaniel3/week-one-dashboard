import NavBar from "../components/Navbar.jsx";
import Calendar from "../components/Calendar.jsx";
import React from "react";
import "../styles/CalendarPage.css";

const Main = () => {
    return (
        <>
            <div className="main-calendar">
                <NavBar />
                <Calendar />
            </div>
        </>
    )
};

export default Main;