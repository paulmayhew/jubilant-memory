import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Tooltip from './Tooltip';
import './CrawlerDemo.css';
import './CrawlerDemo-source.css';

const CrawlerDemo = ({ active }) => {
  const [crawlStep, setCrawlStep] = useState(0);
  const [sourceType, setSourceType] = useState('webpage');

  const sourceTypes = [
    {
      id: 'webpage',
      name: 'Web Page',
      icon: '🌐',
      description: 'Crawl HTML directories',
      tooltip: 'Traditional websites with HTML - like browsing in Chrome. We read the page structure just like you see it.'
    },
    {
      id: 'json',
      name: 'JSON Feed',
      icon: '📄',
      description: 'Parse JSON endpoints',
      tooltip: 'Structured data files in JSON format - machine-readable lists of information. Easier to parse than HTML.'
    },
    {
      id: 'api',
      name: 'REST API',
      icon: '🔌',
      description: 'Query API endpoints',
      tooltip: 'Direct connection to a service that provides data on request - like asking a database questions and getting answers.'
    },
    {
      id: 'spreadsheet',
      name: 'Spreadsheet',
      icon: '📊',
      description: 'Parse CSV/Excel files',
      tooltip: 'Read data from spreadsheet files (CSV, XLS, XLSX) - perfect for importing existing lists and directories maintained in Excel or Google Sheets.'
    },
    {
      id: 'database',
      name: 'Database',
      icon: '🗄️',
      description: 'Read DB tables',
      tooltip: 'Direct access to database tables - reading structured information stored in rows and columns, like a spreadsheet.'
    },
  ];

  const allPages = [
    { id: 1, name: "Bob's Burgers", type: 'restaurant', icon: '🍔' },
    { id: 2, name: "Mountain View Hotel", type: 'lodging', icon: '🏨' },
    { id: 3, name: "Pizza Palace", type: 'restaurant', icon: '🍕' },
    { id: 4, name: "Red Rock Adventure Tours", type: 'attraction', icon: '🏔️' },
    { id: 5, name: "Sushi Central", type: 'restaurant', icon: '🍣' },
    { id: 6, name: "Desert Inn", type: 'lodging', icon: '🏨' },
    { id: 7, name: "Taco Town", type: 'restaurant', icon: '🌮' },
    { id: 8, name: "Arches Hiking Guide", type: 'attraction', icon: '🥾' },
    { id: 9, name: "Breakfast Cafe", type: 'restaurant', icon: '🥞' },
  ];

  const restaurants = allPages.filter(page => page.type === 'restaurant');

  useEffect(() => {
    if (!active) {
      setCrawlStep(0);
      return;
    }

    const interval = setInterval(() => {
      setCrawlStep((prev) => {
        if (prev < allPages.length) {
          return prev + 1;
        }
        return prev;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [active]);

  return (
    <div className="crawler-demo">
      <div className="source-type-selector">
        <h4>Data Source Type:</h4>
        <div className="source-buttons">
          {sourceTypes.map((type) => (
            <button
              key={type.id}
              className={`source-btn ${sourceType === type.id ? 'active' : ''}`}
              onClick={() => setSourceType(type.id)}
            >
              <span className="source-icon">{type.icon}</span>
              <span className="source-name">
                <Tooltip text={type.tooltip} position="top">
                  {type.name}
                </Tooltip>
              </span>
              <span className="source-desc">{type.description}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="demo-split">
        {/* Left side: Source Display */}
        <div className="website-panel">
          <div className="browser-window">
            <div className="browser-bar">
              <div className="browser-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <div className="browser-url">
                {sourceType === 'webpage' && 'www.moab-restaurants.com'}
                {sourceType === 'json' && 'api.moab.com/listings.json'}
                {sourceType === 'api' && 'api.moab.com/v1/businesses'}
                {sourceType === 'spreadsheet' && 'file:///moab-tourism-directory.xlsx'}
                {sourceType === 'database' && 'postgres://listings_db/public.businesses'}
              </div>
            </div>
            <div className="browser-body">
              {sourceType === 'webpage' && (
                <div className="webpage-content">
                  <h2 className="site-title">Moab Visitor Guide</h2>
                  <div className="topic-filter">
                    <span className="filter-label">Filtering for:</span>
                    <span className="filter-badge">Restaurants Only 🍔</span>
                  </div>
                  <div className="restaurant-list">
                    {allPages.map((page, index) => (
                      <motion.div
                        key={page.id}
                        className={`restaurant-item ${page.type !== 'restaurant' ? 'filtered-out' : ''} ${index < crawlStep ? 'crawled' : ''}`}
                        initial={{ opacity: 0.3 }}
                        animate={{
                          opacity: index < crawlStep ? 1 : 0.3,
                          scale: index === crawlStep - 1 ? [1, 1.05, 1] : 1,
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="item-icon">{page.icon}</div>
                        <div className="item-info">
                          <div className="item-name">{page.name}</div>
                          <div className="item-type">{page.type}</div>
                          <div className="item-link">View Details →</div>
                        </div>
                        {index < crawlStep && page.type === 'restaurant' && (
                          <motion.div
                            className="spider-icon"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ duration: 0.4 }}
                          >
                            🕷️
                          </motion.div>
                        )}
                        {index < crawlStep && page.type !== 'restaurant' && (
                          <motion.div
                            className="skip-icon"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            ⊘
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {sourceType === 'json' && (
                <div className="json-view">
                  <div className="json-header">
                    <span className="json-title">listings.json</span>
                    <span className="json-size">{allPages.length} records</span>
                  </div>
                  <pre className="json-content">
{`{
  "listings": [`}
{allPages.slice(0, crawlStep).map((page, index) => (
  <div key={page.id} className={`json-record ${page.type === 'restaurant' ? 'collected' : 'skipped'}`}>
    {`    {
      "id": ${page.id},
      "name": "${page.name}",
      "type": "${page.type}",
      "category": "tourism"
    }${index < crawlStep - 1 ? ',' : ''}`}
  </div>
))}
{`  ]
}`}
                  </pre>
                </div>
              )}

              {sourceType === 'api' && (
                <div className="api-view">
                  <div className="api-header">
                    <div className="api-method">GET</div>
                    <div className="api-endpoint">/v1/businesses?category=tourism</div>
                  </div>
                  <div className="api-response">
                    <div className="response-header">
                      <span className="response-status">200 OK</span>
                      <span className="response-time">{crawlStep * 120}ms</span>
                    </div>
                    <pre className="response-body">
{`{
  "data": [`}
{allPages.slice(0, crawlStep).map((page, index) => (
  <div key={page.id} className={`api-record ${page.type === 'restaurant' ? 'collected' : 'skipped'}`}>
    {`    {
      "id": "${page.id}",
      "name": "${page.name}",
      "business_type": "${page.type}"
    }${index < crawlStep - 1 ? ',' : ''}`}
  </div>
))}
{`  ],
  "total": ${crawlStep},
  "page": 1
}`}
                    </pre>
                  </div>
                </div>
              )}

              {sourceType === 'spreadsheet' && (
                <div className="spreadsheet-view">
                  <div className="spreadsheet-header">
                    <div className="spreadsheet-icon">📊</div>
                    <div className="spreadsheet-info">
                      <div className="spreadsheet-name">moab-tourism-directory.xlsx</div>
                      <div className="spreadsheet-sheet">Sheet: "Restaurants" | Filter: Type = "restaurant"</div>
                    </div>
                  </div>
                  <table className="spreadsheet-table">
                    <thead>
                      <tr>
                        <th className="row-number"></th>
                        <th>A</th>
                        <th>B</th>
                        <th>C</th>
                        <th>D</th>
                        <th>E</th>
                      </tr>
                      <tr className="column-headers">
                        <th className="row-number">1</th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Category</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allPages.slice(0, crawlStep).map((page, index) => (
                        <tr key={page.id} className={page.type === 'restaurant' ? 'collected' : 'skipped'}>
                          <td className="row-number">{index + 2}</td>
                          <td>{page.id}</td>
                          <td>{page.name}</td>
                          <td>{page.type}</td>
                          <td>tourism</td>
                          <td className="row-status">
                            {page.type === 'restaurant' ? '✓' : '⊘'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {sourceType === 'database' && (
                <div className="db-view">
                  <div className="db-header">
                    <div className="db-icon">🗄️</div>
                    <div className="db-info">
                      <div className="db-name">listings_db.public.businesses</div>
                      <div className="db-query">SELECT * FROM businesses WHERE category = 'tourism'</div>
                    </div>
                  </div>
                  <table className="db-table">
                    <thead>
                      <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>type</th>
                        <th>category</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {allPages.slice(0, crawlStep).map((page) => (
                        <tr key={page.id} className={page.type === 'restaurant' ? 'collected' : 'skipped'}>
                          <td>{page.id}</td>
                          <td>{page.name}</td>
                          <td>{page.type}</td>
                          <td>tourism</td>
                          <td className="row-status">
                            {page.type === 'restaurant' ? '✓' : '⊘'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right side: Discovery */}
        <div className="discovery-panel">
          <h3>Spider Activity</h3>
          <div className="discovery-stats">
            <div className="stat-box">
              <div className="stat-number">{Math.min(crawlStep, restaurants.length)}</div>
              <div className="stat-label">Restaurants Found</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">{crawlStep}</div>
              <div className="stat-label">Pages Crawled</div>
            </div>
          </div>

          <div className="discovered-list">
            <h4>Collected Restaurants:</h4>
            <AnimatePresence>
              {allPages.slice(0, crawlStep).filter(page => page.type === 'restaurant').map((page) => (
                <motion.div
                  key={page.id}
                  className="discovered-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="check-icon">✓</span>
                  <span className="item-icon-small">{page.icon}</span>
                  <span>{page.name}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {crawlStep >= allPages.length && (
            <motion.div
              className="crawl-complete"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="complete-icon">✨</div>
              <div className="complete-text">Crawl Complete!</div>
              <div className="complete-subtext">
                Found {restaurants.length} restaurants out of {allPages.length} total listings
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <div className="crawler-info">
        <div className="info-item">
          <strong>Source Agnostic:</strong> Data can come from web pages, JSON feeds, REST APIs,
          or database tables. Our platform adapts to any source format.
        </div>
        <div className="info-item">
          <strong>Automatic Discovery:</strong> You don't specify which items exist.
          The system discovers all {allPages.length} listings and filters for the {restaurants.length} restaurants.
        </div>
        <div className="info-item">
          <strong>Smart Filtering:</strong> Only collects the topics you need,
          saving time and storage while ensuring complete data coverage.
        </div>
      </div>
    </div>
  );
};

export default CrawlerDemo;
