import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";


const data = [];

const fetchTableInfo = async (courseId) => {
    const courseDocRef = doc(db, "courses", courseId);
    const courseDocSnap = await getDoc(courseDocRef);
    if (!courseDocSnap.exists()) {
        console.log("No such course!");
        return;
    }
    const courseData = courseDocSnap.data();
    addObjectIfUnique(courseData);
    await createStudentMap(courseData.students);
    await createGradeMap(courseId)
    console.log('data:',data);
    return data

};

const createStudentMap = async (studentIds) => {
    let studentNamesById = {};

    for (const studentId of studentIds) {
        const studentDocRef = doc(db, "students", studentId);
        const studentDocSnap = await getDoc(studentDocRef);

        if (studentDocSnap.exists()) {
            // Assign the student's name to their ID in the object
            studentNamesById[studentId] = studentDocSnap.data().name;
        } else {
            console.log(`No such student with ID: ${studentId}`);
        }
    }

    addObjectIfUnique(studentNamesById)

}

const createGradeMap = async (courseId) => {
    let gradesMap = {};
    const studentNamesById = data[1];

    for (const studentId of Object.keys(studentNamesById)) {
        const gradesRef = collection(db, "grades");
        const q = query(gradesRef, where("course_id", "==", courseId), where("student_id", "==", studentId));
        const querySnapshot = await getDocs(q);

        let studentGrades = {};
        querySnapshot.forEach((doc) => {
            const gradeData = doc.data();
            studentGrades = { ...studentGrades, ...gradeData.assignments };
        });

        gradesMap[studentNamesById[studentId]] = studentGrades;
    }

    addObjectIfUnique(gradesMap);
}

const addObjectIfUnique = (obj) => {
    const isDuplicate = data.some(existingObj => JSON.stringify(existingObj) === JSON.stringify(obj));
    if (!isDuplicate) {
        data.push(obj);
    }
};


export default fetchTableInfo;