import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "../components/Navbar.jsx";
import '../styles/Directory.css';
import DirectoryTable from '../components/DirectoryTable.jsx';


const StudentList = () => {
    // State to store the list of students
    // const [students, setStudents] = useState([
    //     { id: 1, name: 'Alice', exam1: 85, exam2: 90, exam3: 78, finalExam: 88, overallGrade: 85.25 },
    //     { id: 2, name: 'Bob', exam1: 75, exam2: 80, exam3: 70, finalExam: 82, overallGrade: 76.75 },
    //     { id: 3, name: 'Charlie', exam1: 95, exam2: 85, exam3: 92, finalExam: 91, overallGrade: 90.75 },
    //     { id: 4, name: 'Sammy Smith', exam1: 88, exam2: 92, exam3: 85, finalExam: 90, overallGrade: 88.75 },
    //     { id: 5, name: 'Jamie Joe', exam1: 82, exam2: 79, exam3: 88, finalExam: 85, overallGrade: 83.5 },
    //     { id: 6, name: 'John Smith', exam1: 90, exam2: 85, exam3: 87, finalExam: 89, overallGrade: 87.75 },
    //     { id: 7, name: 'Jane Doe', exam1: 78, exam2: 82, exam3: 80, finalExam: 84, overallGrade: 81 },
    //     { id: 8, name: 'Josh Jameson', exam1: 93, exam2: 88, exam3: 90, finalExam: 95, overallGrade: 91.5 },
    //     { id: 9, name: 'Daniel Smith', exam1: 85, exam2: 90, exam3: 88, finalExam: 92, overallGrade: 88.75 },
    //     { id: 10, name: 'Julia Roberts', exam1: 89, exam2: 85, exam3: 90, finalExam: 88, overallGrade: 88 },
    //     { id: 11, name: 'Justice Truth', exam1: 80, exam2: 83, exam3: 85, finalExam: 87, overallGrade: 83.75 },
    //     { id: 12, name: 'Hunter Fisher', exam1: 92, exam2: 88, exam3: 85, finalExam: 90, overallGrade: 88.75 },
    //     { id: 13, name: 'Frankie Barns', exam1: 78, exam2: 82, exam3: 80, finalExam: 84, overallGrade: 81 },
    //     { id: 14, name: 'Johnny Appleseed', exam1: 85, exam2: 90, exam3: 92, finalExam: 91, overallGrade: 89.5 },
    //     { id: 15, name: 'Jimmy Joe', exam1: 82, exam2: 88, exam3: 85, finalExam: 89, overallGrade: 86 },
    //     { id: 16, name: 'Billy Bob', exam1: 90, exam2: 85, exam3: 87, finalExam: 89, overallGrade: 87.75 },
    // ]);

    // Function to add students including the database

    // Function to remove students including the database

    return (
        <>
            <div>
                <NavBar />
                <DirectoryTable />
            </div>
        </>
    );
};

export default StudentList;