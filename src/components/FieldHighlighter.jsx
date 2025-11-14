import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockWebsite, fields } from '../data/mockData';
import './FieldHighlighter.css';

const FieldHighlighter = ({ active }) => {
  const [currentField, setCurrentField] = useState(0);

  useEffect(() => {
    if (!active) return;

    const interval = setInterval(() => {
      setCurrentField((prev) => (prev + 1) % fields.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [active]);

  const activeFieldName = fields[currentField]?.name;

  return (
    <div className="field-highlighter-container">
      <div className="mockup-browser small">
        <div className="browser-header">
          <div className="browser-dots">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <div className="browser-url">www.bobsburgers-moab.com</div>
        </div>
        <div className="browser-content">
          <div className="restaurant-site small">
            <header className="site-header">
              <h1
                className={`site-name ${activeFieldName === 'name' ? 'highlighted' : ''}`}
                style={activeFieldName === 'name' ? { borderColor: fields[0].color } : {}}
              >
                {mockWebsite.name}
              </h1>
            </header>

            <div className="site-body">
              <div className="contact-section">
                <p
                  className={`site-address ${activeFieldName === 'address' ? 'highlighted' : ''}`}
                  style={activeFieldName === 'address' ? { borderColor: fields[1].color } : {}}
                >
                  📍 {mockWebsite.address}
                </p>
                <p
                  className={`site-phone ${activeFieldName === 'phone' ? 'highlighted' : ''}`}
                  style={activeFieldName === 'phone' ? { borderColor: fields[3].color } : {}}
                >
                  📞 {mockWebsite.phone}
                </p>
                <p
                  className={`site-hours ${activeFieldName === 'hours' ? 'highlighted' : ''}`}
                  style={activeFieldName === 'hours' ? { borderColor: fields[2].color } : {}}
                >
                  🕒 {mockWebsite.hours}
                </p>
              </div>

              <div
                className={`gallery-section ${activeFieldName === 'images' ? 'highlighted' : ''}`}
                style={activeFieldName === 'images' ? { borderColor: fields[4].color } : {}}
              >
                <div className="image-grid-small">
                  <div className="gallery-image-small">🍔</div>
                  <div className="gallery-image-small">🏪</div>
                  <div className="gallery-image-small">🪑</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="field-legend">
        <h4>Extracting Fields:</h4>
        {fields.map((field, index) => (
          <AnimatePresence key={field.name}>
            {index <= currentField && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`field-item ${index === currentField ? 'active' : ''}`}
              >
                <div
                  className="field-indicator"
                  style={{ backgroundColor: field.color }}
                ></div>
                <span>{field.label}</span>
                {index < currentField && <span className="checkmark">✓</span>}
              </motion.div>
            )}
          </AnimatePresence>
        ))}
      </div>
    </div>
  );
};

export default FieldHighlighter;
