import {Link, useNavigate} from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import '../styles/Navbar.css';
import React, { useEffect, useState } from "react";
import {auth} from "../firebase.js";


export default function NavBar() {
    const [hidden, setHidden] = useState('');
    const navigate = useNavigate();

    const hideNav = () => {
        console.log("HIDING");
        if (hidden == '') {
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
                <button>
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

