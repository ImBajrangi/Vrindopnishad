import React from 'react';
import LEDTicker from './originkit/ui/pixel-led-display';

export const AppsSection: React.FC = () => {
  return (
    <section id="download-apps" className="apps-section">
      <div className="apps-container">
        <div className="apps-header">
          <span className="apps-label fade-up-off">DOWNLOAD</span>
          <div className="apps-title-pixel" style={{ width: '100%', height: '80px', margin: '0.5rem 0 1rem 0' }}>
            <LEDTicker items={["Get Apps"]} separator="" speed={0} onColor="#FFFFFF" offColor="transparent" />
          </div>
        </div>

        <div className="apps-bento staggered-list">
          <a 
            href="Vrindopnishad%20Web/web-extentions/apk/foodyVrinda.apk" 
            className="apps-card apps-featured staggered-item" 
            download
          >
            <div className="apps-tag">FEATURED</div>
            <div className="apps-icon">
              <img 
                src="Vrindopnishad%20Web/class/logo/vrinda%20foods%20logo1.png" 
                alt="Foody Vrinda"
                loading="lazy" 
              />
            </div>
            <div className="apps-info">
              <h3>Foody Vrinda</h3>
              <p>Cloud kitchen • Food ordering & delivery</p>
            </div>
            <div className="apps-meta">
              <span className="apps-platform">Android</span>
              <span className="apps-size">81 MB</span>
            </div>
            <div className="apps-cta">
              <span>↓ Download APK</span>
            </div>
          </a>

          <a 
            href="Vrindopnishad%20Web/web-extentions/apk/vrindaRead.apk" 
            className="apps-card staggered-item"
            download
          >
            <div className="apps-icon">
              <img 
                src="Vrindopnishad%20Web/class/v-logo-rounded/android-chrome-512x512.png" 
                alt="Vrindopnishad App"
                loading="lazy" 
              />
            </div>
            <div className="apps-info">
              <h3>Vrindopnishad App</h3>
              <p>Spiritual scriptures & mantras</p>
            </div>
            <div className="apps-meta">
              <span className="apps-platform">Android</span>
              <span className="apps-size">81 MB</span>
            </div>
            <div className="apps-cta"><span>↓</span></div>
          </a>

          <a href="https://to.vrindopnishad.in/" className="apps-card staggered-item" target="_blank" rel="noopener noreferrer">
            <div className="apps-icon">
              <img 
                src="Vrindopnishad%20Web/class/vrindaTours-logo-rounded/android-chrome-512x512.png" 
                alt="Vrinda Tours"
                loading="lazy" 
              />
            </div>
            <div className="apps-info">
              <h3>Vrinda Tours</h3>
              <p>Pilgrimage map & guide</p>
            </div>
            <div className="apps-meta">
              <span className="apps-platform apps-web">Web</span>
            </div>
            <div className="apps-cta"><span>→</span></div>
          </a>

          <a href="https://pic.vrindopnishad.in/" className="apps-card staggered-item" target="_blank" rel="noopener noreferrer">
            <div className="apps-icon">
              <img 
                src="Vrindopnishad%20Web/class/v-logo-rounded/android-chrome-512x512.png" 
                alt="Photo Gallery"
                loading="lazy" 
              />
            </div>
            <div className="apps-info">
              <h3>Gallery</h3>
              <p>Divine art collection</p>
            </div>
            <div className="apps-meta">
              <span className="apps-platform apps-web">Web</span>
            </div>
            <div className="apps-cta"><span>→</span></div>
          </a>

          <a href="https://path.vrindopnishad.in/" className="apps-card staggered-item" target="_blank" rel="noopener noreferrer">
            <div className="apps-icon">
              <img 
                src="Vrindopnishad%20Web/class/v-logo-rounded/official-logo.svg" 
                alt="Bhajan Path"
                loading="lazy" 
              />
            </div>
            <div className="apps-info">
              <h3>Bhajan Path</h3>
              <p>Sacred shlokas & spiritual guidance</p>
            </div>
            <div className="apps-meta">
              <span className="apps-platform apps-web">Web</span>
            </div>
            <div className="apps-cta"><span>→</span></div>
          </a>
        </div>
      </div>
    </section>
  );
};
