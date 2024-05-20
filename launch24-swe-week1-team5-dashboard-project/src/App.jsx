import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { CourseCard } from './components/CourseCard'
import './App.css'

function App() {
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
      <CourseCard course={course}/>
    </>
  );
}

export default App
