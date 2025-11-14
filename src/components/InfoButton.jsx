import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './InfoButton.css';

const InfoButton = ({ title, content, position = 'right' }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="info-button-container">
      <button
        className={`info-btn ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Show information"
      >
        {isOpen ? '✕' : 'ℹ️'}
        <span className="info-btn-text">{isOpen ? 'Close' : 'What am I seeing?'}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`info-panel position-${position}`}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="info-panel-header">
              <h3>{title}</h3>
            </div>
            <div className="info-panel-content">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InfoButton;
