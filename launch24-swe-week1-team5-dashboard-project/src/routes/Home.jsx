import NavBar from "../components/Navbar.jsx";
import { CourseCard } from '../components/CourseCard'
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
            <NavBar />
            <CourseCard course={course}/>
        </>
    )
};

export default Main;