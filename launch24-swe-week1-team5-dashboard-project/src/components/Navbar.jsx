import {Link} from "react-router-dom";
import '../styles/Navbar.css';

export default function NavBar(){
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

