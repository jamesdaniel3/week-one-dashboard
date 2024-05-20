import {Link} from "react-router-dom";

export default function NavBar(){
    return (
            <>
                <Link to={"/"}>Home</Link>
                <Link to={"/calendar"}>Calendar</Link>
                <Link to={"/directory"}>Directory</Link>
            </>
    )
}

