import {collection, getDocs} from "firebase/firestore";
import {db} from "../firebase";

const fetchStudents = async () => {
    const studentsCollection = collection(db, "Students");
    const studentsSnapshot = await getDocs(studentsCollection);
    return studentsSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
};

export default fetchStudents;