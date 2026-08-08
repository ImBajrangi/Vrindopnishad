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
        padding: '7.5rem 1.5rem 6.5rem',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Background Radial Ambient Aura */}
      <div
        className="philosophy-ambient-aura"
        style={{
          position: 'absolute',
          top: '35%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '850px',
          height: '850px',
          background: 'radial-gradient(circle at 50% 50%, rgba(195, 245, 60, 0.08) 0%, rgba(245, 158, 11, 0.03) 45%, transparent 75%)',
          pointerEvents: 'none',
          filter: 'blur(60px)',
          zIndex: 0
        }}
      />

      <div style={{ maxWidth: '1160px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'left', marginBottom: '3.5rem' }}>
          <span
            className="philosophy-badge"
            style={{
              fontSize: '0.82rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
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
            className="philosophy-title content__title"
            style={{
              fontFamily: lang === 'hindi' ? '"sama-devanagari", sans-serif' : "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
              fontWeight: 700,
              fontStyle: 'normal',
              fontSize: 'clamp(2.5rem, 6.5vw, 5.2rem)',
              letterSpacing: '-0.02em',
              margin: '0.4rem 0 0.8rem 0',
              lineHeight: 1.05
            }}
          >
            {lang === 'english' ? 'Our Services' : 'हमारी सेवाएं'}
          </h2>

          <p
            className="philosophy-desc"
            style={{
              fontSize: 'clamp(0.85rem, 1.2vw, 0.98rem)',
              maxWidth: '1080px',
              margin: '0.8rem 0 0 0',
              textAlign: 'left',
              fontFamily: lang === 'hindi' ? '"sama-devanagari", sans-serif' : '"sama-latin", sans-serif',
              fontWeight: 400,
              lineHeight: '1.55',
              letterSpacing: '0.01em'
            }}
          >
            {lang === 'english'
              ? 'Vrindopnishad is crafted as a digital sanctuary where timeless Vedic scriptures converge seamlessly with cutting-edge web architecture, offering authentic path recitations, spiritual art, and satvic living.'
              : 'वृंदोपनिषद एक ऐसा डिजिटल आश्रम है जहाँ प्राचीन वैदिक ऋचाएँ और आधुनिक तकनीकी नवाचार एक साथ मिलकर आपको एक दिव्य एवं सहज अनुभव प्रदान करते हैं।'}
          </p>
        </div>

        {/* 2 Pillars Per Row (Bigger Bars with Picture on one side & Info on other side) */}
        <div className="philosophy-cards-grid">
          {/* Pillar 1: Vrindopnishad Path */}
          <div
            className="philosophy-card philosophy-split-bar"
            style={
              {
                '--card-glow': '#c3f53c',
                '--card-glow-border': 'rgba(195, 245, 60, 0.4)',
                '--card-glow-shadow': 'rgba(195, 245, 60, 0.15)',
              } as React.CSSProperties
            }
          >
            {/* Picture Container (One Side) */}
            <div className="philosophy-card-image-wrap">
              <img
                src="/images/home-pics/img_rv04.png"
                alt="Vrindopnishad Path Recitation"
                className="philosophy-card-img"
              />
              <div className="philosophy-card-img-overlay" />
              <span className="philosophy-card-img-badge">01 / SCRIPTURE</span>
            </div>

            {/* Information Container (Other Side) */}
            <div className="philosophy-card-info">
              <div className="philosophy-card-header">
                <span className="card-badge" style={{ color: '#c3f53c' }}>
                  {lang === 'english' ? 'RECICATON HUB' : 'पाठ अनुष्ठान'}
                </span>
                <h3 className="philosophy-card-title">
                  {lang === 'english' ? 'Vrindopnishad Path' : 'वृंदोपनिषद पाठ'}
                </h3>
              </div>

              <p className="philosophy-card-text">
                {lang === 'english'
                  ? 'Daily authentic Vedic recitations, audio verse commentaries, and spiritual guidance for inner awakening.'
                  : 'दैनिक वैदिक पाठ, श्लोक व्याख्या और आत्म-साक्षात्कार का पावन मार्ग।'}
              </p>

              <div className="philosophy-card-features">
                <span className="feature-pill">
                  <PixelIcon name="path" color="#c3f53c" size={14} />
                  {lang === 'english' ? 'Stotra Audio' : 'स्तोत्र ऑडियो'}
                </span>
                <span className="feature-pill">
                  {lang === 'english' ? 'Gita Verse Commentary' : 'गीता श्लोक व्याख्या'}
                </span>
              </div>

              <a
                href="https://path.vrindopnishad.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="pillar-cta"
                style={{ color: '#c3f53c' }}
              >
                <span>{lang === 'english' ? 'Enter Recitation Hub' : 'पाठ प्रवेश करें'}</span>
                <span>→</span>
              </a>
            </div>
          </div>

          {/* Pillar 2: Chitra Vrinda */}
          <div
            className="philosophy-card philosophy-split-bar"
            style={
              {
                '--card-glow': '#eab308',
                '--card-glow-border': 'rgba(234, 179, 8, 0.4)',
                '--card-glow-shadow': 'rgba(234, 179, 8, 0.15)',
              } as React.CSSProperties
            }
          >
            {/* Picture Container (One Side) */}
            <div className="philosophy-card-image-wrap">
              <img
                src="/images/projects/chitra_vrinda_hero.jpg"
                alt="Chitra Vrinda Art Gallery"
                className="philosophy-card-img"
              />
              <div className="philosophy-card-img-overlay" />
              <span className="philosophy-card-img-badge">02 / VISUAL ART</span>
            </div>

            {/* Information Container (Other Side) */}
            <div className="philosophy-card-info">
              <div className="philosophy-card-header">
                <span className="card-badge" style={{ color: '#eab308' }}>
                  {lang === 'english' ? 'ART GALLERY' : 'कला दीर्घा'}
                </span>
                <h3 className="philosophy-card-title">
                  {lang === 'english' ? 'Chitra Vrinda' : 'चित्र वृंदा'}
                </h3>
              </div>

              <p className="philosophy-card-text">
                {lang === 'english'
                  ? 'Sacred visual art galleries and high-resolution aesthetic expressions of Vrindavan heritage.'
                  : 'दिव्य कलाकृतियों और कलात्मक अनुभूतियों का अनोखा संग्रह।'}
              </p>

              <div className="philosophy-card-features">
                <span className="feature-pill">
                  <PixelIcon name="art" color="#eab308" size={14} />
                  {lang === 'english' ? 'HD Spiritual Art' : 'दिव्य चित्र'}
                </span>
                <span className="feature-pill">
                  {lang === 'english' ? 'Heritage Visuals' : 'ब्रज विरासत'}
                </span>
              </div>

              <a
                href="https://pic.vrindopnishad.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="pillar-cta"
                style={{ color: '#eab308' }}
              >
                <span>{lang === 'english' ? 'Explore Art Gallery' : 'कला दीर्घा देखें'}</span>
                <span>→</span>
              </a>
            </div>
          </div>

          {/* Pillar 3: Foody Vrinda */}
          <div
            className="philosophy-card philosophy-split-bar"
            style={
              {
                '--card-glow': '#10b981',
                '--card-glow-border': 'rgba(16, 185, 129, 0.4)',
                '--card-glow-shadow': 'rgba(16, 185, 129, 0.15)',
              } as React.CSSProperties
            }
          >
            {/* Picture Container (One Side) */}
            <div className="philosophy-card-image-wrap">
              <img
                src="/images/projects/foody_vrinda_hero.jpg"
                alt="Foody Vrinda Satvic Prasadam"
                className="philosophy-card-img"
              />
              <div className="philosophy-card-img-overlay" />
              <span className="philosophy-card-img-badge">03 / SATVIC</span>
            </div>

            {/* Information Container (Other Side) */}
            <div className="philosophy-card-info">
              <div className="philosophy-card-header">
                <span className="card-badge" style={{ color: '#10b981' }}>
                  {lang === 'english' ? 'PURE PRASADAM' : 'सात्विक आहार'}
                </span>
                <h3 className="philosophy-card-title">
                  {lang === 'english' ? 'Foody Vrinda' : 'फूडी वृंदा'}
                </h3>
              </div>

              <p className="philosophy-card-text">
                {lang === 'english'
                  ? 'Satvic culinary traditions, pure prasadam guidance, and mindful dining experiences in Braj.'
                  : 'सात्विक आहार और पवित्र व्यंजनों की प्राचीन परंपरा।'}
              </p>

              <div className="philosophy-card-features">
                <span className="feature-pill">
                  <PixelIcon name="food" color="#10b981" size={14} />
                  {lang === 'english' ? 'Satvic Prasadam' : 'सात्विक भोजन'}
                </span>
                <span className="feature-pill">
                  {lang === 'english' ? 'Pure Kitchens' : 'पवित्र रसोई'}
                </span>
              </div>

              <a
                href="#services"
                className="pillar-cta"
                style={{ color: '#10b981' }}
              >
                <span>{lang === 'english' ? 'Satvic Dining Guide' : 'सात्विक प्रसादम'}</span>
                <span>→</span>
              </a>
            </div>
          </div>

          {/* Pillar 4: Vrinda Tours */}
          <div
            className="philosophy-card philosophy-split-bar"
            style={
              {
                '--card-glow': '#a855f7',
                '--card-glow-border': 'rgba(168, 85, 247, 0.4)',
                '--card-glow-shadow': 'rgba(168, 85, 247, 0.15)',
              } as React.CSSProperties
            }
          >
            {/* Picture Container (One Side) */}
            <div className="philosophy-card-image-wrap">
              <img
                src="/images/projects/vrinda_tours_hero.jpg"
                alt="Vrinda Tours Pilgrimage Yatra"
                className="philosophy-card-img"
              />
              <div className="philosophy-card-img-overlay" />
              <span className="philosophy-card-img-badge">04 / TOURS</span>
            </div>

            {/* Information Container (Other Side) */}
            <div className="philosophy-card-info">
              <div className="philosophy-card-header">
                <span className="card-badge" style={{ color: '#a855f7' }}>
                  {lang === 'english' ? 'PILGRIMAGE YATRA' : 'पावन यात्रा'}
                </span>
                <h3 className="philosophy-card-title">
                  {lang === 'english' ? 'Vrinda Tours' : 'वृंदा टूर्स'}
                </h3>
              </div>

              <p className="philosophy-card-text">
                {lang === 'english'
                  ? 'Spiritual pilgrimage journeys, Govardhan Parikrama maps, and sacred site explorations.'
                  : 'तीर्थ यात्राएं और पावन धामों के अलौकिक दर्शन।'}
              </p>

              <div className="philosophy-card-features">
                <span className="feature-pill">
                  <PixelIcon name="tours" color="#a855f7" size={14} />
                  {lang === 'english' ? 'Parikrama Routes' : 'परिक्रमा मार्ग'}
                </span>
                <span className="feature-pill">
                  {lang === 'english' ? 'Yatra Booking' : 'तीर्थ यात्रा'}
                </span>
              </div>

              <a
                href="https://to.vrindopnishad.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="pillar-cta"
                style={{ color: '#a855f7' }}
              >
                <span>{lang === 'english' ? 'Explore Yatra Routes' : 'पावन यात्रा देखें'}</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VedicPhilosophySection;
