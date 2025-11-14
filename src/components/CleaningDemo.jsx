import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Tooltip from './Tooltip';
import './CleaningDemo.css';

const CleaningDemo = ({ active }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const transformations = [
    {
      title: 'Phone Standardization',
      tooltip: 'Converting phone numbers from various formats into a consistent format - removing parentheses, dots, and extensions for uniform display.',
      before: ['(435) 555-1234', '435.555.1234', '435-555-1234 ext 5'],
      after: '435-555-1234',
      icon: '📞',
    },
    {
      title: 'Title Case Normalization',
      tooltip: 'Fixing ALL CAPS text to Proper Case - making titles readable and professional looking.',
      before: ["BOB'S BURGERS"],
      after: "Bob's Burgers",
      icon: '✍️',
    },
    {
      title: 'Address Geocoding',
      tooltip: 'Converting text addresses into precise GPS coordinates using professional mapping services (SmartyStreets, Google Maps) - essential for showing locations on maps.',
      before: ['123 main st moab'],
      after: '123 Main St, Moab, UT 84532\n📍 38.5733, -109.5498',
      icon: '🗺️',
    },
    {
      title: 'AI Category Inference',
      tooltip: 'Using AI to analyze the business and infer detailed subcategories that weren\'t explicitly listed - like identifying cuisine types from menu items and descriptions.',
      before: ['Type: restaurant\n(no cuisine info)'],
      after: 'dining_cuisine:\n["American", "Burgers"]\n\ndining_features:\n["Family-friendly", "Casual"]',
      icon: '🤖',
    },
    {
      title: 'AI Hours Parsing',
      tooltip: 'AI converts messy, unstructured hours text into a clean structured format - understanding abbreviations, time formats, and even inferring Sunday closures.',
      before: ['Mon-Fri 9am-5pm Sat 10-3'],
      after: '{\n  monday: "09:00-17:00"\n  tuesday: "09:00-17:00"\n  ...\n  saturday: "10:00-15:00"\n  sunday: "closed"\n}',
      icon: '🕐',
    },
    {
      title: 'AI Description Enhancement',
      tooltip: 'AI researches the business online and generates professional, detailed descriptions - combining scraped data with web research for richer content.',
      before: ['BEST BURGERS IN TOWN! Family owned since 1995...'],
      after: 'Bob\'s Burgers is a family-owned restaurant in Moab, Utah, serving American comfort food since 1995. Known for their fresh, locally-sourced burgers and welcoming atmosphere, they\'ve become a local favorite for both residents and tourists.',
      icon: '✨',
    },
  ];

  const handleCardClick = (index) => {
    if (index === selectedIndex) {
      // Toggle result view for current card
      setShowResult(!showResult);
    } else {
      // Select new card and show its result
      setSelectedIndex(index);
      setShowResult(true);
    }
  };

  return (
    <div className="cleaning-demo-container">
      <div className="demo-header">
        <h3>Data Transformations in Action</h3>
        <p className="demo-instruction">Click each transformation to see it in action</p>
      </div>

      <div className="transformations">
        {transformations.map((transform, index) => {
          const isActive = index === selectedIndex;

          return (
            <div
              key={index}
              className={`transformation-card ${isActive ? 'active' : ''}`}
              onClick={() => handleCardClick(index)}
              style={{ cursor: 'pointer' }}
            >
              <div className="transform-icon">{transform.icon}</div>
              <h4>
                <Tooltip text={transform.tooltip} position="top">
                  {transform.title}
                </Tooltip>
              </h4>

              <div className="transform-content">
                <div className="before-section">
                  <label>Before:</label>
                  <div className="data-box before">
                    {transform.before.map((item, i) => (
                      <div key={i} className="data-item">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      className="transform-arrow"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      →
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="after-section">
                  <label>After:</label>
                  <AnimatePresence mode="wait">
                    {isActive && showResult ? (
                      <motion.div
                        key="after"
                        className="data-box after"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                      >
                        {transform.after.split('\n').map((line, i) => (
                          <div key={i} className="data-item">
                            {line}
                          </div>
                        ))}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="placeholder"
                        className="data-box placeholder"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <div className="placeholder-text">
                          {isActive ? 'Click to transform →' : 'Select this card'}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CleaningDemo;
