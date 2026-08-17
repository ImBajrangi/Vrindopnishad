import React from 'react';

interface HeroProps {
  lang?: 'english' | 'hindi';
}

export const Hero: React.FC<HeroProps> = ({ lang = 'english' }) => {
  return (
    <section
      id="home"
      className="hero-section"
      style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: 'calc(100vh - 80px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(90px, 11vh, 120px) 1.5rem clamp(2.5rem, 5vh, 4rem)',
        boxSizing: 'border-box'
      }}
    >
      <div
        className="hero-container"
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1100px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}
      >
        {/* Top Header Group */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
          <h1 className="hero-title" style={{ textAlign: 'center', margin: '0 0 1.25rem 0', width: '100%' }}>
            <div className="title-row" style={{ justifyContent: 'center', marginBottom: '0.65rem' }}>
              <span className="title-small" style={{ textTransform: 'uppercase', letterSpacing: '0.32em', opacity: 0.9, fontSize: 'clamp(0.95rem, 1.8vw, 1.25rem)', fontWeight: 600 }}>
                WELCOME TO
              </span>
            </div>
            <div className="title-row" style={{ justifyContent: 'center', width: '100%', maxWidth: '100%' }}>
              <span
                className="title-main"
                style={{
                  fontSize: 'clamp(2.8rem, 12.5vw, 8.8rem)',
                  lineHeight: 0.94,
                  maxWidth: '100%',
                  display: 'inline-block',
                  wordBreak: 'break-word',
                  overflowWrap: 'break-word',
                  letterSpacing: '-0.02em'
                }}
              >
                Vrindopnishad
              </span>
            </div>
          </h1>

          {/* Tagline */}
          <div
            className="hero-tagline"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              flexWrap: 'wrap',
              margin: '0.9rem 0 0.6rem',
              textAlign: 'center'
            }}
          >
            <span style={{ fontSize: 'clamp(1.4rem, 3.2vw, 2.1rem)', color: 'var(--text-color)', fontWeight: 500, lineHeight: 1.35 }}>
              Where <strong>ancient wisdom</strong> meets <strong>modern innovation</strong>
            </span>
          </div>

          {/* Description */}
          <div className="hero-description" style={{ maxWidth: '820px', margin: '1.2rem auto 1.8rem', textAlign: 'center' }}>
            <p style={{ fontSize: 'clamp(1.15rem, 2.4vw, 1.45rem)', lineHeight: 1.55, color: 'var(--secondary-color)' }}>
              {lang === 'hindi'
                ? 'भोजन, कला, यात्रा और अध्यात्म का अनूठा संगम।'
                : 'Connecting food, art, travel, and sacred wisdom in one sanctuary.'}
            </p>
          </div>

          {/* CTA Group */}
          <div
            className="hero-cta-group"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.25rem',
              flexWrap: 'wrap',
              margin: '0.5rem 0'
            }}
          >
            <a href="#our-story" className="hero-btn hero-btn-primary" style={{ padding: '0.85rem 2.2rem', fontSize: '1.05rem' }}>
              <span>Discover Our Story</span>
              <span className="btn-arrow">→</span>
            </a>
            <a href="#projects" className="hero-btn hero-btn-secondary" style={{ padding: '0.85rem 2.2rem', fontSize: '1.05rem' }}>
              <span>View Projects</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

