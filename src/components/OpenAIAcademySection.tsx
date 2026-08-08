import React, { useState, useEffect } from 'react';
import {
  Clock,
  LayoutGrid,
  Settings,
  Code2,
  Sparkles,
  BookOpen,
  Utensils,
  FileText,
  Compass,
  Headphones,
} from 'lucide-react';
import { OpenAISubNav, SubNavTabType } from './OpenAISubNav';
import './OpenAIAcademySection.css';
import TestimonialMarquee from './ui/marquee-01';

interface OpenAIAcademySectionProps {
  lang?: 'english' | 'hindi';
  onNavigateAuth?: () => void;
}

interface AutoMovingCursorProps {
  theme: 'lime' | 'mint' | 'cyan' | 'saffron';
  animClass: 'cursor-anim-1' | 'cursor-anim-2' | 'cursor-anim-3' | 'cursor-anim-4';
  label: string;
  style?: React.CSSProperties;
}

const AutoMovingCursor: React.FC<AutoMovingCursorProps> = ({ theme, animClass, label, style }) => (
  <div className={`animated-floating-cursor cursor-theme-${theme} ${animClass}`} style={style}>
    {/* Rounded Cursor Pointer Arrow (from usercursor.tsx) */}
    <div className="cursor-arrow-wrapper">
      <svg
        width="30"
        height="30"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block', overflow: 'visible' }}
      >
        <path
          d="M 5.8 3.6 Q 4.5 3.2 4.6 4.6 L 10.2 22.6 Q 10.6 23.9 11.7 23.2 L 14.2 16.6 L 21.8 14.7 Q 23.1 14.4 22.6 13.2 L 6.8 3.8 Z"
          fill="currentColor"
          stroke="rgba(0,0,0,0.12)"
          strokeWidth="1.2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    </div>

    {/* Fluid Trailing / Following Label Pill */}
    <div className="cursor-label-following">
      <span className="cursor-label-text">{label}</span>
    </div>
  </div>
);

