import {collection, doc, updateDoc} from "firebase/firestore";
import {db} from "../firebase";

function calculateLetterGrade(average) {
    if (average >= 90) return 'A';
    if (average >= 80) return 'B';
    if (average >= 70) return 'C';
    if (average >= 60) return 'D';
    return 'F';
}

async function calculateAverageClassGrade(studentGrades, courseId){
    let count = 0;
    let sum = 0;
    for(const student in studentGrades){
        count++;
        sum += studentGrades[student];
    }

    const average = sum/count;
    const letterGrade = calculateLetterGrade(average);

    // update avg.grade based on courseId
    const courseDocRef = doc(db, "courses", courseId);
    await updateDoc(courseDocRef, {
        avg_grade: average
    });

    return [average, letterGrade];
}

export default calculateAverageClassGrade;