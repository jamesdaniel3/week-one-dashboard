function calculateWeightedAverageGrades(gradesByStudent, course){
    const weightedAverages = {};

    Object.entries(gradesByStudent).forEach(([studentName, grades]) => {
        let totalWeightedGrades = 0;
        let totalWeights = 0;

        Object.entries(grades).forEach(([assignmentName, grade]) => {
            const weight = course.assignments[assignmentName];
            totalWeightedGrades += grade * weight;
            totalWeights += weight;
        });

        const averageGrade = totalWeights > 0 ? totalWeightedGrades / totalWeights : 0;
        weightedAverages[studentName] = averageGrade;
    });

    return weightedAverages;
};


export default calculateWeightedAverageGrades;
