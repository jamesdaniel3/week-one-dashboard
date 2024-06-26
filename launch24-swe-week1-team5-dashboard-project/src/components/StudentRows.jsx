import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, getDoc, doc } from "firebase/firestore";
import fetchStudents from "../utils/fetchStudents.js";
import StudentRowsColumn from './StudentRowsColumn.jsx';
import { db } from "../firebase";
import '../styles/StudentRows.css';

export default function StudentRows({student, courseId, finalGrade}) {

    const [course, setCourse] = useState(null);
    const [students, setStudents] = useState({});
    const [studentFinalGrades, setStudentFinalGrades] = useState({});
    const [studentGrades, setStudentGrades] = useState([]);
    const [studentGradesId, setStudentGradesId] = useState(null);
    const [studentData, setStudentData] = useState(null);

    // useEffect(() => {
    //     const getStudents = async () => {
    //         const studentList = await fetchStudents();
    //         setStudents(studentList);
    //         console.log(studentList);
    //     };
    //     getStudents();
    // }, []);

    useEffect(() => {
        
        const getStudentGrades = async () => {
            const grades = await getDocs(query(collection(db, 'grades'), where('course_id', '==', courseId), where('student_id',  '==', student)));
            if(grades) {
                const grade_id = grades.docs.map(x => x.id);
                const ret_grades = grades.docs.map(x => x.data());
                setStudentGradesId(grade_id[0])
                setStudentGrades(ret_grades);
            }
        }

        const getStudentData = async () => {
            const student_data = await getDoc(doc(db, 'students', student));
            if(student_data) {
                setStudentData(student_data.data())
            }
        }
        getStudentGrades();
        getStudentData();

    }, []);
    if(studentGrades[0] && studentData) {
        return(
            <>
                <div className='student-row-body'>
                    <span className='student-row-static'>
                        {studentData.name}
                    </span>
                    {
                        Object.keys(studentGrades[0].assignments).sort().map((grade, i) => {
                            return <StudentRowsColumn grades_id={studentGradesId} grades={studentGrades} grade_title={grade}/>
                        })
                    }
                    <span className='student-row-static'>
                        {finalGrade}
                    </span>
                </div>
                
            </>
        );
    }
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
