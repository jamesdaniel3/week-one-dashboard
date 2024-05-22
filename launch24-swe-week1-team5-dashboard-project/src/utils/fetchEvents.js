import {collection, getDocs} from "firebase/firestore";
import {db} from "../firebase.js";

const fetchEvents = async () => {
    const querySnapshot = await getDocs(collection(db, 'events'));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export default fetchEvents;

/*
 Event Object Format:
 {
    title: 'Event Title',
    allDay: false,
    start: '<YEAR>-<MONTH>-<DAY><TIMEZONE><HOUR>:<MINUTE>:<SECOND>',
    end: '<YEAR>-<MONTH>-<DAY><TIMEZONE><HOUR>:<MINUTE>:<SECOND>'
 }
  {
    title: 'Event Title',
    allDay: true,
    date: '<YEAR>-<MONTH>-<DAY>'
 }
 */