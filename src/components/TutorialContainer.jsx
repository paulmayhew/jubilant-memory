import React, { useState } from 'react';
import InfoButton from './InfoButton';
import CrawlerDemo from './CrawlerDemo';
import WebsiteMockup from './WebsiteMockup';
import FieldHighlighter from './FieldHighlighter';
import DataComparison from './DataComparison';
import PipelineAnimation from './PipelineAnimation';
import CleaningDemo from './CleaningDemo';
import FinalProduct from './FinalProduct';
import './TutorialContainer.css';

const TutorialContainer = () => {
  const [stepIndex, setStepIndex] = useState(0);

  return (
    <div className="tutorial-container">
      <div className="tutorial-header">
        <h1>Content Pipeline: From Web to Data</h1>
        <p>Explore each step at your own pace. Click "What am I seeing?" for context.</p>
      </div>

      <div className="tutorial-content">
        {/* Step 1: Crawler Demo */}
        <section className="tutorial-section">
          <div className="section-header">
            <h2>Step 1: Automated Discovery</h2>
            <InfoButton
              title="How Discovery Works"
              position="left"
              content={
                <>
                  <p><strong>What you're seeing:</strong> Our spiders automatically crawl websites to find all listings.</p>
                  <p>Try switching between different <strong>source types</strong> (Web Page, JSON, API, Database) to see we can collect data from any format.</p>
                  <p><strong>Key features:</strong></p>
                  <ul>
                    <li>Discovers all 9 listings automatically</li>
                    <li>Filters for only restaurants (5 found)</li>
                    <li>Skips hotels and attractions</li>
                    <li>Works with any data source</li>
                  </ul>
                </>
              }
            />
          </div>
          <div className="crawler-demo">
            <CrawlerDemo active={true} />
          </div>
        </section>

        {/* Step 2: Website Mockup */}
        <section className="tutorial-section">
          <div className="section-header">
            <h2>Step 2: Visible vs Hidden Data</h2>
            <InfoButton
              title="Hidden Data Sources"
              position="left"
              content={
                <>
                  <p><strong>What you're seeing:</strong> A typical restaurant page with both visible and hidden data.</p>
                  <p>Click <strong>"Scraper View"</strong> to reveal data invisible to users:</p>
                  <ul>
                    <li><strong>JSON-LD:</strong> Structured data with GPS, ratings, reviews</li>
                    <li><strong>Shadow DOM:</strong> Encapsulated widgets and components</li>
                    <li><strong>JavaScript:</strong> Runtime data like menus and availability</li>
                    <li><strong>API Calls:</strong> Network requests for reviews, trails, events</li>
                  </ul>
                  <p>We extract <strong>5-10x more information</strong> than what's visible on the page!</p>
                </>
              }
            />
          </div>
          <div className="website-mockup">
            <WebsiteMockup />
          </div>
        </section>

        {/* Step 3: Field Identification */}
        <section className="tutorial-section">
          <div className="section-header">
            <h2>Step 3: Field Identification</h2>
            <InfoButton
              title="Smart Field Extraction"
              position="left"
              content={
                <>
                  <p><strong>What you're seeing:</strong> Our spiders automatically identify which fields to extract.</p>
                  <p>Watch as each field is highlighted:</p>
                  <ul>
                    <li><strong>Name:</strong> Business identifier</li>
                    <li><strong>Address:</strong> Location information</li>
                    <li><strong>Phone:</strong> Contact details</li>
                    <li><strong>Hours:</strong> Operating schedule</li>
                    <li><strong>Images:</strong> Visual content</li>
                  </ul>
                  <p>No manual configuration needed - the spider knows what to look for!</p>
                </>
              }
            />
          </div>
          <div className="field-highlighter">
            <FieldHighlighter active={true} />
          </div>
        </section>

        {/* Step 4: Raw Data */}
        <section className="tutorial-section">
          <div className="section-header">
            <h2>Step 4: Raw Scraped Data</h2>
            <InfoButton
              title="The Problem with Raw Data"
              position="left"
              content={
                <>
                  <p><strong>What you're seeing:</strong> Data as it comes from the website - messy and unstructured.</p>
                  <p><strong>Issues to fix:</strong></p>
                  <ul>
                    <li>Name in ALL CAPS</li>
                    <li>Inconsistent phone formatting</li>
                    <li>Incomplete address</li>
                    <li>Missing GPS coordinates</li>
                    <li>Unstructured hours</li>
                    <li>Unvalidated images</li>
                  </ul>
                  <p>This is why we need the quality pipeline...</p>
                </>
              }
            />
          </div>
          <div className="data-view-raw">
            <DataComparison type="raw" />
          </div>
        </section>

        {/* Step 5: Pipeline */}
        <section className="tutorial-section">
          <div className="section-header">
            <h2>Step 5: Quality Pipeline</h2>
            <InfoButton
              title="8-Stage Processing"
              position="left"
              content={
                <>
                  <p><strong>What you're seeing:</strong> Every record flows through 8 automated stages.</p>
                  <p><strong>The stages:</strong></p>
                  <ul>
                    <li>HTML archiving for audit trail</li>
                    <li>Unique ID generation</li>
                    <li>Character decoding</li>
                    <li>Content cleaning & sanitization</li>
                    <li>Media classification</li>
                    <li>Phone number extraction</li>
                    <li>Field validation</li>
                    <li>Database storage</li>
                  </ul>
                  <p>Watch the data packet move through each stage!</p>
                </>
              }
            />
          </div>
          <div className="pipeline-animation">
            <PipelineAnimation active={true} />
          </div>
        </section>

        {/* Step 6: Cleaning Demo */}
        <section className="tutorial-section">
          <div className="section-header">
            <h2>Step 6: Data Transformation</h2>
            <InfoButton
              title="Before & After"
              position="left"
              content={
                <>
                  <p><strong>What you're seeing:</strong> Real-time transformations of messy data.</p>
                  <p><strong>Transformations:</strong></p>
                  <ul>
                    <li><strong>Phone:</strong> (435) 555-1234 → 435-555-1234</li>
                    <li><strong>Name:</strong> BOB'S BURGERS → Bob's Burgers</li>
                    <li><strong>Address:</strong> Added GPS coordinates via geocoding</li>
                  </ul>
                  <p>Using professional services (SmartyStreets, Google) for <strong>98% accuracy</strong>!</p>
                </>
              }
            />
          </div>
          <div className="cleaning-demo">
            <CleaningDemo active={true} />
          </div>
        </section>

        {/* Step 7: Clean Data */}
        <section className="tutorial-section">
          <div className="section-header">
            <h2>Step 7: Production-Ready Data</h2>
            <InfoButton
              title="The Final Result"
              position="left"
              content={
                <>
                  <p><strong>What you're seeing:</strong> Clean, validated, enriched data ready for production.</p>
                  <p><strong>Improvements:</strong></p>
                  <ul>
                    <li>✓ Proper formatting</li>
                    <li>✓ GPS coordinates added (38.5733, -109.5498)</li>
                    <li>✓ Structured hours object</li>
                    <li>✓ AI-generated categories & descriptions</li>
                    <li>✓ Validated & classified images</li>
                    <li>✓ 98% quality score</li>
                  </ul>
                  <p><strong>Result:</strong> 90% reduction in manual work, fresher data, consistent quality!</p>
                </>
              }
            />
          </div>
          <div className="data-view-clean">
            <DataComparison type="clean" />
          </div>
        </section>

        {/* Step 8: Final Product */}
        <section className="tutorial-section">
          <div className="section-header">
            <h2>Step 8: The Enhanced Final Product</h2>
            <InfoButton
              title="Real-World Impact"
              position="left"
              content={
                <>
                  <p><strong>What you're seeing:</strong> A side-by-side comparison showing how enhanced data creates a superior user experience.</p>
                  <p><strong>Key Differences:</strong></p>
                  <ul>
                    <li><strong>Left:</strong> Basic scrape with messy formatting, missing GPS, no categories</li>
                    <li><strong>Right:</strong> Enhanced with AI categories, professional description, structured data</li>
                  </ul>
                  <p><strong>The Result:</strong> 5x more searchable fields, 100% GPS accuracy, professional presentation!</p>
                </>
              }
            />
          </div>
          <div className="final-product">
            <FinalProduct />
          </div>
        </section>
      </div>

      <div className="tutorial-footer">
        <p>95% less work • 90% fresher data • AI-enhanced • Fully automated</p>
      </div>
    </div>
  );
};

export default TutorialContainer;
