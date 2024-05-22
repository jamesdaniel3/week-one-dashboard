import {doc, collection, getDocs, getDoc} from "firebase/firestore";
import {db} from "../firebase";

const fetchCourses = async (userid) => {
    const coursesCollection = collection(db, "courses");
    const user_courses = (await getDoc(doc(db, 'users', userid))).data().courses_taught;
    const coursesSnapshot = await getDocs(coursesCollection);
    // console.log('courses:',coursesSnapshot.docs.map(user_courses => ({id: doc.id, ...user_courses.data()})));
    var courses = coursesSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
    return user_courses.map(i => courses[i]);
};

export default fetchCourses;