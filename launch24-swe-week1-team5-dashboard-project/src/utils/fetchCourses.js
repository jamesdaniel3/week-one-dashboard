import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const fetchCourses = async () => {
    const coursesCollection = collection(db, "courses");
    const coursesSnapshot = await getDocs(coursesCollection);
    const coursesList = coursesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return coursesList;
};

export default fetchCourses;