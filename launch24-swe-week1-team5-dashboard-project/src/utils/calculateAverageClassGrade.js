function calculateLetterGrade(average) {
    if (average >= 90) return 'A';
    if (average >= 80) return 'B';
    if (average >= 70) return 'C';
    if (average >= 60) return 'D';
    return 'F';
}

function calculateAverageClassGrade(studentGrades){
    let count = 0;
    let sum = 0;
    for(const student in studentGrades){
        count++;
        sum += studentGrades[student];
    }

    const average = sum/count;
    return [average, calculateLetterGrade(average)];
}

export default calculateAverageClassGrade;