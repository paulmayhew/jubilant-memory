import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Tooltip from './Tooltip';
import { mockWebsite } from '../data/mockData';
import './WebsiteMockup.css';
import './WebsiteMockup-hidden.css';

const WebsiteMockup = () => {
  const [viewMode, setViewMode] = useState('user');

  console.log('WebsiteMockup viewMode:', viewMode);

  const hiddenData = {
    jsonLd: {
      "@type": "Restaurant",
      "name": "Bob's Burgers",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "123 Main St",
        "addressLocality": "Moab",
        "postalCode": "84532"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 38.5733,
        "longitude": -109.5498
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.5",
        "reviewCount": "127"
      }
    },
    shadowDom: {
      reviewWidget: "127 reviews hidden in shadow DOM",
      mapWidget: "Interactive map with coordinates",
      bookingForm: "Reservation system data"
    },
    scriptTags: {
      analytics: "User behavior tracking data",
      menuData: "Full menu with prices in JavaScript array",
      availability: "Real-time table availability"
    }
  };

  return (
    <div className="mockup-container">
      <div className="view-mode-selector">
        <h4>Data Extraction View:</h4>
        <div className="view-buttons">
          <button
            className={`view-btn ${viewMode === 'user' ? 'active' : ''}`}
            onClick={() => setViewMode('user')}
          >
            👁️ User View
            <span className="view-desc">What visitors see</span>
          </button>
          <button
            className={`view-btn ${viewMode === 'scraper' ? 'active' : ''}`}
            onClick={() => setViewMode('scraper')}
          >
            🤖 Scraper View
            <span className="view-desc">Hidden data sources</span>
          </button>
        </div>
      </div>

      <div className="flip-container">
        <AnimatePresence mode="wait">
          {viewMode === 'user' ? (
            <motion.div
              key="user-view"
              initial={{ opacity: 0, rotateY: -90, scale: 0.8 }}
              animate={{ opacity: 1, rotateY: 0, scale: 1 }}
              exit={{ opacity: 0, rotateY: 90, scale: 0.8 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flip-panel user-panel"
            >
              <div className="mockup-browser">
            <div className="browser-header">
              <div className="browser-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <div className="browser-url">www.bobsburgers-moab.com</div>
            </div>
            <div className="browser-content">
              <div className="restaurant-site">
                <header className="site-header">
                  <h1 className="site-name" data-field="name">{mockWebsite.name}</h1>
                </header>

                <div className="site-hero">
                  <div className="hero-image">🍔</div>
                </div>

                <div className="site-body">
                  <div className="info-section">
                    <h3>About Us</h3>
                    <p className="site-description">{mockWebsite.description}</p>
                  </div>

                  <div className="contact-section">
                    <h3>Visit Us</h3>
                    <p className="site-address" data-field="address">
                      📍 {mockWebsite.address}
                    </p>
                    <p className="site-phone" data-field="phone">
                      📞 {mockWebsite.phone}
                    </p>
                    <p className="site-hours" data-field="hours">
                      🕒 {mockWebsite.hours}
                    </p>
                  </div>

                  <div className="gallery-section" data-field="images">
                    <h3>Gallery</h3>
                    <div className="image-grid">
                      <div className="gallery-image">🍔 Photo 1</div>
                      <div className="gallery-image">🏪 Photo 2</div>
                      <div className="gallery-image">🪑 Photo 3</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
            </motion.div>
          ) : (
            <motion.div
              key="scraper-view"
              initial={{ opacity: 0, rotateY: -90, scale: 0.8 }}
              animate={{ opacity: 1, rotateY: 0, scale: 1 }}
              exit={{ opacity: 0, rotateY: 90, scale: 0.8 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flip-panel scraper-panel"
            >
              <div className="hidden-data-panel">
            <h3>🔍 Hidden Data Sources We Can Access</h3>
            <p className="panel-intro">
              Beyond visible content, our scrapers extract structured data invisible to users
            </p>

            <div className="hidden-sources">
            <div className="source-block">
              <div className="source-header">
                <span className="source-icon">📋</span>
                <span className="source-title">
                  <Tooltip text="JSON for Linking Data - a hidden code block websites use to tell search engines structured information about their content. Like nutrition labels for web pages." position="top">
                    JSON-LD Schema
                  </Tooltip>
                </span>
                <span className="source-badge">Structured Data</span>
              </div>
              <pre className="source-code">
{`<script type="application/ld+json">
${JSON.stringify(hiddenData.jsonLd, null, 2)}
</script>`}
              </pre>
              <div className="source-benefit">
                ✓ GPS coordinates • ✓ Ratings • ✓ Reviews count
              </div>
            </div>

            <div className="source-block">
              <div className="source-header">
                <span className="source-icon">🌑</span>
                <span className="source-title">
                  <Tooltip text="Hidden sections of a webpage that are isolated from the main page - like widgets and embedded components. Think of them as sealed compartments containing extra data." position="top">
                    Shadow DOM Elements
                  </Tooltip>
                </span>
                <span className="source-badge">Encapsulated</span>
              </div>
              <div className="shadow-items">
                <div className="shadow-item">
                  <code>#shadow-root</code>
                  <span className="arrow">→</span>
                  <span className="extracted">{hiddenData.shadowDom.reviewWidget}</span>
                </div>
                <div className="shadow-item">
                  <code>#map-widget</code>
                  <span className="arrow">→</span>
                  <span className="extracted">{hiddenData.shadowDom.mapWidget}</span>
                </div>
                <div className="shadow-item">
                  <code>#booking-form</code>
                  <span className="arrow">→</span>
                  <span className="extracted">{hiddenData.shadowDom.bookingForm}</span>
                </div>
              </div>
              <div className="source-benefit">
                ✓ Reviews • ✓ Interactive maps • ✓ Booking data
              </div>
            </div>

            <div className="source-block">
              <div className="source-header">
                <span className="source-icon">📜</span>
                <span className="source-title">
                  <Tooltip text="Data stored in the page's code that runs in your browser - like menu prices and availability that get loaded dynamically when you visit the page." position="top">
                    JavaScript Variables
                  </Tooltip>
                </span>
                <span className="source-badge">Runtime Data</span>
              </div>
              <pre className="source-code">
{`<script>
  window.menuData = [...]; // Full menu
  window.availability = {...}; // Tables
  window.analytics = {...}; // Behavior
</script>`}
              </pre>
              <div className="source-benefit">
                ✓ Menus with prices • ✓ Real-time availability
              </div>
            </div>

            <div className="source-block">
              <div className="source-header">
                <span className="source-icon">🗺️</span>
                <span className="source-title">
                  <Tooltip text="Network requests the page makes to fetch additional data - like when a review widget loads reviews from another server. We intercept and capture this data." position="top">
                    API Calls & XHR
                  </Tooltip>
                </span>
                <span className="source-badge">Network Traffic</span>
              </div>
              <div className="api-calls">
                <div className="api-call">
                  <span className="http-method">GET</span>
                  <code>/api/reviews?id=123</code>
                  <span className="data-type">Customer reviews</span>
                </div>
                <div className="api-call">
                  <span className="http-method">GET</span>
                  <code>/api/trails/nearby</code>
                  <span className="data-type">Trail data, GPX files</span>
                </div>
                <div className="api-call">
                  <span className="http-method">GET</span>
                  <code>/api/events/calendar</code>
                  <span className="data-type">Event schedules</span>
                </div>
              </div>
              <div className="source-benefit">
                ✓ Reviews • ✓ Trail coordinates • ✓ Events
              </div>
            </div>
          </div>

          <div className="scraper-capabilities">
            <h4>💡 What This Means</h4>
            <div className="capability-grid">
              <div className="capability">
                <strong>Richer Data:</strong> Extract 5-10x more information than visible content
              </div>
              <div className="capability">
                <strong>Structured:</strong> Pre-formatted data (ratings, coordinates, prices)
              </div>
              <div className="capability">
                <strong>Accurate:</strong> Source-of-truth data used by the site itself
              </div>
              <div className="capability">
                <strong>Complete:</strong> Reviews, trails, events, and metadata
              </div>
            </div>
              </div>
            </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WebsiteMockup;
