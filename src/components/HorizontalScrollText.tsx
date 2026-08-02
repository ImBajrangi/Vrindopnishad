import React from 'react';
import TextMorph from './originkit/ui/text-morph';

interface HorizontalScrollTextProps {
  className?: string;
}

const MORPH_WORDS = [
  "DISCOVER SACRED WISDOM",
  "EXPERIENCE DIVINE ART",
  "JOURNEY THROUGH SPIRITUALITY",
  "EMBRACE ANCIENT KNOWLEDGE",
  "SATVIC LIVING & PILGRIMAGE",
  "ETERNAL VEDIC PATH"
];

export const HorizontalScrollText: React.FC<HorizontalScrollTextProps> = ({
  className = ''
}) => {
  return (
    <section
      className={`sacred-text-showcase-section ${className}`}
      style={{
        position: 'relative',
        padding: '3rem 1.5rem',
        background: 'linear-gradient(180deg, #020408 0%, #060b16 50%, #020408 100%)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        overflow: 'hidden',
        minHeight: '260px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {/* Ambient subtle background glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '180px',
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.05) 0%, transparent 75%)',
          filter: 'blur(30px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* Minimal Header Tag */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '1.5rem'
        }}
      >
        <span style={{ color: '#38bdf8', fontSize: '0.75rem' }}>✦</span>
        <span
          style={{
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(255, 255, 255, 0.45)',
            fontFamily: '"sama-latin", sans-serif'
          }}
        >
          SACRED TRANSMISSION
        </span>
      </div>

      {/* Main Liquid Morph Display */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: '1100px',
          height: '120px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <TextMorph
          words={MORPH_WORDS}
          color="#FFFFFF"
          font={{
            fontFamily: '"Roboto Flex", "sama-latin", sans-serif',
            fontSize: 'clamp(22px, 3.8vw, 44px)',
            fontWeight: 100,
            letterSpacing: '0.14em',
            textAlign: 'center'
          }}
          transition={{
            duration: 1.2,
            delay: 1.4,
            ease: 'easeInOut'
          }}
        />
      </div>
    </section>
  );
};

export default HorizontalScrollText;
