import React from 'react';
import SideRays from './SideRays';

export const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="hero-section"
      style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '85px 1.5rem 3rem',
        boxSizing: 'border-box'
      }}
    >
      {/* Background SideRays WebGL Light Effect */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, opacity: 0.85 }}>
        <SideRays
          speed={1.5}
          rayColor1="#e7c354"
          rayColor2="#96c8ff"
          intensity={0.6}
          spread={2.3}
          origin="top-right"
          tilt={0}
          saturation={1.7}
          blend={0.85}
          falloff={1.6}
          opacity={1.0}
        />
      </div>

      <div
        className="hero-container"
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '920px',
          width: '100%',
          margin: '1rem auto 0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          textAlign: 'center'
        }}
      >
        {/* Main Title */}
        <h1 className="hero-title" style={{ textAlign: 'center', margin: '0 0 1.5rem 0' }}>
          <div className="title-row" style={{ justifyContent: 'center' }}>
            <span className="title-small" style={{ textTransform: 'uppercase', letterSpacing: '0.25em', opacity: 0.8 }}>
              WELCOME TO
            </span>
          </div>
          <div className="title-row" style={{ justifyContent: 'center' }}>
            <span className="title-main">Vrindopnishad</span>
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
            marginTop: '0.5rem',
            textAlign: 'center'
          }}
        >
          <span style={{ fontSize: 'clamp(1.15rem, 2.5vw, 1.45rem)', color: 'var(--text-color)', fontWeight: 500, lineHeight: 1.4 }}>
            Where <strong>ancient wisdom</strong> meets <strong>modern innovation</strong>
          </span>
        </div>

        {/* Description */}
        <div className="hero-description" style={{ maxWidth: '680px', margin: '1.2rem auto 2rem', textAlign: 'center' }}>
          <p style={{ fontSize: 'clamp(0.98rem, 1.8vw, 1.12rem)', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.72)' }}>
            We craft digital experiences that connect food, art, travel, and spirituality under one purpose — serving you better.
          </p>
        </div>

        {/* CTA Group */}
        <div
          className="hero-cta-group"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.2rem',
            flexWrap: 'wrap',
            margin: '0.5rem 0 2.5rem'
          }}
        >
          <a href="#our-story" className="hero-btn hero-btn-primary">
            <span>Discover Our Story</span>
            <span className="btn-arrow">→</span>
          </a>
          <a href="#projects" className="hero-btn hero-btn-secondary">
            <span>View Projects</span>
          </a>
        </div>

        {/* Stats Strip */}
        <div className="hero-stats">
          <div className="stat" style={{ textAlign: 'center' }}>
            <span className="stat-num">4+</span>
            <span className="stat-text">Projects</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat" style={{ textAlign: 'center' }}>
            <span className="stat-num">∞</span>
            <span className="stat-text">Creativity</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat" style={{ textAlign: 'center' }}>
            <span className="stat-num">1</span>
            <span className="stat-text">Mission</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
