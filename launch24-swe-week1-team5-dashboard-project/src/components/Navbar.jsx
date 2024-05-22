import {Link} from "react-router-dom";
import '../styles/Navbar.css';
import React, { useEffect, useState } from "react";


export default function NavBar() {
    const [hidden, setHidden] = useState('');

    const hideNav = () => {
        console.log("HIDING");
        if (hidden == '') {
            setHidden('hidden');
        }
        else {
            setHidden('');
        }
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
                </div>
            </>
    )
}

