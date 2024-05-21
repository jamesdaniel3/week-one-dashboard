import NavBar from "../components/Navbar.jsx";
import { CourseCard } from '../components/CourseCard'
import "../styles/Dashboard.css";
import "../styles/Home.css";

const Main = () => {
    var course = {
        "color": "blue",
        "route": "",
        "title":"Calculus II",
        "category":"MATH",
        "id": "2140",
        "enrollment": 0,
        "enrollment_cap": 100,
        "image":"src/assets/testimg.jpg",
        "avg_grade":86.0,
        "desc":"Calculus II is an exploration of deeper and more advanced mathematics. Students in this course will learn everything ranging from simple derivation to much more advanced integration methods.",
    }
    return (
        <>
            <div className="main-home">
                <NavBar />
                <div className="dash-body">
                    <div className="dash-header">
                        <h1>Good Morning, NAME!</h1>
                    </div>
                    <div className="courses-row">
                        <CourseCard course={course}/>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Main;