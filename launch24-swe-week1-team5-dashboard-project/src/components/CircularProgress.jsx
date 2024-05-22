import React from 'react';
import './CircularProgress.css';

const CircularProgress = ({ percentage, letterGrade }) => {
  const circleStyle = {
    background: `conic-gradient(#00bf00 ${percentage * 3.6}deg, #e6e2e7 ${percentage * 3.6}deg)`
  };

  return (
    <div className="circle-wrap">
      <div className="circle" style={circleStyle}>
        <div className="inside-circle">
          {letterGrade}
        </div>
      </div>
    </div>
  );
};

export default CircularProgress;
