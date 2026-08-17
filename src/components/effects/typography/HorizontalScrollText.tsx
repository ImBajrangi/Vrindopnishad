import React from 'react';
import TextMorph from '../../originkit/ui/text-morph';
import './HorizontalScrollText.css';

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
    <section className={`sacred-text-showcase-section ${className}`}>
      {/* Ambient subtle background glow */}
      <div className="sacred-ambient-glow" />

      {/* Main Liquid Morph Display */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: '1200px',
          height: '100px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <TextMorph
          words={MORPH_WORDS}
          color="currentColor"
          font={{
            fontFamily: '"Roboto Flex", "sama-latin", -apple-system, BlinkMacSystemFont, sans-serif',
            fontSize: 'clamp(20px, 3.5vw, 42px)',
            fontWeight: 200,
            letterSpacing: '0.16em',
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
