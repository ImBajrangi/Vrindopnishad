import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BlurText from './BlurText';

interface SanctuaryExperienceSectionProps {
  lang: 'english' | 'hindi';
}

interface VerseData {
  id: string;
  number: string;
  title: string;
  titleHindi: string;
  verseHindi: string;
  transliteration: string;
  translation: string;
  duration: string;
  color: string;
  glow: string;
}

const SACRED_VERSES: VerseData[] = [
  {
    id: 'shanti-path',
    number: '01',
    title: 'Shanti Path',
    titleHindi: 'शांति पाठ',
    verseHindi: 'ॐ पूर्णमदः पूर्णमिदं पूर्णात्पूर्णमुदच्यते ।\nपूर्णस्य पूर्णमादाय पूर्णमेवावशिष्यते ॥',
    transliteration: 'Om Poornamadah Poornamidam Poornaat Poornamudachyate |\nPoornasya Poornamaadaaya Poornamevaavashishyate ||',
    translation: 'That is Infinite, This is Infinite. From Infinity, Infinity manifests.\nWhen Infinity is drawn from Infinity, Infinity alone remains.',
    duration: '03:45',
    color: '#c3f53c',
    glow: 'rgba(195, 245, 60, 0.25)'
  },
  {
    id: 'maha-mantra',
    number: '02',
    title: 'Maha Mantra',
    titleHindi: 'महामंत्र',
    verseHindi: 'हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे।\nहरे राम हरे राम राम राम हरे हरे॥',
    transliteration: 'Hare Krishna Hare Krishna Krishna Krishna Hare Hare |\nHare Rama Hare Rama Rama Rama Hare Hare ||',
    translation: 'The supreme transcendental sound vibration for spiritual enlightenment, inner clarity, and universal peace.',
    duration: '04:12',
    color: '#f59e0b',
    glow: 'rgba(245, 158, 11, 0.25)'
  },
  {
    id: 'mangalacharan',
    number: '03',
    title: 'Mangalacharan',
    titleHindi: 'मंगलाचरण',
    verseHindi: 'ॐ भद्रं कर्णेभिः शृणुयाम देवाः।\nभद्रं पश्येमाक्षभिर्यजत्राः॥',
    transliteration: 'Om Bhadram Karnebhih Shrinuyaama Devaah |\nBhadram Pashyemaakshabhiryajatraah ||',
    translation: 'May we hear auspicious words with our ears, and behold divine goodness with our eyes in sacred worship.',
    duration: '02:50',
    color: '#10b981',
    glow: 'rgba(16, 185, 129, 0.25)'
  }
];

const renderAgamaResonanceHeadline = () => {
  const critterStyle: React.CSSProperties = {
    fontFamily: '"critter-std", sans-serif',
    fontWeight: 400,
    fontSize: '1.08em',
    display: 'inline-block',
    lineHeight: 0.9,
    verticalAlign: 'baseline',
    marginRight: '0.02em'
  };

  const samaStyle: React.CSSProperties = {
    fontFamily: '"sama-latin", sans-serif',
    fontWeight: 800
  };

  return (
    <>
      <span style={critterStyle}>A</span>
      <span style={critterStyle}>g</span>
      <span style={critterStyle}>a</span>
      <span style={samaStyle}>ma</span>
      <span> </span>
      <span style={critterStyle}>R</span>
      <span style={samaStyle}>esonance</span>
    </>
  );
};

