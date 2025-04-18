import React, { useState } from 'react';
import StepProgressBar from './StepProgressBar'

const StepProgress = ({ steps }) => {
    const [step, setStep] = useState(1);

    const next = () => setStep(prev => Math.min(prev + 1, 3));
    const prev = () => setStep(prev => Math.max(prev - 1, 0));

  return (
    <div>
      <StepProgressBar steps={['Login', 'Shipping', 'Payment', 'Confirmation']} currentStep={step} />
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button onClick={prev} disabled={step === 0}>Previous</button>
        <button onClick={next} disabled={step === 3}>Next</button>
      </div>
    </div>
  );
};

export default StepProgress;