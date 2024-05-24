import { collection, query, where, getDocs } from "firebase/firestore";

export default function StudentRowsColumn({student_id_db, grades, grade_title}) {    

    return (
        <>
            <textarea className='student-row-column'>

            </textarea>
        </>
    )
}