export const SanctuaryExperienceSection: React.FC<SanctuaryExperienceSectionProps> = ({ lang }) => {
  const [activeVerseIndex, setActiveVerseIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const activeVerse = SACRED_VERSES[activeVerseIndex];

  // Subtle Ambient Stardust Particle Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const particleCount = 25;
    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      speedY: number;
      speedX: number;
      alpha: number;
    }> = [];

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.4 + 0.4,
        speedY: -(Math.random() * 0.25 + 0.1),
        speedX: (Math.random() - 0.5) * 0.2,
        alpha: Math.random() * 0.4
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;

        if (p.y < 0) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = activeVerse.color;
        ctx.globalAlpha = p.alpha * (isPlaying ? 0.7 : 0.25);
        ctx.fill();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isPlaying, activeVerse.color]);

  const handlePrevVerse = () => {
    setActiveVerseIndex((prev) => (prev === 0 ? SACRED_VERSES.length - 1 : prev - 1));
  };

  const handleNextVerse = () => {
    setActiveVerseIndex((prev) => (prev === SACRED_VERSES.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      id="recitation"
      className="sanctuary-section"
      style={{
        padding: '5.5rem 1.5rem 5rem',
        background: 'rgba(10, 10, 14, 0.45)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        color: '#ffffff',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Background Subtle Particle Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.6
        }}
      />

      {/* Light Ambient Glow (No Heavy Dark Overlays) */}
      <motion.div
        animate={{
          background: `radial-gradient(circle at 50% 50%, ${activeVerse.glow} 0%, rgba(10, 10, 14, 0) 65%)`
        }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div style={{ maxWidth: '1040px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h2
            className="sanctuary-title"
            style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: '#ffffff',
              maxWidth: '1000px',
              margin: '0 auto 0.8rem',
              display: 'block'
            }}
          >
            {lang === 'english' ? renderAgamaResonanceHeadline() : 'आगम पाठ'}
          </h2>

          <p
            className="sanctuary-subtitle"
            style={{
              fontSize: 'clamp(0.95rem, 1.6vw, 1.1rem)',
              color: '#94a3b8',
              maxWidth: '600px',
              margin: '0 auto',
              fontFamily: '"sama-latin", sans-serif',
              fontWeight: 400,
              lineHeight: '1.5',
              letterSpacing: '0.01em'
            }}
          >
            {lang === 'english'
              ? 'Experience divine recitations & sacred resonance everyday'
              : 'आत्मिक शांति और सकारात्मक ऊर्जा का अटूट स्रोत'}
          </p>
        </div>

        {/* Minimal Segmented Track Selector */}
        <div
          className="verse-tabs-container"
          style={{
            display: 'inline-flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.35rem',
            padding: '0.35rem 0.5rem',
            borderRadius: '999px',
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
            margin: '0 auto 2.5rem auto',
            maxWidth: '100%',
            boxSizing: 'border-box'
          }}
        >
          {SACRED_VERSES.map((v, i) => {
            const isActive = activeVerseIndex === i;
            return (
              <button
                key={v.id}
                onClick={() => {
                  setActiveVerseIndex(i);
                  setIsPlaying(true);
                }}
                className={`sanctuary-pill-tab ${isActive ? 'active' : ''}`}
                style={{
                  position: 'relative',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.5rem 1.1rem',
                  borderRadius: '999px',
                  fontFamily: '"sama-latin", sans-serif',
                  fontSize: '0.84rem',
                  fontWeight: isActive ? 700 : 500,
                  letterSpacing: '0.03em',
                  color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.65)',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.25s ease'
                }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeVerseTab"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '999px',
                      background: `rgba(0, 242, 254, 0.14)`,
                      border: `1px solid ${v.color}55`,
                      zIndex: 0
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    fontSize: '0.72rem',
                    opacity: isActive ? 1 : 0.6,
                    fontFamily: 'monospace',
                    color: isActive ? v.color : 'inherit',
                    fontWeight: 700
                  }}
                >
                  {isActive ? '✦' : v.number}
                </span>
                <span style={{ position: 'relative', zIndex: 1 }}>
                  {lang === 'english' ? v.title : v.titleHindi}
                </span>
              </button>
            );
          })}
        </div>

        {/* Unboxed Spatial Sanctuary Stage */}
        <div
          style={{
            position: 'relative',
            minHeight: '280px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '1.5rem 1rem'
          }}
        >
          {/* Subtle Om Watermark */}
          <div
            className="sanctuary-om-watermark"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '15rem',
              color: `rgba(255, 255, 255, 0.025)`,
              pointerEvents: 'none',
              fontFamily: 'Georgia, serif',
              userSelect: 'none',
              transition: 'color 0.8s ease'
            }}
          >
            ॐ
          </div>

          {/* Verse Text Content with Smooth Transition */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeVerse.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{ width: '100%', position: 'relative', zIndex: 1, willChange: 'opacity, transform' }}
            >
              {/* Devanagari Verse Text with Staggered BlurText */}
              <BlurText
                key={`verse-${activeVerse.id}`}
                text={activeVerse.verseHindi}
                delay={28}
                animateBy="words"
                direction="bottom"
                stepDuration={0.35}
                className="devanagari-text sanctuary-shloka-text"
                style={{
                  fontSize: 'clamp(1.3rem, 3.2vw, 2.4rem)',
                  fontWeight: 600,
                  color: '#ffffff',
                  lineHeight: '1.6',
                  fontFamily: '"sama-devanagari", sans-serif',
                  maxWidth: '920px',
                  margin: '0 auto 1.5rem',
                  textShadow: `0 2px 20px ${activeVerse.color}40`,
                  letterSpacing: '0.01em',
                  justifyContent: 'center'
                }}
              />

              {/* Transliteration Text with Relatability Accent Color */}
              <BlurText
                key={`translit-${activeVerse.id}`}
                text={activeVerse.transliteration}
                delay={18}
                animateBy="words"
                direction="bottom"
                stepDuration={0.3}
                className="sanctuary-translit-text"
                style={{
                  fontSize: 'clamp(0.88rem, 1.6vw, 1.08rem)',
                  fontStyle: 'italic',
                  color: activeVerse.color,
                  fontFamily: '"sama-latin", sans-serif',
                  letterSpacing: '0.02em',
                  maxWidth: '860px',
                  margin: '0 auto 1.8rem',
                  lineHeight: '1.6',
                  textShadow: `0 0 15px ${activeVerse.color}33`,
                  justifyContent: 'center'
                }}
              />

              {/* Translation Paragraph */}
              <BlurText
                key={`trans-${activeVerse.id}`}
                text={activeVerse.translation}
                delay={20}
                animateBy="words"
                direction="bottom"
                stepDuration={0.3}
                className="sanctuary-translation-text"
                style={{
                  fontSize: 'clamp(0.85rem, 1.3vw, 0.95rem)',
                  color: '#94a3b8',
                  maxWidth: '680px',
                  margin: '0 auto 2.5rem',
                  lineHeight: '1.6',
                  fontFamily: '"sama-latin", sans-serif',
                  justifyContent: 'center'
                }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Minimalist Floating Audio Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', zIndex: 2, marginTop: '0.5rem' }}>
            <button
              onClick={handlePrevVerse}
              aria-label="Previous Verse"
              className="sanctuary-arrow-btn"
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                cursor: 'pointer',
                backdropFilter: 'blur(16px)',
                transition: 'all 0.25s ease'
              }}
            >
              ‹
            </button>

            {/* Master Shiny Cyan Audio Pill Button */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setIsPlaying(!isPlaying)}
              className="sanctuary-audio-btn"
              style={{
                padding: '0.75rem 2rem',
                borderRadius: '999px',
                background: 'linear-gradient(135deg, #00f2fe 0%, #0284c7 100%)',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.92rem',
                fontFamily: '"sama-latin", sans-serif',
                border: 'none',
                boxShadow: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <span style={{ fontSize: '1rem' }}>{isPlaying ? '⏸' : '▶'}</span>
              <span>{isPlaying ? 'Pause Recitation' : 'Listen Recitation'}</span>
            </motion.button>

            <a
              href="https://path.vrindopnishad.in/"
              target="_blank"
              rel="noopener noreferrer"
              title="Open Bhajan Path Recitation Hub"
              className="sanctuary-hub-btn"
              style={{
                padding: '0.75rem 1.3rem',
                borderRadius: '999px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '0.85rem',
                fontFamily: '"sama-latin", sans-serif',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                whiteSpace: 'nowrap',
                backdropFilter: 'blur(16px)',
                transition: 'all 0.25s ease'
              }}
            >
              <span>Recitation Hub</span>
              <span style={{ fontSize: '1rem' }}>↗</span>
            </a>

            <button
              onClick={handleNextVerse}
              aria-label="Next Verse"
              className="sanctuary-arrow-btn"
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                cursor: 'pointer',
                backdropFilter: 'blur(16px)',
                transition: 'all 0.25s ease'
              }}
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SanctuaryExperienceSection;
