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
    color: '#38bdf8',
    glow: 'rgba(56, 189, 248, 0.4)'
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
    color: '#eab308',
    glow: 'rgba(234, 179, 8, 0.4)'
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
    color: '#c084fc',
    glow: 'rgba(192, 132, 252, 0.4)'
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

  // Ambient Stardust Incense Particle Canvas Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const particleCount = 45;
    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      speedY: number;
      speedX: number;
      alpha: number;
      maxAlpha: number;
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
        radius: Math.random() * 1.8 + 0.5,
        speedY: -(Math.random() * 0.4 + 0.15),
        speedX: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.6,
        maxAlpha: Math.random() * 0.7 + 0.3
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
        ctx.globalAlpha = p.alpha * (isPlaying ? 0.95 : 0.4);
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
        padding: '10rem 1.5rem 9rem',
        background: '#030509',
        color: '#ffffff',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Background Stardust Particle Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* Dynamic Celestial Aura Glow */}
      <motion.div
        animate={{
          background: `radial-gradient(circle at 50% 45%, ${activeVerse.glow} 0%, rgba(3, 5, 9, 0.85) 45%, rgba(3, 5, 9, 0) 80%)`
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
        <div style={{ marginBottom: '4rem' }}>
          <h2
            style={{
              fontSize: 'clamp(2.8rem, 6.2vw, 5.2rem)',
              lineHeight: 1.12,
              letterSpacing: '-0.02em',
              color: '#ffffff',
              maxWidth: '1000px',
              margin: '0 auto 1.2rem',
              display: 'block'
            }}
          >
            {lang === 'english' ? renderAgamaResonanceHeadline() : 'आगम पाठ'}
          </h2>

          <p
            style={{
              fontSize: 'clamp(1.02rem, 1.8vw, 1.25rem)',
              color: 'rgba(255, 255, 255, 0.65)',
              maxWidth: '640px',
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

        {/* Creative Segmented Track Selector */}
        <div
          className="verse-tabs-container"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.35rem',
            padding: '0.35rem',
            borderRadius: '20px',
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.05), 0 20px 40px rgba(0, 0, 0, 0.5)',
            margin: '0 auto 3.5rem auto',
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
                style={{
                  position: 'relative',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.65rem 1.35rem',
                  borderRadius: '14px',
                  fontFamily: '"sama-latin", sans-serif',
                  fontSize: '0.85rem',
                  fontWeight: isActive ? 700 : 500,
                  letterSpacing: '0.03em',
                  color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.55)',
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
                      borderRadius: '14px',
                      background: `linear-gradient(135deg, ${v.color}25 0%, rgba(255, 255, 255, 0.06) 100%)`,
                      border: `1px solid ${v.color}66`,
                      boxShadow: `0 0 20px ${v.color}30, inset 0 1px 0 rgba(255, 255, 255, 0.2)`,
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
            minHeight: '340px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2rem 1rem'
          }}
        >
          {/* Subtle Celestial Ring & Watermark Om */}
          <motion.div
            animate={{
              scale: isPlaying ? [1, 1.05, 1] : 1,
              opacity: isPlaying ? [0.8, 1, 0.8] : 0.6
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            style={{
              position: 'absolute',
              width: '420px',
              height: '420px',
              borderRadius: '50%',
              border: `1px solid ${activeVerse.color}25`,
              boxShadow: `0 0 80px ${activeVerse.color}15`,
              pointerEvents: 'none',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 0
            }}
          />

          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '16rem',
              color: `${activeVerse.color}06`,
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
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
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
                className="devanagari-text"
                style={{
                  fontSize: 'clamp(1.25rem, 3.2vw, 2.5rem)',
                  fontWeight: 600,
                  color: '#ffffff',
                  lineHeight: '1.6',
                  fontFamily: '"sama-devanagari", sans-serif',
                  maxWidth: '920px',
                  margin: '0 auto 1.8rem',
                  textShadow: `0 0 45px ${activeVerse.color}66`,
                  letterSpacing: '0.01em',
                  justifyContent: 'center'
                }}
              />

              {/* Transliteration Text with Staggered BlurText */}
              <BlurText
                key={`translit-${activeVerse.id}`}
                text={activeVerse.transliteration}
                delay={18}
                animateBy="words"
                direction="bottom"
                stepDuration={0.3}
                style={{
                  fontSize: 'clamp(0.88rem, 1.6vw, 1.12rem)',
                  fontStyle: 'italic',
                  color: activeVerse.color,
                  fontFamily: '"sama-latin", sans-serif',
                  letterSpacing: '0.02em',
                  maxWidth: '860px',
                  margin: '0 auto 2.2rem',
                  lineHeight: '1.6',
                  textShadow: `0 0 25px ${activeVerse.color}44`,
                  justifyContent: 'center'
                }}
              />

              {/* Translation Paragraph with Staggered BlurText */}
              <BlurText
                key={`trans-${activeVerse.id}`}
                text={activeVerse.translation}
                delay={20}
                animateBy="words"
                direction="bottom"
                stepDuration={0.3}
                style={{
                  fontSize: 'clamp(0.82rem, 1.3vw, 0.98rem)',
                  color: 'rgba(255, 255, 255, 0.72)',
                  maxWidth: '680px',
                  margin: '0 auto 3rem',
                  lineHeight: '1.6',
                  fontFamily: '"sama-latin", sans-serif',
                  justifyContent: 'center'
                }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Minimalist Floating Audio Play Node */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', zIndex: 2, marginTop: '1rem' }}>
            <button
              onClick={handlePrevVerse}
              aria-label="Previous Verse"
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.3rem',
                cursor: 'pointer !important',
                backdropFilter: 'blur(16px)',
                transition: 'all 0.25s ease'
              }}
            >
              ‹
            </button>

            {/* Master Glowing Audio Pill Node */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setIsPlaying(!isPlaying)}
              style={{
                padding: '0.9rem 2.2rem',
                borderRadius: '999px',
                background: `linear-gradient(135deg, ${activeVerse.color} 0%, #3b82f6 100%)`,
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.96rem',
                fontFamily: '"sama-latin", sans-serif',
                border: 'none',
                boxShadow: `0 0 40px ${activeVerse.glow}`,
                cursor: 'pointer !important',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <span style={{ fontSize: '1.1rem' }}>{isPlaying ? '⏸' : '▶'}</span>
              <span>{isPlaying ? 'Pause Recitation' : 'Listen Recitation'}</span>
            </motion.button>

            <a
              href="https://path.vrindopnishad.in/"
              target="_blank"
              rel="noopener noreferrer"
              title="Open Bhajan Path Recitation Hub"
              style={{
                padding: '0.9rem 1.4rem',
                borderRadius: '999px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '0.88rem',
                fontFamily: '"sama-latin", sans-serif',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                backdropFilter: 'blur(16px)',
                transition: 'all 0.25s ease'
              }}
            >
              <span>Recitation Hub</span>
              <span style={{ fontSize: '1.05rem' }}>↗</span>
            </a>

            <button
              onClick={handleNextVerse}
              aria-label="Next Verse"
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.3rem',
                cursor: 'pointer !important',
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
