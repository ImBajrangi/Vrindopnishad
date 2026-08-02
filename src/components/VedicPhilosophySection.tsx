import React from 'react';
import LEDTicker from './originkit/ui/pixel-led-display';
import PixelIcon from './PixelIcon';

interface VedicPhilosophySectionProps {
  lang: 'english' | 'hindi';
}

export const VedicPhilosophySection: React.FC<VedicPhilosophySectionProps> = ({ lang }) => {
  return (
    <section
      id="philosophy"
      className="philosophy-section"
      style={{
        padding: '9rem 1.5rem 8rem',
        background: '#030509',
        color: '#ffffff',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Top Continuous 100% to 0% Gradient Vignette Blender */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '240px',
          background: 'linear-gradient(180deg, #030509 0%, rgba(3, 5, 9, 0.8) 40%, rgba(3, 5, 9, 0) 100%)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* Bottom Continuous 100% to 0% Gradient Vignette Blender */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '240px',
          background: 'linear-gradient(0deg, #030509 0%, rgba(3, 5, 9, 0.8) 40%, rgba(3, 5, 9, 0) 100%)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* Background Radial Ambient Aura */}
      <div
        style={{
          position: 'absolute',
          top: '35%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '850px',
          height: '850px',
          background: 'radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.12) 0%, rgba(59, 130, 246, 0.04) 45%, rgba(3, 5, 9, 0) 75%)',
          pointerEvents: 'none',
          filter: 'blur(50px)',
          zIndex: 0
        }}
      />



      <div style={{ maxWidth: '1160px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* Section Header with Pixel LED Display */}
        <div style={{ textAlign: 'left', marginBottom: '4rem' }}>
          <span
            style={{
              fontSize: '0.82rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              color: '#38bdf8',
              textTransform: 'uppercase',
              fontFamily: '"sama-latin", sans-serif',
              marginBottom: '0.8rem',
              display: 'inline-block'
            }}
          >
            {lang === 'english' ? 'SACRED SANCTUARY' : 'पवित्र आश्रम'}
          </span>

          {/* Section Heading */}
          <h2
            className="philosophy-title"
            style={{
              fontFamily: lang === 'hindi' ? '"sama-devanagari", sans-serif' : '"bitcount-grid-single-square", sans-serif',
              fontWeight: 400,
              fontStyle: 'normal',
              fontSize: 'clamp(2.5rem, 6.5vw, 5.2rem)',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: '#ffffff',
              margin: '0.4rem 0 0.8rem 0',
              lineHeight: 1.1
            }}
          >
            {lang === 'english' ? 'Eternal Wisdom' : 'सनातन ज्ञान'}
          </h2>

          <p
            style={{
              fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)',
              color: 'rgba(255, 255, 255, 0.65)',
              maxWidth: '1080px',
              margin: '0.8rem 0 0 0',
              textAlign: 'left',
              fontFamily: lang === 'hindi' ? '"sama-devanagari", sans-serif' : '"sama-latin", sans-serif',
              fontWeight: 400,
              lineHeight: '1.5',
              letterSpacing: '0.01em'
            }}
          >
            {lang === 'english'
              ? 'Vrindopnishad is crafted as a digital sanctuary where timeless Vedic scriptures converge seamlessly with cutting-edge web architecture, offering authentic path recitations, spiritual art, and satvic living.'
              : 'वृंदोपनिषद एक ऐसा डिजिटल आश्रम है जहाँ प्राचीन वैदिक ऋचाएँ और आधुनिक तकनीकी नवाचार एक साथ मिलकर आपको एक दिव्य एवं सहज अनुभव प्रदान करते हैं।'}
          </p>
        </div>

        {/* 4 Pillars Interactive Grid */}
        <div
          className="philosophy-cards-grid"
        >
          {/* Pillar 1: Vrindopnishad Path */}
          <div
            className="philosophy-card"
            style={
              {
                '--card-glow': '#38bdf8',
                '--card-glow-border': 'rgba(56, 189, 248, 0.4)',
                '--card-glow-shadow': 'rgba(56, 189, 248, 0.15)',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.07)',
                backdropFilter: 'blur(16px)',
                borderRadius: '18px',
                padding: '1.75rem 1.6rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden'
              } as React.CSSProperties
            }
          >
            {/* Background Pixel Icon on Bottom Right */}
            <div
              className="card-bg-icon"
              style={{
                position: 'absolute',
                bottom: '0px',
                right: '0px',
                opacity: 0.14,
                pointerEvents: 'none',
                zIndex: 0
              }}
            >
              <PixelIcon name="path" color="#38bdf8" size={84} />
            </div>

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#38bdf8', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: '"sama-latin", sans-serif' }}>01 / PATH</span>
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.6rem', color: '#fff', lineHeight: '1.3', fontFamily: lang === 'hindi' ? '"sama-devanagari", sans-serif' : '"sama-latin", sans-serif' }}>
                {lang === 'english' ? 'Vrindopnishad Path' : 'वृंदोपनिषद पाठ'}
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'rgba(255,255,255,0.72)', lineHeight: '1.6', fontFamily: lang === 'hindi' ? '"sama-devanagari", sans-serif' : '"sama-latin", sans-serif' }}>
                {lang === 'english'
                  ? 'Daily authentic Vedic recitations, audio verse commentaries, and spiritual guidance.'
                  : 'दैनिक वैदिक पाठ, श्लोक व्याख्या और आत्म-साक्षात्कार का पावन मार्ग।'}
              </p>
            </div>
            <div className="pillar-cta" style={{ marginTop: '1.5rem', color: '#38bdf8', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: lang === 'hindi' ? '"sama-devanagari", sans-serif' : '"sama-latin", sans-serif', position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span>{lang === 'english' ? 'Recitation Hub' : 'पाठ अनुष्ठान'}</span>
              <span>→</span>
            </div>
          </div>

          {/* Pillar 2: Chitra Vrinda */}
          <div
            className="philosophy-card"
            style={
              {
                '--card-glow': '#0ea5e9',
                '--card-glow-border': 'rgba(14, 165, 233, 0.4)',
                '--card-glow-shadow': 'rgba(14, 165, 233, 0.15)',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.07)',
                backdropFilter: 'blur(16px)',
                borderRadius: '18px',
                padding: '1.75rem 1.6rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden'
              } as React.CSSProperties
            }
          >
            {/* Background Pixel Icon on Bottom Right */}
            <div
              className="card-bg-icon"
              style={{
                position: 'absolute',
                bottom: '0px',
                right: '0px',
                opacity: 0.14,
                pointerEvents: 'none',
                zIndex: 0
              }}
            >
              <PixelIcon name="art" color="#0ea5e9" size={84} />
            </div>

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#0ea5e9', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: '"sama-latin", sans-serif' }}>02 / ART</span>
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.6rem', color: '#fff', lineHeight: '1.3', fontFamily: lang === 'hindi' ? '"sama-devanagari", sans-serif' : '"sama-latin", sans-serif' }}>
                {lang === 'english' ? 'Chitra Vrinda' : 'चित्र वृंदा'}
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'rgba(255,255,255,0.72)', lineHeight: '1.6', fontFamily: lang === 'hindi' ? '"sama-devanagari", sans-serif' : '"sama-latin", sans-serif' }}>
                {lang === 'english'
                  ? 'Sacred visual art galleries and divine aesthetic expressions of Vrindavan.'
                  : 'दिव्य कलाकृतियों और कलात्मक अनुभूतियों का अनोखा संग्रह।'}
              </p>
            </div>
            <div className="pillar-cta" style={{ marginTop: '1.5rem', color: '#0ea5e9', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: lang === 'hindi' ? '"sama-devanagari", sans-serif' : '"sama-latin", sans-serif', position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span>{lang === 'english' ? 'Art Gallery' : 'कला दीर्घा'}</span>
              <span>→</span>
            </div>
          </div>

          {/* Pillar 3: Foody Vrinda */}
          <div
            className="philosophy-card"
            style={
              {
                '--card-glow': '#60a5fa',
                '--card-glow-border': 'rgba(96, 165, 250, 0.4)',
                '--card-glow-shadow': 'rgba(96, 165, 250, 0.15)',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.07)',
                backdropFilter: 'blur(16px)',
                borderRadius: '18px',
                padding: '1.75rem 1.6rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden'
              } as React.CSSProperties
            }
          >
            {/* Background Pixel Icon on Bottom Right */}
            <div
              className="card-bg-icon"
              style={{
                position: 'absolute',
                bottom: '0px',
                right: '0px',
                opacity: 0.14,
                pointerEvents: 'none',
                zIndex: 0
              }}
            >
              <PixelIcon name="food" color="#60a5fa" size={84} />
            </div>

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#60a5fa', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: '"sama-latin", sans-serif' }}>03 / SATVIC</span>
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.6rem', color: '#fff', lineHeight: '1.3', fontFamily: lang === 'hindi' ? '"sama-devanagari", sans-serif' : '"sama-latin", sans-serif' }}>
                {lang === 'english' ? 'Foody Vrinda' : 'फूडी वृंदा'}
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'rgba(255,255,255,0.72)', lineHeight: '1.6', fontFamily: lang === 'hindi' ? '"sama-devanagari", sans-serif' : '"sama-latin", sans-serif' }}>
                {lang === 'english'
                  ? 'Satvic culinary traditions and pure, mindful dining experiences.'
                  : 'सात्विक आहार और पवित्र व्यंजनों की प्राचीन परंपरा।'}
              </p>
            </div>
            <div className="pillar-cta" style={{ marginTop: '1.5rem', color: '#60a5fa', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: lang === 'hindi' ? '"sama-devanagari", sans-serif' : '"sama-latin", sans-serif', position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span>{lang === 'english' ? 'Satvic Culinary' : 'सात्विक आहार'}</span>
              <span>→</span>
            </div>
          </div>

          {/* Pillar 4: Vrinda Tours */}
          <div
            className="philosophy-card"
            style={
              {
                '--card-glow': '#818cf8',
                '--card-glow-border': 'rgba(129, 140, 248, 0.4)',
                '--card-glow-shadow': 'rgba(129, 140, 248, 0.15)',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.07)',
                backdropFilter: 'blur(16px)',
                borderRadius: '18px',
                padding: '1.75rem 1.6rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden'
              } as React.CSSProperties
            }
          >
            {/* Background Pixel Icon on Bottom Right */}
            <div
              className="card-bg-icon"
              style={{
                position: 'absolute',
                bottom: '0px',
                right: '0px',
                opacity: 0.14,
                pointerEvents: 'none',
                zIndex: 0
              }}
            >
              <PixelIcon name="tours" color="#818cf8" size={84} />
            </div>

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#818cf8', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: '"sama-latin", sans-serif' }}>04 / TOURS</span>
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.6rem', color: '#fff', lineHeight: '1.3', fontFamily: lang === 'hindi' ? '"sama-devanagari", sans-serif' : '"sama-latin", sans-serif' }}>
                {lang === 'english' ? 'Vrinda Tours' : 'वृंदा टूर्स'}
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'rgba(255,255,255,0.72)', lineHeight: '1.6', fontFamily: lang === 'hindi' ? '"sama-devanagari", sans-serif' : '"sama-latin", sans-serif' }}>
                {lang === 'english'
                  ? 'Spiritual pilgrimage journeys and sacred site explorations.'
                  : 'तीर्थ यात्राएं और पावन धामों के अलौकिक दर्शन।'}
              </p>
            </div>
            <div className="pillar-cta" style={{ marginTop: '1.5rem', color: '#818cf8', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: lang === 'hindi' ? '"sama-devanagari", sans-serif' : '"sama-latin", sans-serif', position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span>{lang === 'english' ? 'Pilgrimage Journey' : 'पावन यात्रा'}</span>
              <span>→</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VedicPhilosophySection;
