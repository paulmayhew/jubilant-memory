import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pipelineStages } from '../data/mockData';
import './PipelineAnimation.css';

const PipelineAnimation = ({ active }) => {
  const [currentStage, setCurrentStage] = useState(0);

  const handleStageClick = (index) => {
    if (index <= currentStage + 1) {
      setCurrentStage(index);
    }
  };

  const currentStageData = pipelineStages[currentStage];

  return (
    <div className="pipeline-container">
      <div className="pipeline-header">
        <h3>8-Stage Processing Pipeline</h3>
        <p>Click each stage to learn what it does</p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStage}
          className="stage-explanation"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="explanation-icon">{currentStageData.icon}</div>
          <div className="explanation-content">
            <h2>{currentStageData.name}</h2>
            <p className="explanation-text">{currentStageData.tooltip}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="pipeline-flow">
        <div className="pipeline-stages">
          {pipelineStages.map((stage, index) => (
            <div
              key={stage.id}
              className={`pipeline-stage ${index <= currentStage ? 'active' : ''} ${
                index === currentStage ? 'current' : ''
              } ${index === currentStage + 1 ? 'next-available' : ''}`}
              onClick={() => handleStageClick(index)}
              style={{ cursor: index <= currentStage + 1 ? 'pointer' : 'not-allowed' }}
            >
              <div className="stage-icon">{stage.icon}</div>
              <div className="stage-name">{stage.name}</div>
              <div className="stage-description">{stage.description}</div>
              {index < pipelineStages.length - 1 && (
                <div className={`stage-arrow ${index < currentStage ? 'passed' : ''}`}>
                  →
                </div>
              )}
            </div>
          ))}
        </div>

        <motion.div
          className="data-packet"
          initial={{ x: 0 }}
          animate={{
            x: currentStage * 140,
          }}
          transition={{ duration: 0.5 }}
        >
          📦
        </motion.div>
      </div>

      <div className="pipeline-stats">
        <div className="stat">
          <div className="stat-value">
            {currentStage + 1}/{pipelineStages.length}
          </div>
          <div className="stat-label">Stages Complete</div>
        </div>
        <div className="stat">
          <div className="stat-value">
            {Math.round(((currentStage + 1) / pipelineStages.length) * 100)}%
          </div>
          <div className="stat-label">Progress</div>
        </div>
      </div>
    </div>
  );
};

export default PipelineAnimation;
