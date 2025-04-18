import React from 'react';
import './StepProgress.css'; // CSS styles below

const StepProgressBar = ({ steps, currentStep }) => {
  return (
    <div className="step-container">
      {steps.map((label, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;

        return (
          <div className="step-item" key={index}>
            <div className={`step-circle ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`}>
              {isCompleted ? '✓' : index + 1}
            </div>
            <div className="step-label">{label}</div>
            {index !== steps.length - 1 && (
              <div className={`step-line ${index < currentStep ? 'line-completed' : ''}`} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepProgressBar;
