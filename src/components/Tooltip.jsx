import React, { useState } from 'react';
import './Tooltip.css';

const Tooltip = ({ children, text, position = 'top' }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <span
      className="tooltip-wrapper"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <span className="tooltip-trigger">
        {children}
        <span className="tooltip-indicator">?</span>
      </span>
      {isVisible && (
        <span className={`tooltip-content tooltip-${position}`}>
          {text}
        </span>
      )}
    </span>
  );
};

export default Tooltip;