export const OpenAIAcademySection: React.FC<OpenAIAcademySectionProps> = ({
  lang = 'english',
  onNavigateAuth
}) => {
  const [activeTab, setActiveTab] = useState<SubNavTabType>('get-started');

  // Scroll position listener for dynamic active section updates
  useEffect(() => {
    const handleScroll = () => {
      const getStartedEl = document.getElementById('get-started-section');
      const goFurtherEl = document.getElementById('go-further-section');
      const useCasesEl = document.getElementById('use-cases-section');

      if (!getStartedEl || !goFurtherEl || !useCasesEl) return;

      const scrollPos = window.scrollY + 220;
      const getStartedTop = getStartedEl.getBoundingClientRect().top + window.pageYOffset;
      const goFurtherTop = goFurtherEl.getBoundingClientRect().top + window.pageYOffset;
      const useCasesTop = useCasesEl.getBoundingClientRect().top + window.pageYOffset;

      if (scrollPos >= useCasesTop - 60) {
        setActiveTab('use-cases');
      } else if (scrollPos >= goFurtherTop - 60) {
        setActiveTab('go-further');
      } else if (scrollPos >= getStartedTop - 120) {
        setActiveTab('get-started');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div id="openai-academy-wrapper" className="openai-academy-container font-sans">
      {/* Sticky Pill Sub-Nav Bar (Dynamically Pinned on top during scrolling) */}
      <OpenAISubNav
        lang={lang}
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
      />

      {/* SECTION 1: GET STARTED - TWIN SPLIT POWER SHOWCASE */}
      <section
        id="get-started-section"
        className={`openai-section ${activeTab === 'get-started' ? 'is-active-section' : 'is-inactive-section'}`}
      >
        <div className="openai-section-header">
          <div className="openai-section-badge-wrapper">
            <span className="section-pill-tag">01</span>
            <h2 className="openai-section-title">
              {lang === 'hindi' ? 'आरंभ करें' : 'Get started'}
            </h2>
          </div>
          <p className="openai-section-subtitle">
            {lang === 'hindi'
              ? 'मूल बातों से शुरुआत करें और आत्मविश्वास के साथ साधना आगे बढ़ाएं।'
              : 'Start with authentic Vedic scriptures and build spiritual confidence.'}
          </p>
        </div>

        <div className="openai-cards-grid-2col">
          {/* Bar 1: Exactly 1 Cursor with Full Card Travel */}
          <div className="openai-split-bar bar-theme-chartreuse">
            <AutoMovingCursor
              theme="lime"
              animClass="cursor-anim-1"
              label={lang === 'hindi' ? '✦ प्रामाणिक पाठ' : '✦ Sacred Shlokas'}
              style={{ top: '15%', left: '8%' }}
            />
            <div className="openai-bar-image-wrap">
              <img
                src="/images/home-pics/img_rv04.png"
                alt="What is Vrindopnishad"
                className="openai-bar-img"
              />
              <div className="openai-bar-img-overlay" />
            </div>
            <div className="openai-bar-info">
              <div>
                <h3 className="academy-bento-title">
                  {lang === 'hindi' ? 'वृंदोपनिषद क्या है?' : 'What is Vrindopnishad?'}
                </h3>
                <p className="openai-bar-desc">
                  {lang === 'hindi'
                    ? 'जानें कि वृंदोपनिषद क्या है और यह आपके नित्य नियम पाठ में कैसे सहायता करता है।'
                    : 'Discover how Vrindopnishad synthesizes ancient scriptures, stotras, and daily nitya niyam.'}
                </p>
                <div className="openai-bar-features">
                  <span className="openai-feature-pill">✦ Authentic Shlokas</span>
                  <span className="openai-feature-pill">✦ Daily Tracker</span>
                </div>
              </div>
              <div className="openai-bar-cta" onClick={onNavigateAuth}>
                <span>{lang === 'hindi' ? 'साधना शुरू करें' : 'Start Niyam Path'}</span>
                <span>→</span>
              </div>
            </div>
          </div>

          {/* Bar 2: Exactly 1 Cursor with Full Card Travel */}
          <div className="openai-split-bar bar-theme-saffron">
            <AutoMovingCursor
              theme="saffron"
              animClass="cursor-anim-2"
              label={lang === 'hindi' ? '⚡ 3-चरण नियम' : '⚡ 3-Step Guide'}
              style={{ top: '25%', right: '12%' }}
            />
            <div className="openai-bar-image-wrap">
              <img
                src="/images/home-pics/img_rv05.png"
                alt="How to get started"
                className="openai-bar-img"
              />
              <div className="openai-bar-img-overlay" />
            </div>
            <div className="openai-bar-info">
              <div>
                <h3 className="academy-bento-title">
                  {lang === 'hindi' ? 'साधना कैसे शुरू करें' : 'How to get started'}
                </h3>
                <p className="openai-bar-desc">
                  {lang === 'hindi'
                    ? 'प्रामाणिक स्तोत्र, श्रीमद्भगवद्गीता और ब्रज यात्रा मार्गदर्शिकाएं देखें।'
                    : 'Explore daily Stotra path, digital manuscripts, and Braj Dham guides in 3 steps.'}
                </p>
                <div className="openai-bar-features">
                  <span className="openai-feature-pill">✦ 01 Stotra</span>
                  <span className="openai-feature-pill">✦ 02 Shloka</span>
                  <span className="openai-feature-pill">✦ 03 Niyam</span>
                </div>
              </div>
              <div className="openai-bar-cta" onClick={onNavigateAuth}>
                <span>{lang === 'hindi' ? 'मार्गदर्शिका देखें' : 'Explore Starter Guides'}</span>
                <span>→</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: GO FURTHER WITH VRINDOPNISHAD - TWIN SPLIT POWER SHOWCASE */}
      <section
        id="go-further-section"
        className={`openai-section ${activeTab === 'go-further' ? 'is-active-section' : 'is-inactive-section'}`}
      >
        <div className="openai-section-header">
          <div className="openai-section-badge-wrapper">
            <span className="section-pill-tag">02</span>
            <h2 className="openai-section-title">
              {lang === 'hindi' ? 'वृंदोपनिषद के साथ विस्तार करें' : 'Go further with Vrindopnishad'}
            </h2>
          </div>
          <p className="openai-section-subtitle">
            {lang === 'hindi'
              ? 'अपनी नित्य साधना और भक्ति जीवन के अनुकूल साधनों का उपयोग करें।'
              : 'Use connected sacred archives, audio discourses, and mobile apps that fit the way you pray.'}
          </p>
        </div>

        <div className="openai-cards-grid-2col">
          {/* Bar 1: Scheduled Stotra Tasks & Sacred Skills - Exactly 1 Cursor */}
          <div className="openai-split-bar bar-theme-mint">
            <AutoMovingCursor
              theme="mint"
              animClass="cursor-anim-3"
              label={lang === 'hindi' ? '🔔 नित्य नियम' : '🔔 Auto Reminders'}
              style={{ top: '15%', left: '10%' }}
            />
            <div className="openai-bar-image-wrap">
              <img
                src="/images/home-pics/img_sn01.png"
                alt="Scheduled Stotra tasks"
                className="openai-bar-img"
              />
              <div className="openai-bar-img-overlay" />
            </div>
            <div className="openai-bar-info">
              <div>
                <h3 className="academy-bento-title">
                  {lang === 'hindi' ? 'नित्य नियम एवं पावन कौशल' : 'Scheduled Tasks & Sacred Skills'}
                </h3>
                <p className="openai-bar-desc">
                  {lang === 'hindi'
                    ? 'दैनिक स्तोत्र पाठ रिमाइंडर सेट करें ताकि साधना में निरंतरता बनी रहे और प्रामाणिक श्लोक पढ़ें।'
                    : 'Set up recurring nitya niyam so daily stotra readings take zero manual effort.'}
                </p>
                <div className="openai-bar-features">
                  <span className="openai-feature-pill">✦ Auto Reminders</span>
                  <span className="openai-feature-pill">✦ Audio Waveforms</span>
                </div>
              </div>
              <div className="openai-bar-cta" onClick={onNavigateAuth}>
                <span>{lang === 'hindi' ? 'अनुसूची सेट करें' : 'Configure Schedule'}</span>
                <span>→</span>
              </div>
            </div>
          </div>

          {/* Bar 2: Vrindopnishad Portals & Settings - Exactly 1 Cursor */}
          <div className="openai-split-bar bar-theme-cyan">
            <AutoMovingCursor
              theme="cyan"
              animClass="cursor-anim-4"
              label={lang === 'hindi' ? '🌐 पावन धाम' : '🌐 Braj Dham Hub'}
              style={{ top: '20%', right: '12%' }}
            />
            <div className="openai-bar-image-wrap">
              <img
                src="/images/projects/chitra_vrinda_hero.jpg"
                alt="Vrindopnishad Portals & Settings"
                className="openai-bar-img"
              />
              <div className="openai-bar-img-overlay" />
            </div>
            <div className="openai-bar-info">
              <div>
                <h3 className="academy-bento-title">
                  {lang === 'hindi' ? 'वृंदोपनिषद पोर्टल्स एवं सेटिंग्स' : 'Unified Portals & Settings'}
                </h3>
                <p className="openai-bar-desc">
                  {lang === 'hindi'
                    ? 'फुडी वृंदा, चित्र वृंदा और वृंदा टूर्स एक ही एकीकृत पोर्टल में उपयोग करें।'
                    : 'Access Foody Vrinda, Chitra Vrinda, and Vrinda Tours in one unified sacred portal.'}
                </p>
                <div className="openai-bar-features">
                  <span className="openai-feature-pill">✦ Foody Vrinda</span>
                  <span className="openai-feature-pill">✦ Chitra Vrinda</span>
                  <span className="openai-feature-pill">✦ Vrinda Tours</span>
                </div>
              </div>
              <div className="openai-bar-cta" onClick={onNavigateAuth}>
                <span>{lang === 'hindi' ? 'पोर्टल खोलें' : 'Launch Unified Portals'}</span>
                <span>→</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: USE CASES - 3-COLUMN MINIMAL EDITORIAL CARDS */}
      <section
        id="use-cases-section"
        className={`openai-section ${activeTab === 'use-cases' ? 'is-active-section' : 'is-inactive-section'}`}
      >
        <div className="openai-section-header">
          <div className="openai-section-badge-wrapper">
            <span className="section-pill-tag">03</span>
            <h2 className="openai-section-title">
              {lang === 'hindi' ? 'साधना उपयोग' : 'Use cases'}
            </h2>
          </div>
          <p className="openai-section-subtitle">
            {lang === 'hindi'
              ? 'प्रातः पाठ से लेकर तीर्थ यात्रा तक अपनी साधना को समृद्ध बनाएं।'
              : 'Elevate your spiritual journey from morning stotra path to Braj Dham pilgrimage.'}
          </p>
        </div>

        <div className="layout-section-3-grid">
          {/* Card 1: Everyday Sadhana */}
          <div className="usecase-card card-sadhana">
            <div className="usecase-card-watermark">ॐ</div>
            <div className="usecase-card-top">
              <div className="usecase-icon-box icon-sadhana">
                <Sparkles size={24} />
              </div>
              <span className="usecase-num-pill">01</span>
            </div>

            <div className="usecase-card-body">
              <span className="usecase-badge badge-sadhana">DAILY SADHANA</span>
              <h3 className="usecase-title">
                {lang === 'hindi' ? 'दैनिक साधना एवं मन्त्र' : 'Everyday Sadhana & Mantras'}
              </h3>
              <p className="usecase-desc">
                {lang === 'hindi'
                  ? 'नित्य नियम और भगवद्गीता पाठ के लिए व्यावहारिक उपयोग।'
                  : 'Organize daily stotra readings, morning mantras, and nitya niyam.'}
              </p>
              <div className="usecase-features">
                <span className="usecase-pill pill-sadhana">✦ Daily Reminders</span>
                <span className="usecase-pill pill-sadhana">✦ Shloka Chanting</span>
              </div>
            </div>

            <div className="usecase-btn usecase-btn-sadhana" onClick={onNavigateAuth}>
              <span>{lang === 'hindi' ? 'मार्गदर्शिका देखें' : 'View Guide'}</span>
              <span>→</span>
            </div>
          </div>

          {/* Card 2: Foody Vrinda Satvic Meals */}
          <div className="usecase-card card-meals">
            <div className="usecase-card-watermark">वृं</div>
            <div className="usecase-card-top">
              <div className="usecase-icon-box icon-meals">
                <Utensils size={24} />
              </div>
              <span className="usecase-num-pill">02</span>
            </div>

            <div className="usecase-card-body">
              <span className="usecase-badge badge-meals">SATVIC MEALS</span>
              <h3 className="usecase-title">
                {lang === 'hindi' ? 'फुडी वृंदा सात्विक भोजन' : 'Foody Vrinda Sattvic Meals'}
              </h3>
              <p className="usecase-desc">
                {lang === 'hindi'
                  ? 'घर जैसा शुद्ध सात्विक भोजन आपके द्वार तक।'
                  : 'Delicious pure sattvic homemade meals delivered fresh to your doorstep.'}
              </p>
              <div className="usecase-features">
                <span className="usecase-pill pill-meals">✦ Pure Prasadam</span>
                <span className="usecase-pill pill-meals">✦ Fresh Delivery</span>
              </div>
            </div>

            <div className="usecase-btn usecase-btn-meals" onClick={onNavigateAuth}>
              <span>{lang === 'hindi' ? 'भोजन ऑर्डर करें' : 'Order Meals'}</span>
              <span>→</span>
            </div>
          </div>

          {/* Card 3: Vrinda Tours Pilgrimages */}
          <div className="usecase-card card-yatra">
            <div className="usecase-card-watermark">दा</div>
            <div className="usecase-card-top">
              <div className="usecase-icon-box icon-yatra">
                <Compass size={24} />
              </div>
              <span className="usecase-num-pill">03</span>
            </div>

            <div className="usecase-card-body">
              <span className="usecase-badge badge-yatra">BRAJ YATRA</span>
              <h3 className="usecase-title">
                {lang === 'hindi' ? 'वृंदा टूर्स ब्रज यात्रा' : 'Vrinda Tours Pilgrimages'}
              </h3>
              <p className="usecase-desc">
                {lang === 'hindi'
                  ? 'वृंदावन, बरसाना एवं गोवर्धन परिक्रमा मार्गदर्शन।'
                  : 'Sacred guided journeys to Vrindavan, Barsana, and Govardhan Parikrama.'}
              </p>
              <div className="usecase-features">
                <span className="usecase-pill pill-yatra">✦ Parikrama Routes</span>
                <span className="usecase-pill pill-yatra">✦ Holy Sites</span>
              </div>
            </div>

            <div className="usecase-btn usecase-btn-yatra" onClick={onNavigateAuth}>
              <span>{lang === 'hindi' ? 'यात्रा मार्ग देखें' : 'Explore Routes'}</span>
              <span>→</span>
            </div>
          </div>
        </div>
      </section>



      {/* SECTION 5: CONSOLIDATED TESTIMONIALS SECTION */}
      <div className="mt-8 border-t border-white/10 pt-6">
        <TestimonialMarquee />
      </div>

    </div>
  );
};

export default OpenAIAcademySection;
