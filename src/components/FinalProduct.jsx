import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cleanedData, rawScrapedData } from '../data/mockData';
import './FinalProduct.css';

const FinalProduct = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % cleanedData.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? cleanedData.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="final-product-container">
      <div className="comparison-header">
        <h3>The Final Product: Side-by-Side Comparison</h3>
        <p>See how enhanced data creates a superior user experience</p>
      </div>

      <div className="comparison-grid">
        {/* Original/Basic Version */}
        <div className="product-column">
          <div className="column-label basic">
            <span className="label-icon">📄</span>
            <span className="label-text">Basic Scrape Only</span>
          </div>

          <motion.div
            className="listing-card basic-card"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="card-header">
              <h2 className="card-title ugly-caps">{rawScrapedData.name}</h2>
            </div>

            <div className="card-body">
              <div className="info-row">
                <span className="icon">📍</span>
                <span className="text incomplete">{rawScrapedData.address}</span>
                <span className="missing-badge">No GPS</span>
              </div>

              <div className="info-row">
                <span className="icon">📞</span>
                <span className="text inconsistent">{rawScrapedData.phone}</span>
              </div>

              <div className="info-row">
                <span className="icon">🕒</span>
                <span className="text unstructured">{rawScrapedData.hours}</span>
              </div>

              <div className="description-section">
                <p className="description ugly-caps messy">{rawScrapedData.description}</p>
              </div>

              <div className="missing-section">
                <div className="missing-item">❌ No cuisine categories</div>
                <div className="missing-item">❌ No features/tags</div>
                <div className="missing-item">❌ No map integration</div>
                <div className="missing-item">❌ Poor readability</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Version */}
        <div className="product-column">
          <div className="column-label enhanced">
            <span className="label-icon">✨</span>
            <span className="label-text">AI-Enhanced Production</span>
          </div>

          <motion.div
            className="listing-card enhanced-card"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="card-header enhanced-header">
              <h2 className="card-title">{cleanedData.name}</h2>
              <div className="cuisine-tags">
                {cleanedData.dining_cuisine.map((cuisine, i) => (
                  <span key={i} className="cuisine-tag">{cuisine}</span>
                ))}
              </div>
            </div>

            <div className="card-body">
              <div className="listing-top">
                <div className="listing-contact">
                  <div className="info-row">
                    <span className="icon">📍</span>
                    <div className="info-content">
                      <span className="text">{cleanedData.formatted_address}</span>
                      <a href={cleanedData.map_url} className="map-link" target="_blank" rel="noopener noreferrer">
                        📍 View on Map
                      </a>
                    </div>
                  </div>

                  <div className="info-row">
                    <span className="icon">📞</span>
                    <span className="text phone-formatted">{cleanedData.phone}</span>
                  </div>

                  <div className="info-row">
                    <span className="icon">🕒</span>
                    <div className="hours-formatted">
                      <div className="hours-today">
                        <strong>Today:</strong> 9:00 AM - 5:00 PM
                      </div>
                      <button className="hours-expand">View full hours →</button>
                    </div>
                  </div>

                  <div className="image-stats">
                    <span className="stat-badge">✓ Validated</span>
                    <span className="stat-badge">✓ Classified</span>
                  </div>
                </div>

                <div className="listing-images">
                  <div className="main-image">
                    <div className="image-placeholder-large">
                      {cleanedData.images[currentImageIndex].classification === 'food' && '🍔'}
                      {cleanedData.images[currentImageIndex].classification === 'exterior' && '🏪'}
                      {cleanedData.images[currentImageIndex].classification === 'interior' && '🪑'}
                    </div>
                    <div className="image-label">
                      <span className="label-badge">{cleanedData.images[currentImageIndex].type}</span>
                      <span className="label-text">{cleanedData.images[currentImageIndex].classification}</span>
                    </div>
                  </div>
                  <div className="thumbnail-row">
                    {cleanedData.images.map((img, index) => (
                      <div
                        key={index}
                        className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                        onClick={() => setCurrentImageIndex(index)}
                      >
                        {img.classification === 'food' && '🍔'}
                        {img.classification === 'exterior' && '🏪'}
                        {img.classification === 'interior' && '🪑'}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="description-section enhanced">
                <p className="description">{cleanedData.description}</p>
              </div>

              <div className="features-section">
                <h4>Features:</h4>
                <div className="feature-tags">
                  {cleanedData.dining_features.map((feature, i) => (
                    <span key={i} className="feature-tag">
                      ✓ {feature}
                    </span>
                  ))}
                </div>
              </div>

              <div className="quality-badge">
                <span className="badge-icon">🏆</span>
                <span className="badge-text">Quality Score: {cleanedData.quality_score}%</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="impact-summary">
        <div className="impact-header">
          <h3>💡 The Impact of Data Enhancement</h3>
        </div>
        <div className="impact-grid">
          <div className="impact-item">
            <div className="impact-number">5x</div>
            <div className="impact-label">More searchable fields</div>
          </div>
          <div className="impact-item">
            <div className="impact-number">98%</div>
            <div className="impact-label">Data quality score</div>
          </div>
          <div className="impact-item">
            <div className="impact-number">100%</div>
            <div className="impact-label">GPS accuracy</div>
          </div>
          <div className="impact-item">
            <div className="impact-number">+AI</div>
            <div className="impact-label">Generated metadata</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalProduct;
