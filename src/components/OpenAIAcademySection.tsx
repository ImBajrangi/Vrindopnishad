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

export const OpenAIAcademySection: React.FC<OpenAIAcademySectionProps> = ({
  lang = 'english',
  onNavigateAuth
}) => {
  const [activeTab, setActiveTab] = useState<SubNavTabType>('get-started');
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  const carouselImages = [
    {
      src: '/images/home-pics/img_rv04.png',
      title: lang === 'hindi' ? 'श्री धाम वृंदावन' : 'Shri Dham Vrindavan',
      addr: lang === 'hindi' ? 'श्री राधा दामोदर एवं बांके बिहारी' : 'Shri Radha Damodar & Bankey Bihari Ji',
      schedule: lang === 'hindi' ? 'ब्रह्म मुहूर्त: 04:24 AM\nसंध्या आरती: 06:45 PM' : 'Brahma Muhurta: 04:24 AM\nSandhya Aarti: 06:45 PM'
    },
    {
      src: '/images/home-pics/img_rv05.png',
      title: lang === 'hindi' ? 'ब्रज यात्रा एवं पावन सरोवर' : 'Braj Dham & Sacred Lakes',
      addr: lang === 'hindi' ? 'राधा कुण्ड, श्याम कुण्ड एवं गोवर्धन' : 'Radha Kund & Govardhan Hill',
      schedule: lang === 'hindi' ? 'नित्य दर्शन: 24x7\nदीपदान: 06:30 PM' : 'Daily Darshan: Open 24/7\nSandhya Deepdan: 06:30 PM'
    },
    {
      src: '/images/home-pics/img_sn01.png',
      title: lang === 'hindi' ? 'नित्य स्तोत्र पाठ एवं श्लोक संग्रह' : 'Stotra Path & Manuscript Archive',
      addr: lang === 'hindi' ? 'श्रीमद्भगवद्गीता एवं वृंदोपनिषद' : 'Srimad Bhagavad Gita & Upanishad',
      schedule: lang === 'hindi' ? 'प्रातः पाठ: 05:00 AM\nसायं पाठ: 07:00 PM' : 'Morning Path: 05:00 AM\nEvening Path: 07:00 PM'
    }
  ];

  // Auto-slide carousel images every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCarouselIdx((prev) => (prev + 1) % carouselImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [carouselImages.length]);

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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribed(true);
    setTimeout(() => setIsSubscribed(false), 4000);
  };

  return (
    <div id="openai-academy-wrapper" className="openai-academy-container font-sans">
      {/* Sticky Pill Sub-Nav Bar (Dynamically Pinned on top during scrolling) */}
      <OpenAISubNav
        lang={lang}
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
      />

      {/* SECTION 1: GET STARTED - RIVIAN-GRADE DUAL SHOWCASE LAYOUT */}
      <section
        id="get-started-section"
        className={`openai-section ${activeTab === 'get-started' ? 'is-active-section' : 'is-inactive-section'}`}
      >
        <div className="openai-section-header">
          <div className="openai-section-badge-wrapper">
            <span className="section-pill-tag">01</span>
            <h2 className="openai-section-title">
              {lang === 'hindi' ? 'दैनिक नित्य नियम एवं दर्शन' : 'Daily Nitya Niyam & Darshan'}
            </h2>
          </div>
          <p className="openai-section-subtitle">
            {lang === 'hindi'
              ? 'प्रामाणिक स्तोत्र पाठ, ब्रह्म मुहूर्त पंचांग एवं ब्रज दर्शन के साथ अपनी दैनिक साधना आरंभ करें।'
              : 'Establish your daily spiritual discipline with authentic Stotra path, Brahma Muhurta Panchang, and Braj Dham Nitya Darshan.'}
          </p>
        </div>

        {/* Rivian-Grade 2-Column Showcase Cards Grid */}
        <div className="rivian-showcase-grid">
          {/* LEFT CARD: Interactive Media Carousel & Details (Rivian Card 1) */}
          <div className="rivian-card rivian-card-light">
            <div className="rivian-media-wrapper">
              <img
                src={carouselImages[carouselIdx].src}
                alt={carouselImages[carouselIdx].title}
                className="rivian-media-img"
              />
              {/* Floating Pill Carousel Dots Overlay */}
              <div className="rivian-carousel-dots-pill">
                {carouselImages.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCarouselIdx(idx)}
                    className={`rivian-dot ${idx === carouselIdx ? 'active' : ''}`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Bottom Card Body */}
            <div className="rivian-card-body">
              <h3 className="rivian-card-title">{carouselImages[carouselIdx].title}</h3>

              <div className="rivian-info-grid">
                <div className="rivian-info-col">
                  <span className="rivian-info-label">
                    {lang === 'hindi' ? 'पावन स्थान / नित्य नियम' : 'Sacred Seat & Niyam'}
                  </span>
                  <span className="rivian-info-val">{carouselImages[carouselIdx].addr}</span>
                </div>
                <div className="rivian-info-col">
                  <span className="rivian-info-label">
                    {lang === 'hindi' ? 'दैनिक समय सारिणी' : 'Daily Timings'}
                  </span>
                  <span className="rivian-info-val rivian-whitespace-pre">
                    {carouselImages[carouselIdx].schedule}
                  </span>
                </div>
              </div>

              <div className="rivian-action-row">
                <button
                  type="button"
                  className="rivian-btn-black-pill"
                  onClick={onNavigateAuth}
                >
                  {lang === 'hindi' ? 'नियम देखें' : 'Explore Sadhna'}
                </button>
                <a href="#stotra-archive" className="rivian-text-link">
                  {lang === 'hindi' ? 'सभी स्थान देखें →' : 'See all sacred spots →'}
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT CARD: Obsidian Dark Subscription Card (Rivian Card 2) */}
          <div className="rivian-card rivian-card-dark">
            <h3 className="rivian-dark-title">
              {lang === 'hindi' ? 'वृंदोपनिषद के साथ जुड़े रहें' : 'Keep up with Vrindopnishad'}
            </h3>

            <form onSubmit={handleFormSubmit} className="rivian-dark-form">
              <div className="rivian-form-row-2col">
                <div className="rivian-input-group">
                  <input
                    type="text"
                    required
                    placeholder={lang === 'hindi' ? 'प्रथम नाम' : 'First Name'}
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="rivian-input"
                  />
                </div>
                <div className="rivian-input-group">
                  <input
                    type="text"
                    required
                    placeholder={lang === 'hindi' ? 'अंतिम नाम' : 'Last Name'}
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="rivian-input"
                  />
                </div>
              </div>

              <div className="rivian-input-group">
                <input
                  type="email"
                  required
                  placeholder={lang === 'hindi' ? 'ईमेल पता*' : 'Email*'}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="rivian-input"
                />
              </div>

              <div className="rivian-input-group">
                <input
                  type="tel"
                  required
                  placeholder={lang === 'hindi' ? 'फोन नंबर*' : 'Phone Number'}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="rivian-input"
                />
              </div>

              <p className="rivian-terms-text" style={{ fontSize: '0.8rem', opacity: 0.75, margin: '0.65rem 0 1.2rem', textAlign: 'center' }}>
                Daily Panchang & Ekadashi alerts. <a href="#terms">Terms</a> & <a href="#privacy">Privacy Notice</a>.
              </p>

              <button type="submit" className="rivian-btn-white-pill">
                {isSubscribed ? (lang === 'hindi' ? '✓ नित्य नियम से जुड़े!' : '✓ Subscribed!') : (lang === 'hindi' ? 'सब्सक्राइब करें' : 'Subscribe')}
              </button>
            </form>
          </div>
        </div>

        {/* FULL-WIDTH CINEMATIC HERO BANNER CARD (Rivian Banner 2) */}
        <div className="rivian-cinematic-banner">
          <img
            src="/images/home-pics/img_sn01.png"
            alt="Vrindopnishad Sacred Journey"
            className="rivian-banner-bg"
          />
          <div className="rivian-banner-overlay" />
          <div className="rivian-banner-content">
            <h2 className="rivian-banner-headline">
              {lang === 'hindi' ? 'अपनी पावन साधना यात्रा आरंभ करें' : 'Begin your sacred journey'}
            </h2>
            <button
              type="button"
              className="rivian-btn-white-pill rivian-banner-cta"
              onClick={onNavigateAuth}
            >
              {lang === 'hindi' ? 'साधना नियम से जुड़ें' : 'Explore All Scriptures'}
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 2: GO FURTHER WITH VRINDOPNISHAD */}
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
          {/* Card 1: Scheduled Tasks */}
          <div className="openai-split-bar bar-theme-mint">
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
                <span>{lang === 'hindi' ? 'शेड्यूल सेट करें' : 'Configure Schedule'}</span>
                <span>→</span>
              </div>
            </div>
          </div>

          {/* Card 2: Unified Portals */}
          <div className="openai-split-bar bar-theme-cyan">
            <div className="openai-bar-image-wrap">
              <img
                src="/images/home-pics/img_rv04.png"
                alt="Unified Portals & Settings"
                className="openai-bar-img"
              />
              <div className="openai-bar-img-overlay" />
            </div>
            <div className="openai-bar-info">
              <div>
                <h3 className="academy-bento-title">
                  {lang === 'hindi' ? 'एकीकृत पोर्टल एवं सेटिंग्स' : 'Unified Portals & Settings'}
                </h3>
                <p className="openai-bar-desc">
                  {lang === 'hindi'
                    ? 'फुडी वृंदा, चित्रा वृंदा एवं वृंदा टूर्स को एक ही स्थान से एक्सेस करें।'
                    : 'Access Foody Vrinda, Chitra Vrinda, and Vrinda Tours in one unified sacred portal.'}
                </p>
                <div className="openai-bar-features">
                  <span className="openai-feature-pill">✦ Foody Vrinda</span>
                  <span className="openai-feature-pill">✦ Chitra Vrinda</span>
                  <span className="openai-feature-pill">✦ Vrinda Tours</span>
                </div>
              </div>
              <div className="openai-bar-cta" onClick={onNavigateAuth}>
                <span>{lang === 'hindi' ? 'पोर्टल लॉन्च करें' : 'Launch Unified Portals'}</span>
                <span>→</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: USE CASES */}
      <section
        id="use-cases-section"
        className={`openai-section ${activeTab === 'use-cases' ? 'is-active-section' : 'is-inactive-section'}`}
      >
        <div className="openai-section-header">
          <div className="openai-section-badge-wrapper">
            <span className="section-pill-tag">03</span>
            <h2 className="openai-section-title">
              {lang === 'hindi' ? 'उपयोग के अवसर' : 'Use cases'}
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
