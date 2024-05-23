import React from 'react';
import '../styles/CourseCard.css';

const calculateLetterGrade = (averageGrade) => {
  if (averageGrade >= 90) return 'A';
  if (averageGrade >= 80) return 'B';
  if (averageGrade >= 70) return 'C';
  if (averageGrade >= 60) return 'D';
  return 'F';
};

export const CourseCard = ({ course = null, courseId = null, showProgress = false }) => {
  if (course != null) {
    var course_grade = "good"; // default course grade status
    // set course grade color
    if (course.avg_grade >= 85) {
      course_grade = "good";
    } else if (course.avg_grade >= 70) {
      course_grade = "medium";
    } else {
      course_grade = "poor";
    }

    const letterGrade = calculateLetterGrade(course.avg_grade);

        return (
            <>
                <a href={course.route} className={"course-card " + course.color}>
                    <div className='title'>
                        <h1>
                        {course.title}
                        </h1>
                    </div>
                    <p className='description'>
                        {course.desc}
                    </p>
                    <div className="course-card-footer">
                        <div className={'grade-overview '+course_grade}>
                            <span> {Math.round(course.avg_grade, 2)}% </span>
                        </div>
                    </div>
                </a>
            </>
        )
    }
}