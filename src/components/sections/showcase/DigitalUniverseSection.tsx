import React from 'react';

interface DigitalUniverseSectionProps {
  lang?: 'english' | 'hindi';
}

export const DigitalUniverseSection: React.FC<DigitalUniverseSectionProps> = ({ lang = 'english' }) => {
  return (
    <section id="about" className="universe-section">
      <div className="universe-container staggered-list">
        {/* Left: Visual */}
        <div className="universe-visual staggered-item">
          <div className="universe-image-wrapper">
            <img
              src="/images/krshn/vrindopnishad-digital-universe.jpg"
              alt="Vrindopnishad Digital Universe"
              loading="lazy"
            />
            <div className="universe-overlay"></div>
          </div>
          <div className="universe-badge">
            <span className="universe-year">EST.</span>
            <span className="universe-year-num">2024</span>
          </div>
        </div>

        {/* Right: Content */}
        <div className="universe-content">
          <span className="universe-label fade-up-off">
            {lang === 'english' ? 'ABOUT US' : 'हमारे बारे में'}
          </span>
          <h2 className="universe-title content__title">
            {lang === 'english' ? 'Digital Universe' : 'डिजिटल ब्रह्मांड'}
          </h2>

          <div className="universe-quote fade-up-off">
            <span className="quote-mark">"</span>
            <p>
              {lang === 'english'
                ? 'Where ancient wisdom meets modern creativity'
                : 'जहाँ सनातन ज्ञान और आधुनिक सृजनात्मकता का संगम होता है'}
            </p>
          </div>

          <div className="universe-text fade-up-off">
            <p>
              {lang === 'english'
                ? "Vrindopnishad is more than a website—it's a digital sanctuary. Our platform bridges traditional artistic expressions with contemporary digital innovations, offering a unique space for spiritual and creative exploration."
                : 'वृंदोपनिषद केवल एक वेबसाइट नहीं—यह एक डिजिटल देवालय है। हमारा मंच पारम्परिक कलात्मक अभिव्यक्तियों को आधुनिक डिजिटल तकनीकों से जोड़ता है।'}
            </p>
          </div>

          <div className="universe-stats staggered-list">
            <div className="stat-item staggered-item">
              <span className="stat-num">4+</span>
              <span className="stat-label">{lang === 'english' ? 'Projects' : 'परियोजनाएं'}</span>
            </div>
            <div className="stat-item staggered-item">
              <span className="stat-num">∞</span>
              <span className="stat-label">{lang === 'english' ? 'Creativity' : 'रचनात्मकता'}</span>
            </div>
            <div className="stat-item staggered-item">
              <span className="stat-num">1</span>
              <span className="stat-label">{lang === 'english' ? 'Mission' : 'लक्ष्य'}</span>
            </div>
          </div>

          <a href="#services" className="universe-cta fade-up-off">
            <span>{lang === 'english' ? 'Explore More' : 'और जानें'}</span>
            <span className="cta-arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default DigitalUniverseSection;
