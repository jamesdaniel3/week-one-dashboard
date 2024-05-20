import '../styles/CourseCard.css'


export const CourseCard = ({course=null, courseid=null}) => {
    if (course != null) {
        if (course.avg_grade >= 85) {
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
                            <div className='grade-overview good'>
                                <span> {course.avg_grade}% </span>
                            </div>
                        </div>
                    </a>
                </>
            )
        }
        else if (course.avg_grade >= 70) {
            return (
                <>
                    <div className={"course-card " + course.color}>
                        <div className='title'>
                        <h1>
                            {course.title}
                        </h1>
                        </div>
                        <p className='description' maxlength='50'>
                            {course.desc}
                        </p>
                        <div className="course-card-footer">
                            <div className='grade-overview medium'>
                                <span> {course.avg_grade}% </span>
                            </div>
                        </div>
                    </div>
                </>
            )
        }
        else {
            return (
                <>
                    <div className={"course-card " + course.color}>
                        <div className='title'>
                        <h1>
                            {course.title}
                        </h1>
                        </div>
                        <p className='description' maxlength='50'>
                            {course.desc}
                        </p>
                        <div className="course-card-footer">
                            <div className='grade-overview poor'>
                                <span> {course.avg_grade}% </span>
                            </div>
                        </div>
                    </div>
                </>
            )
        }
    }
}