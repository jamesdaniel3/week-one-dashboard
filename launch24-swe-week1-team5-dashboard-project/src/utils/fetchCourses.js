import {doc, collection, getDocs, getDoc} from "firebase/firestore";
import {db} from "../firebase";

const fetchCourses = async (userid) => {
    const coursesCollection = collection(db, "courses");
    const user_courses = (await getDoc(doc(db, 'users', userid))).data().courses_taught;
    const coursesSnapshot = await getDocs(coursesCollection);
    let courses = coursesSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
    return courses.filter(course => user_courses.includes(course.id));
};

export default fetchCourses;