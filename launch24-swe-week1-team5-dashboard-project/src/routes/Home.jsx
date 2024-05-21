import React from 'react';
import NavBar from "../components/Navbar.jsx";
import { CourseCard } from '../components/CourseCard';
import '../styles/Home.css'; // Ensure this line is added

const Home = () => {
  const course1 = {
    "color": "pink",
    "route": "",
    "title": "Calculus II",
    "category": "MATH",
    "id": "2140-1",
    "enrollment": 0,
    "enrollment_cap": 100,
    "image": "src/assets/testimg.jpg",
    "avg_grade": 100.0,
    "desc": "Calculus II is an exploration of deeper and more advanced mathematics. Students in this course will learn everything ranging from simple derivation to much more advanced integration methods.",
  };

  const course2 = {
    "color": "blue",
    "route": "",
    "title": "Physics I",
    "category": "PHYS",
    "id": "2140-2",
    "enrollment": 0,
    "enrollment_cap": 100,
    "image": "src/assets/testimg.jpg",
    "avg_grade": 87.0,
    "desc": "Physics I is an introduction to classical mechanics. Students in this course will learn about motion, forces, energy, and momentum.",
  };

  return (
    <>
      <NavBar />
      <div className="course-list">
        <CourseCard course={course1} courseId={course1.id} />
        <CourseCard course={course2} courseId={course2.id} showProgress={true} />
      </div>
    </>
  );
};

export default Home;
