import {Link} from "react-router-dom";
import '../styles/Navbar.css';
import fetchEvents from "../utils/fetchEvents";
import {useEffect, useState} from "react";
import * as events from "events";

function sortEvents(events){
    events.sort((a, b) => {
        let dateA, dateB;
        if (a.start) {
            dateA = new Date(a.start.split('T')[0]);
        } else if (a.date) {
            dateA = new Date(a.date);
        }

        if (b.start) {
            dateB = new Date(b.start.split('T')[0]);
        } else if (b.date) {
            dateB = new Date(b.date);
        }

        return dateA - dateB;
    });

    return events.slice(0, 5);
}

export default function NavBar(){
    const [recentEvents, setRecentEvents] = useState([]);

    useEffect(() => {
        const getEvents = async () => {
            const eventsList = await fetchEvents();
            const sortedEvents = sortEvents(eventsList);
            setRecentEvents(sortedEvents);
        };
        getEvents();
        console.log(recentEvents)
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

                    </div>
                </div>
            </>
    )
}

