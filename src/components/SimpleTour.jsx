import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './SimpleTour.css';

const SimpleTour = ({ steps, run, onComplete, onStepChange }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!run || !steps[currentStep]) return;

    const updatePosition = () => {
      const target = document.querySelector(steps[currentStep].target);
      if (target) {
        const rect = target.getBoundingClientRect();
        const placement = steps[currentStep].placement || 'bottom';

        let top, left;

        switch (placement) {
          case 'top':
            top = rect.top - 10;
            left = rect.left + rect.width / 2;
            break;
          case 'bottom':
            top = rect.bottom + 10;
            left = rect.left + rect.width / 2;
            break;
          case 'left':
            top = rect.top + rect.height / 2;
            left = rect.left - 10;
            break;
          case 'right':
            top = rect.top + rect.height / 2;
            left = rect.right + 10;
            break;
          default:
            top = rect.bottom + 10;
            left = rect.left + rect.width / 2;
        }

        setTooltipPosition({ top, left, placement });

        // Scroll into view
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [currentStep, steps, run]);

  useEffect(() => {
    if (onStepChange) {
      onStepChange(currentStep);
    }
  }, [currentStep, onStepChange]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      if (onComplete) onComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    if (onComplete) onComplete();
  };

  if (!run || !steps[currentStep]) return null;

  const step = steps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  // Highlight the target element
  const target = document.querySelector(step.target);
  if (target) {
    target.classList.add('tour-highlight');
  }

  // Remove highlight from other elements
  document.querySelectorAll('.tour-highlight').forEach((el) => {
    if (el !== target) {
      el.classList.remove('tour-highlight');
    }
  });

  return (
    <>
      <div className="tour-overlay" />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          className={`tour-tooltip placement-${tooltipPosition.placement} ${isDragging ? 'dragging' : ''}`}
          style={{
            position: 'fixed',
            top: tooltipPosition.top,
            left: tooltipPosition.left,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          drag
          dragMomentum={false}
          dragElastic={0}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
        >
          <div className="tour-drag-handle">
            <div className="drag-indicator">⋮⋮</div>
            <span className="drag-hint">Drag to move</span>
          </div>
          <div className="tour-content">
            <p>{step.content}</p>
          </div>
          <div className="tour-footer">
            <div className="tour-progress">
              Step {currentStep + 1} of {steps.length}
            </div>
            <div className="tour-buttons">
              <button onClick={handleSkip} className="tour-btn tour-btn-skip">
                Skip
              </button>
              {!isFirstStep && (
                <button onClick={handlePrev} className="tour-btn tour-btn-back">
                  Back
                </button>
              )}
              <button onClick={handleNext} className="tour-btn tour-btn-next">
                {isLastStep ? 'Finish' : 'Next'}
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default SimpleTour;
