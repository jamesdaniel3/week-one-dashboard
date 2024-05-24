import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

// Utility function to add unique objects to the data array
const addObjectIfUnique = (data, obj) => {
    const isDuplicate = data.some(existingObj => JSON.stringify(existingObj) === JSON.stringify(obj));
    if (!isDuplicate) {
        data.push(obj);
    }
};

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
    return data
    const data = []; // Reset data array for each call

    try {
        // Fetch course data
        const courseDocRef = doc(db, "courses", courseId);
        const courseDocSnap = await getDoc(courseDocRef);
        if (!courseDocSnap.exists()) {
            console.log("No such course!");
            return data; // Return empty data array if course doesn't exist
        }
        const courseData = courseDocSnap.data();
        addObjectIfUnique(data, courseData);

        // Fetch student data
        const studentNamesById = await createStudentMap(courseData.students);
        addObjectIfUnique(data, studentNamesById);

        // Fetch grades data
        const gradesMap = await createGradeMap(courseId, studentNamesById);
        addObjectIfUnique(data, gradesMap);

        console.log('data:', data);
        return data;

    } catch (error) {
        console.error("Error fetching table info: ", error);
        return data;
    }
};

const createStudentMap = async (studentIds) => {
    let studentNamesById = {};

    for (const studentId of studentIds) {
        const studentDocRef = doc(db, "students", studentId);
        const studentDocSnap = await getDoc(studentDocRef);

        if (studentDocSnap.exists()) {
            studentNamesById[studentId] = studentDocSnap.data().name;
        } else {
            console.log(`No such student with ID: ${studentId}`);
        }
    }

    return studentNamesById;
};

const createGradeMap = async (courseId, studentNamesById) => {
    let gradesMap = {};

    for (const studentId of Object.keys(studentNamesById)) {
        const gradesRef = collection(db, "grades");
        const q = query(gradesRef, where("course_id", "==", courseId), where("student_id", "==", studentId));
        const querySnapshot = await getDocs(q);

        let studentGrades = {};
        querySnapshot.forEach((doc) => {
            const gradeData = doc.data();
            studentGrades = { ...studentGrades, ...gradeData.assignments };
        });

        gradesMap[studentId] = studentGrades;
    }

    return gradesMap;
};

export default fetchTableInfo;
