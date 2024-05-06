import React from "react";
import './MobileStepper.scss'
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'; // Import arrow icons

function MobileStepper({ steps, position, activeStep, onNext, onBack }) {
  const dots = Array.from({ length: steps }, (_, index) => index);

  return (
    <div className="mobile-stepper">
      <ArrowBackIos
        className="stepper-arrow"
        onClick={onBack}
        disabled={activeStep === 0}
      />
       {dots.map((dot, index) => (
        <span
          key={index}
          className={`stepper-dot ${index === activeStep ? 'active' : ''}`}
          onClick={() => console.log("Go to step", index)}
        />
      ))}
      <ArrowForwardIos
        className="stepper-arrow"
        onClick={onNext}
        disabled={activeStep === steps - 1}
      />
    </div>
  );
}

export default MobileStepper;

