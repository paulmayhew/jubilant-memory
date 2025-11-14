import React from 'react';
import { rawScrapedData, cleanedData } from '../data/mockData';
import './DataComparison.css';

const DataComparison = ({ type }) => {
  const data = type === 'raw' ? rawScrapedData : cleanedData;
  const isClean = type === 'clean';

  return (
    <div className={`data-comparison ${type}`}>
      <div className="data-header">
        <h3>{isClean ? '✨ Clean Data' : '📥 Raw Data'}</h3>
        {isClean && <span className="quality-badge">Quality: {data.quality_score}%</span>}
      </div>

      <div className="data-content">
        <pre className="data-json">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>

      {!isClean && (
        <div className="data-issues">
          <h4>Issues to Fix:</h4>
          <ul>
            <li>❌ Name is ALL CAPS</li>
            <li>❌ Phone format inconsistent</li>
            <li>❌ Address incomplete</li>
            <li>❌ Missing coordinates</li>
            <li>❌ Hours not structured</li>
            <li>❌ Images not validated</li>
          </ul>
        </div>
      )}

      {isClean && (
        <div className="data-improvements">
          <h4>Improvements:</h4>
          <ul>
            <li>✅ Name properly formatted</li>
            <li>✅ Phone standardized</li>
            <li>✅ Address completed & validated</li>
            <li>✅ GPS coordinates added</li>
            <li>✅ Hours structured for calendar</li>
            <li>✅ Images validated & classified</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DataComparison;
