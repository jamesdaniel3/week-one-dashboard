import {Link, useNavigate} from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import '../styles/Navbar.css';
import React, { useEffect, useState } from "react";
import {auth} from "../firebase.js";
import fetchEvents from "../utils/fetchEvents.js";
import sortEvents from "../utils/filterRecentEvents"


export default function NavBar() {
    const [hidden, setHidden] = useState('');
    const navigate = useNavigate();
    const [recentEvents, setRecentEvents] = useState([]);

    useEffect(() => {
        const getEvents = async () => {
            const eventsList = await fetchEvents();
            const sortedEvents = sortEvents(eventsList);
            setRecentEvents(sortedEvents);
        };
        getEvents();
    }, []);

    const hideNav = () => {
        console.log("HIDING");
        if (hidden === '') {
            setHidden('hidden');
        }
        else {
            setHidden('');
        }
    }

    const logout = () => {
        console.log("signing out...")
        signOut(auth)
        .then(() => {navigate('/')})
    }

    if(auth) {
        auth.onAuthStateChanged(function(user) {
            if(user) {
                console.log('user logged in');
            }
            else {
                logout();
            }
        })
    }

    return (
            <>
                <button className="hide-button">
                    <img src="src\assets\edge.png" className={"hide-button "+hidden} onClick={hideNav}/>
                </button>
                <div className={"main "+hidden}>
                    <div className="navbar-header">
                        <span className="title">
                            T.J School
                        </span>
                    </div>
                    <Link className="navbar-link" to={"/home"}>
                        <span>
                            Home
                        </span>
                    </Link>
                    <Link className="navbar-link" to={"/calendar"}>
                        <span>
                            Calendar
                        </span>
                    </Link>
                    <Link className="navbar-link" to={"/directory"}>
                        <span>
                            Directory
                        </span>
                    </Link>
                    <div className="navbar-highlights">
                        <h4>Upcoming Events</h4>
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
                    <div className="navbar-link logout" onClick={logout}>
                        <span>
                            Logout
                        </span>
                    </div>
                </div>
            </>
    )
}

