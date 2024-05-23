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

        weightedAverages[studentName] = totalWeights > 0 ? totalWeightedGrades / totalWeights : 0;
    });

    return weightedAverages;
};


export default calculateWeightedAverageGrades;
