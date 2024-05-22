import NavBar from "../components/Navbar.jsx";
import DirectoryRow from "../components/DirectoryRow.jsx";
import fetchStudents from "../utils/fetchStudents";


import "../styles/Dashboard.css";

const entry = {
    'firstname': 'Elliott',
    'lastname': 'Hansen',
    'phonenumber': '(804) 210-9804',
    'email': 'elliott@redvw.com',
    'status': 'Faculty',
    'address': '1111 Jane St. Charlottesville, VA'
}

const entry2 = {
    'firstname': 'Bob',
    'lastname': 'Franklin',
    'phonenumber': '(804) 111-1111',
    'email': 'bob@gmail.com',
    'status': 'Student',
    'address': '1111 Jane St. Charlottesville, VA'
}

const students = await fetchStudents();
console.log(students);

const Main = () => (

    <>
        <div className="main-home">
            <NavBar />
            <div className="dash-body">
                <div className="dash-header">
                    <h1>Directory</h1>
                </div>
                <div className="directory-body">
                    <div className="directory-column">
                        <div className="directory-row legend">
                            <span className="field name"> Name </span>
                            <span className="field status"> Status </span>
                            <span className="field phone"> Phone </span>
                            <span className="field address"> Address </span>
                            <span className="field email"> Email </span>
                        </div>
                        
                        { students.map((item, index) => {
                            return(
                                <DirectoryRow entry={item} index={index}/>
                            )
                        }) }

                        {/* <DirectoryRow entry={entry} />
                        <DirectoryRow entry={entry2} oddrow={true}/> */}
                    </div>
                </div>
            </div>
        </div>
    </>
);

export default Main;