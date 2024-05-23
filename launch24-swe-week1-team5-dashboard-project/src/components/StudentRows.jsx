import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from "firebase/firestore";
import fetchStudents from "../utils/fetchStudents.js";

export default function StudentRows(){

    const [course, setCourse] = useState(null);
    const [students, setStudents] = useState({});
    const [studentFinalGrades, setStudentFinalGrades] = useState({});

    useEffect(() => {
        const getStudents = async () => {
            const studentList = await fetchStudents();
            setStudents(studentList);
            console.log(studentList);
        };
        getStudents();
    }, []);

    return(
        <>
            {students.student_number}
        </>
    );
}


// import React, { useState, useEffect } from 'react';
// import { collection, query, where, getDocs } from "firebase/firestore";
// import { db } from "../firebase";
// import { useParams } from 'react-router-dom';

// const StudentRow = () => {
//     const { courseId } = useParams();
//     const [course, setCourse] = useState(null);
//     const [gradesByStudent, setGradesByStudent] = useState({});
//     const [studentFinalGrades, setStudentFinalGrades] = useState({});

//     useEffect(() => {
//         const fetchCourse = async () => {
//             // Fetch course data
//             const courseData = await fetchCourse(courseId);
//             setCourse(courseData);
//         };

//         const getStudentGrades = async () => {
//             if (!course || !course.students) return; // Ensure course data and students array are available
//             const studentsIds = course.students; // Assuming course.students is an array of student IDs

//             try {
//                 // Now, let's iterate through the grades collection and filter based on student ID and course ID
//                 const gradesCollection = collection(db, "grades");
//                 const gradesQuery = query(
//                     gradesCollection,
//                     where("course_id", "==", courseId) // Assuming courseId is available
//                 );

//                 const gradesSnapshot = await getDocs(gradesQuery);
//                 const gradesData = gradesSnapshot.docs.map(doc => ({
//                     id: doc.id,
//                     ...doc.data()
//                 }));

//                 // Filter grades for the current course and students
//                 const filteredGrades = gradesData.filter(grade => {
//                     return studentsIds.includes(grade.student_id);
//                 });

//                 // Now, organize the data in rows of students' names and their associated grades
//                 const studentGradesRows = studentsIds.map(studentId => {
//                     const studentGrades = filteredGrades.filter(grade => grade.student_id === studentId);
//                     const studentName = ""; // You need to retrieve the student name here
//                     return (
//                         <div key={studentId} className={`row ${studentId % 2 === 0 ? 'even' : 'odd'}`}>
//                             <div className="col-sm-2">{studentName}</div>
//                             {studentGrades.map((grade, gradeIndex) => (
//                                 <div key={gradeIndex} className="col-sm-2">{grade.grade}</div>
//                             ))}
//                             <div className="col-sm-2">{studentFinalGrades[studentName]}</div>
//                         </div>
//                     );
//                 });
            

//           // Update the state with generated JSX elements
//           setGradesByStudent(studentGradesRows);
//         } catch (error) {
//             console.error("Error fetching grades:", error);
//         }
//     };

//         fetchCourse();
//         getStudentGrades();
//     }, [courseId, course]); // Ensure useEffect runs when courseId or course changes

//     return (
//         <div>
//             {gradesByStudent}
//         </div>
//         );
//     };

// export default StudentRow;
