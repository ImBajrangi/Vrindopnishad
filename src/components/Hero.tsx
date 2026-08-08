import React from 'react';
import SideRays from './SideRays';

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
      {/* Background SideRays WebGL Light Effect */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
        <SideRays
          speed={1.5}
          darkRayColor1="#e7c354"
          darkRayColor2="#96c8ff"
          lightRayColor1="#ca8a04"
          lightRayColor2="#2563eb"
          darkIntensity={0.6}
          lightIntensity={0.38}
          darkOpacity={0.85}
          lightOpacity={0.5}
          spread={2.3}
          origin="top-right"
          tilt={0}
          saturation={1.7}
          blend={0.85}
          falloff={1.6}
        />
      </div>

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
          <h1 className="hero-title" style={{ textAlign: 'center', margin: '0 0 1rem 0', width: '100%' }}>
            <div className="title-row" style={{ justifyContent: 'center', marginBottom: '0.5rem' }}>
              <span className="title-small" style={{ textTransform: 'uppercase', letterSpacing: '0.3em', opacity: 0.85, fontSize: 'clamp(0.85rem, 1.5vw, 1.05rem)', fontWeight: 600 }}>
                WELCOME TO
              </span>
            </div>
            <div className="title-row" style={{ justifyContent: 'center' }}>
              <span className="title-main" style={{ fontSize: 'clamp(3.8rem, 10vw, 8rem)', lineHeight: 0.95 }}>Vrindopnishad</span>
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
              margin: '0.8rem 0 0.5rem',
              textAlign: 'center'
            }}
          >
            <span style={{ fontSize: 'clamp(1.25rem, 2.8vw, 1.7rem)', color: 'var(--text-color)', fontWeight: 500, lineHeight: 1.4 }}>
              Where <strong>ancient wisdom</strong> meets <strong>modern innovation</strong>
            </span>
          </div>

          {/* Description */}
          <div className="hero-description" style={{ maxWidth: '780px', margin: '1rem auto 1.5rem', textAlign: 'center' }}>
            <p style={{ fontSize: 'clamp(1.05rem, 2.2vw, 1.28rem)', lineHeight: 1.55, color: 'var(--secondary-color)' }}>
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
            <a href="#our-story" className="hero-btn hero-btn-primary" style={{ padding: '0.85rem 2.2rem', fontSize: '1rem' }}>
              <span>Discover Our Story</span>
              <span className="btn-arrow">→</span>
            </a>
            <a href="#projects" className="hero-btn hero-btn-secondary" style={{ padding: '0.85rem 2.2rem', fontSize: '1rem' }}>
              <span>View Projects</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

