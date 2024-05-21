import {collection, getDocs} from "firebase/firestore";
import {db} from "../firebase";

const fetchCourses = async () => {
    const coursesCollection = collection(db, "courses");
    const coursesSnapshot = await getDocs(coursesCollection);
    return coursesSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
};

export default fetchCourses;