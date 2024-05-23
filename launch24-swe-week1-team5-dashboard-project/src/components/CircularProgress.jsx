import React from 'react';
import '../styles/CircularProgress.css';

const CircularProgress = ({ percentage, letterGrade }) => {

  var color = "good"; // default course grade status
    // set course grade color
    if (percentage >= 85) {
      color = "#537953";
    } else if (percentage >= 70) {
      color = "#F5A300";
    } else {
      color = "#CB2A3F";
    }

  const circleStyle = {
    background: `conic-gradient(${color} ${percentage * 3.6}deg, #e6e2e7 ${percentage * 3.6}deg)`
  };

  return (
    <div className="circle-wrap">
      <div className="circle" style={circleStyle}>
        <div className="inside-circle">
          {Math.round(percentage,2)}
          {/* {letterGrade} */}
        </div>
      </div>
    </div>
  );
};

export default CircularProgress;
