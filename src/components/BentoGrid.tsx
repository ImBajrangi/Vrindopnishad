import React from 'react';
import LEDTicker from './originkit/ui/pixel-led-display';

export const BentoGrid: React.FC = () => {
  return (
    <section id="services" className="bento-section">
      <div className="bento-container">
        <div className="bento-header">
          <span className="bento-label fade-up-off">EXPLORE</span>
          <div className="bento-title-pixel" style={{ width: '100%', height: '80px', margin: '0.5rem 0 1rem 0' }}>
            <LEDTicker items={["For You"]} separator="" speed={0} onColor="#FFFFFF" offColor="transparent" />
          </div>
        </div>

        <div className="bento-grid staggered-list">
          <a href="#services" className="bento-card bento-hero staggered-item">
            <div className="bento-number">01</div>
            <div className="bento-content">
              <h3>Order Food</h3>
              <p>Foody Vrinda — Delicious homemade meals delivered fresh</p>
            </div>
            <div className="bento-arrow">→</div>
          </a>

          <a href="https://pic.vrindopnishad.in/" className="bento-card staggered-item" target="_blank" rel="noopener noreferrer">
            <div className="bento-number">02</div>
            <div className="bento-content">
              <h3>Gallery</h3>
              <p>Divine art collection</p>
            </div>
            <div className="bento-arrow">→</div>
          </a>

          <a href="https://to.vrindopnishad.in/" className="bento-card staggered-item" target="_blank" rel="noopener noreferrer">
            <div className="bento-number">03</div>
            <div className="bento-content">
              <h3>Vrinda Tours</h3>
              <p>Sacred pilgrimages</p>
            </div>
            <div className="bento-arrow">→</div>
          </a>

          <a href="https://path.vrindopnishad.in/" className="bento-card bento-wide staggered-item" target="_blank" rel="noopener noreferrer">
            <div className="bento-number">04</div>
            <div className="bento-content">
              <h3>Sacred Texts</h3>
              <p>Ancient wisdom and spiritual teachings from timeless traditions</p>
            </div>
            <div className="bento-arrow">→</div>
          </a>

          <a href="https://vrindopnishad.in/Vrindopnishad%20Web/pdf/main/pdf-viewer.html" className="bento-card staggered-item" target="_blank" rel="noopener noreferrer">
            <div className="bento-number">05</div>
            <div className="bento-content">
              <h3>PDF Library</h3>
              <p>Digital resources</p>
            </div>
            <div className="bento-arrow">→</div>
          </a>

          <a href="https://vrindopnishad.in/" className="bento-card staggered-item" target="_blank" rel="noopener noreferrer">
            <div className="bento-number">06</div>
            <div className="bento-content">
              <h3>Web Dev</h3>
              <p>Custom websites & digital solutions</p>
            </div>
            <div className="bento-arrow">→</div>
          </a>

          <a href="https://path.vrindopnishad.in/" className="bento-card staggered-item" target="_blank" rel="noopener noreferrer">
            <div className="bento-number">07</div>
            <div className="bento-content">
              <h3>Bhajan Path</h3>
              <p>Sacred Shlokas & Vedic Guidance — Dive into timeless spiritual wisdom</p>
            </div>
            <div className="bento-arrow">→</div>
          </a>
        </div>

        {/* More Creations - Continuous Connected Minimal List */}
        <div className="more-section" style={{ padding: '4rem 0 0 0' }}>
          <h3 className="more-title content__title fade-up-off" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, margin: '0 0 2rem 0' }}>
            More Creations
          </h3>
          <div className="more-grid staggered-list">
            <a href="https://pic.vrindopnishad.in/" className="more-item staggered-item" target="_blank" rel="noopener noreferrer">
              <span className="more-num">08</span>
              <div className="more-info">
                <span className="more-name">Photo Gallery</span>
                <span className="more-cat">Digital Art Collection</span>
              </div>
              <span className="more-arrow">→</span>
            </a>
            <a href="https://path.vrindopnishad.in/" className="more-item staggered-item" target="_blank" rel="noopener noreferrer">
              <span className="more-num">09</span>
              <div className="more-info">
                <span className="more-name">Vrindopnishad App</span>
                <span className="more-cat">Spiritual Wisdom & App</span>
              </div>
              <span className="more-arrow">→</span>
            </a>
            <a href="https://vrindopnishad.in/Vrindopnishad%20Web/pdf/main/pdf-viewer.html" className="more-item staggered-item" target="_blank" rel="noopener noreferrer">
              <span className="more-num">10</span>
              <div className="more-info">
                <span className="more-name">PDF Library</span>
                <span className="more-cat">Document Archive</span>
              </div>
              <span className="more-arrow">→</span>
            </a>
            <a href="https://vrindopnishad.in/" className="more-item staggered-item" target="_blank" rel="noopener noreferrer">
              <span className="more-num">11</span>
              <div className="more-info">
                <span className="more-name">Web Development</span>
                <span className="more-cat">Custom Digital Solutions</span>
              </div>
              <span className="more-arrow">→</span>
            </a>
            <a href="https://path.vrindopnishad.in/" className="more-item staggered-item" target="_blank" rel="noopener noreferrer">
              <span className="more-num">12</span>
              <div className="more-info">
                <span className="more-name">Sant-Vaani</span>
                <span className="more-cat">Sacred Shlokas & Spiritual Content</span>
              </div>
              <span className="more-arrow">→</span>
            </a>
            <a href="https://path.vrindopnishad.in/" className="more-item staggered-item" target="_blank" rel="noopener noreferrer">
              <span className="more-num">13</span>
              <div className="more-info">
                <span className="more-name">Bhajan Path</span>
                <span className="more-cat">Vedic Path & Spiritual Guidance</span>
              </div>
              <span className="more-arrow">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
