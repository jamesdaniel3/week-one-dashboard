import {Link} from "react-router-dom";
import '../styles/Navbar.css';
import fetchEvents from "../utils/fetchEvents";
import sortEvents from "../utils/filterRecentEvents"
import {useEffect, useState} from "react";

export default function NavBar(){
    const [recentEvents, setRecentEvents] = useState([]);

    useEffect(() => {
        const getEvents = async () => {
            const eventsList = await fetchEvents();
            const sortedEvents = sortEvents(eventsList);
            setRecentEvents(sortedEvents);
        };
        getEvents();
    }, []);

    return (
            <>
                <div className="main">
                    <div className="navbar-header">
                        <span className="title">
                            T.J School
                        </span>
                    </div>
                    <Link className="navbar-link" to={"/"}>
                        <span>
                            Home
                        </span></Link>
                    <Link className="navbar-link" to={"/calendar"}>
                        <span>
                            Calendar
                        </span></Link>
                    <Link className="navbar-link" to={"/directory"}>
                        <span>
                            Directory
                        </span></Link>
                    <div className="navbar-highlights">
                        <h4>Upcoming Events</h4>
                        <div className="navbar-highlights">
                            <ul>
                                {recentEvents.map((event, index) => {
                                    let eventDate;
                                    if (event.date) {
                                        eventDate = new Date(event.date);
                                    } else if (event.start) {
                                        eventDate = new Date(event.start.split('T')[0]);
                                    }

                                    return (
                                        <li key={index}>
                                            <span>{event.title}, {event.name}</span>
                                            <span>{eventDate ? eventDate.toDateString() : ''}</span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                    </div>
                </div>
            </>
    )
}

