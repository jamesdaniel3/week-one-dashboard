import { collection, query, where, getDocs, doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import { db } from "../firebase";
import "../styles/StudentRows.css"


export default function StudentRowsColumn({grades_id, grades, grade_title}) {   
    const [fieldData, setFieldData] = useState(grades[0].assignments[grade_title])
    const [dataChanged, setDataChanged] = useState(false);

    const saveToDatabase = async () => {
        var assignments_data = grades[0].assignments
        assignments_data[grade_title] = parseInt(fieldData);
        const student_grade_data = await getDoc(doc(db, 'grades', grades_id));
        if (student_grade_data) {
            console.log("UPDATING DB DATA");
            await updateDoc(student_grade_data.ref, {
                'assignments': assignments_data
            })
        }
        setDataChanged(false);
    }
    
    return (
        <>
            <textarea value={fieldData} className='student-row-column' onChange={(e) => {
                setFieldData(e.target.value);
                if(!dataChanged) {
                    console.log('data changed!');
                    setDataChanged(true);
                }
                }}>
            </textarea>
            
            {dataChanged &&
                <IconButton size="small" onClick={saveToDatabase}>
                    <CheckIcon/>
                </IconButton>
            }
        </>
    )
}