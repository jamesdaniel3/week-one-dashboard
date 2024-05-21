import '../styles/CourseCard.css'


export const CourseCard = ({course=null, courseid=null}) => {
    if (course != null) {

        var course_grade = "good"; // defualt course grade status
        //set course grade color
        if (course.avg_grade >= 85) {
            course_grade = "good"
        }
        else if (course.avg_grade >= 70) {
            course_grade = "medium"
        }
        else {
            course_grade = "poor"
        }

        return (
            <>
                <a href={course.route} className={"course-card " + course.color}>
                    <div className='title'>
                    <h1>
                        {course.title}
                    </h1>
                    </div>
                    <p className='description' maxlength='50'>
                        {course.desc}
                    </p>
                    <div className="course-card-footer">
                        <div className={'grade-overview '+course_grade}>
                            <span> {course.avg_grade}% </span>
                        </div>
                    </div>
                </a>
            </>
        )
    }
}