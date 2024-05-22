import NavBar from "../components/Navbar.jsx";
import '../styles/Directory.css';
import DirectoryTable from '../components/DirectoryTable.jsx';

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

const Main = () => {
    return (
        <>
            <NavBar />
            <DirectoryTable />
            {/* <div className = "DirContainer">
                <div className = "row">
                    <div className = "col-sm-3">
                        Fake Nav Bar
                    </div>

                    <div className = "col-sm-9">
    
                        <h1>Directory</h1>
                        <br></br>
                        <h2>Students</h2>

                        <div className="row">
                            <div className="col-sm-2"><strong>Name</strong></div>
                            <div className="col-sm-1"><strong>Exam 1</strong></div>
                            <div className="col-sm-1"><strong>Exam 2</strong></div>
                            <div className="col-sm-1"><strong>Exam 3</strong></div>
                            <div className="col-sm-2"><strong>Final Exam</strong></div>
                            <div className="col-sm-2"><strong>Overall Grade</strong></div>
                        </div>

                        {students.map((student,index) => (
                            <div key={student.id} className={`row ${index % 2 === 0 ? 'even' : 'odd'}`}>
                                <div className="col-sm-2">{student.name}</div>
                                <div className="col-sm-1">{student.exam1}</div>
                                <div className="col-sm-1">{student.exam2}</div>
                                <div className="col-sm-1">{student.exam3}</div>
                                <div className="col-sm-2">{student.finalExam}</div>
                                <div className="col-sm-2">{student.overallGrade}</div>
                                <div className="col-sm-2">
                                    <button className = "remove"> Remove Student</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div> */}
        </>
    );
};

export default Main;