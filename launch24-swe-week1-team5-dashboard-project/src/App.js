import React, { useEffect, useState } from 'react';
import CircularProgress from './CircularProgress';
import './App.css';

const calculateLetterGrade = (average) => {
  if (average >= 90) return 'A';
  if (average >= 80) return 'B';
  if (average >= 70) return 'C';
  if (average >= 60) return 'D';
  return 'F';
};

const App = () => {
  const [averageGrade, setAverageGrade] = useState(0);
  const [letterGrade, setLetterGrade] = useState('F');

  useEffect(() => {
    // Temporary grade data
    const grades = [85, 90, 78, 92, 88];

    // Calculate average grade
    const total = grades.reduce((acc, grade) => acc + grade, 0);
    const average = total / grades.length;
    setAverageGrade(average);
    setLetterGrade(calculateLetterGrade(average));
  }, []);

  return (
    <div className="App">
      <CircularProgress percentage={averageGrade} letterGrade={letterGrade} />
    </div>
  );
};

export default App;
