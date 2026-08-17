import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, ArrowRight, ChevronUp, ChevronDown, Globe, Compass, ArrowLeft, X, LogIn, User, MapPin, Phone, Menu } from 'lucide-react';
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler';
import { useAuth } from '@/context/AuthContext';
import './ConsensysMegaNav.css';

interface ConsensysMegaNavProps {
  lang: 'english' | 'hindi';
  onLanguageChange: (lang: 'english' | 'hindi') => void;
  onOpenNavMenu?: () => void;
  onOpenAuth?: (mode?: 'signin' | 'register') => void;
}

type TabType = 'products' | 'ecosystem' | 'company' | 'blog' | null;
type MobileLevel = 'main' | 'products' | 'ecosystem' | 'company' | 'blog' | null;

export const ConsensysMegaNav: React.FC<ConsensysMegaNavProps> = ({
  lang,
  onLanguageChange,
  onOpenNavMenu,
  onOpenAuth
}) => {
  const { user, isLoggedIn, openAuthModal } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>(null);
  const [mobileLevel, setMobileLevel] = useState<MobileLevel>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when mega menu or mobile drawer is open
  useEffect(() => {
    if (activeTab || mobileLevel) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeTab, mobileLevel]);

  // Smart Header Scroll: Hide on scroll down, Show on scroll up
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Scrolled state for backdrop background styling
      if (currentScrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide header on scroll down / Show on scroll up (only when menu is closed)
      if (currentScrollY <= 10) {
        setIsHidden(false);
      } else if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // Scrolling DOWN -> Hide header
        setIsHidden(true);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling UP -> Show header
        setIsHidden(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close nav on escape or click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveTab(null);
        setMobileLevel(null);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveTab(null);
        setMobileLevel(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleTabClick = (tab: TabType) => {
    if (activeTab === tab) {
      setActiveTab(null);
    } else {
      setActiveTab(tab);
    }
  };

  const closeAllNav = () => {
    setActiveTab(null);
    setMobileLevel(null);
  };

  const marqueeItems = lang === 'hindi'
    ? [
      'प्राचीन ज्ञान, आधुनिक अनुभव',
      'नित्य साधना अब उपलब्ध',
      'ब्रज धाम यात्रा गाइड',
      'संत वाणी संग्रह',
      'दिव्य कला संग्रह',
      'भगवद्गीता एवं उपनिषद',
    ]
    : [
      'Ancient Wisdom, Modern Experience',
      'Daily Sadhana Now Live',
      'Braj Dham Pilgrimage Guide',
      'Sant-Vaani Collection',
      'Divine Art Gallery',
      'Gita & Upanishads Archive',
    ];

  return (
    <div ref={navRef} className="consensys-nav-wrapper">
      {/* Backdrop overlay when desktop mega menu or mobile drawer is open */}
      {(activeTab || mobileLevel) && (
        <div
          className="consensys-backdrop"
          onClick={closeAllNav}
        />
      )}

      {/* Announcement Bar */}
      <div className={`marquee-announcement-bar ${isHidden && !activeTab && !mobileLevel ? 'marquee-hidden' : ''} ${activeTab || mobileLevel ? 'marquee-mega-open' : ''} ${isScrolled ? 'marquee-scrolled' : ''}`}>
        <div className="announcement-bar-inner">
          <div className="announcement-left-info">
            <MapPin size={13} className="announcement-icon" />
            <span className="announcement-text">
              {lang === 'hindi' ? 'श्री धाम वृंदावन, मथुरा, यूपी 281121' : 'Shri Dham Vrindavan, Mathura, UP 281121, India'}
            </span>
          </div>

          <div className="announcement-right-info">
            <Phone size={13} className="announcement-icon" />
            <span className="announcement-text">
              {lang === 'hindi' ? '+91 98765-43210' : '+91 98765-43210'}
            </span>
          </div>
        </div>
      </div>

      {/* Floating Main Header Bar */}
      <header className={`consensys-header ${isScrolled ? 'scrolled' : ''} ${isHidden && !activeTab && !mobileLevel ? 'nav-hidden' : ''} ${activeTab || mobileLevel ? 'mega-open' : ''}`}>
        <div className="consensys-header-inner">

          {/* Left Group: Logo Badge + Desktop Pill Nav Bar */}
          <div className="consensys-left-group">
            <a href="index.html" className="consensys-logo-badge" title="Vrindopnishad Home" onClick={closeAllNav}>
              <img
                src="/v-logo-rounded/official-logo-dark.svg"
                alt="Vrindopnishad Logo"
                width="24"
                height="24"
              />
            </a>

            {/* Desktop Floating Pill Nav Bar */}
            <nav className="consensys-pill-bar desktop-only">
              <button
                type="button"
                className={`consensys-tab-btn ${activeTab === 'products' ? 'active' : ''}`}
                onClick={() => handleTabClick('products')}
              >
                <span>{lang === 'hindi' ? 'दिव्य संग्रह' : 'Sacred Collection'}</span>
                <span className="tab-caret">
                  {activeTab === 'products' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </span>
              </button>

              <button
                type="button"
                className={`consensys-tab-btn ${activeTab === 'ecosystem' ? 'active' : ''}`}
                onClick={() => handleTabClick('ecosystem')}
              >
                <span>{lang === 'hindi' ? 'ज्ञान केंद्र' : 'Wisdom Hub'}</span>
                <span className="tab-caret">
                  {activeTab === 'ecosystem' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </span>
              </button>

              <button
                type="button"
                className={`consensys-tab-btn ${activeTab === 'company' ? 'active' : ''}`}
                onClick={() => handleTabClick('company')}
              >
                <span>{lang === 'hindi' ? 'हमारा उद्देश्य' : 'Our Mission'}</span>
                <span className="tab-caret">
                  {activeTab === 'company' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </span>
              </button>

              <button
                type="button"
                className={`consensys-tab-btn ${activeTab === 'blog' ? 'active' : ''}`}
                onClick={() => handleTabClick('blog')}
              >
                <span>{lang === 'hindi' ? 'वैदिक विचार' : 'Sacred Insights'}</span>
                <span className="tab-caret">
                  {activeTab === 'blog' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </span>
              </button>
            </nav>
          </div>


          {/* Right Actions: Controls, Panchang Tithi & Theme Toggler */}
          <div className="consensys-header-actions">


            {/* Language Switcher */}
            <button
              type="button"
              onClick={() => onLanguageChange(lang === 'english' ? 'hindi' : 'english')}
              className="consensys-action-btn lang-btn desktop-only"
              title="Switch Language"
            >
              <Globe size={15} />
              <span className="lang-code">{lang === 'english' ? 'EN' : 'HI'}</span>
            </button>

            {/* Theme Toggler */}
            <AnimatedThemeToggler
              variant="circle"
              className="consensys-action-btn theme-btn desktop-only"
              title="Toggle Theme"
            />

            {/* 3D Nav Modal Compass */}
            {onOpenNavMenu && (
              <button
                type="button"
                onClick={onOpenNavMenu}
                className="consensys-action-btn nav-modal-btn desktop-only"
                title="3D Navigation Menu"
              >
                <Compass size={16} />
              </button>
            )}

            {/* Sign In / User Account Profile Button */}
            {isLoggedIn && user ? (
              <button
                type="button"
                onClick={() => {
                  window.location.hash = '#auth-page';
                  if (onOpenAuth) onOpenAuth('signin');
                  else openAuthModal('signin');
                }}
                className="consensys-action-btn user-profile-btn desktop-only"
                title={`Signed in as ${user.name}`}
              >
                <img
                  src={user.avatarUrl || '/v-logo-rounded/official-logo-dark.svg'}
                  alt={user.name}
                  className="user-avatar-mini"
                />
                <span className="user-name-mini">{user.name.split(' ')[0]}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  window.location.hash = '#auth-page';
                  if (onOpenAuth) onOpenAuth('signin');
                  else openAuthModal('signin');
                }}
                className="consensys-action-btn signin-btn desktop-only"
                title="Sign In / Register"
              >
                <LogIn size={15} />
                <span className="auth-btn-label">{lang === 'hindi' ? 'साइन इन' : 'Sign In'}</span>
              </button>
            )}


            {/* Mobile Hamburger / Close Button */}
            <button
              type="button"
              className={`consensys-hamburger mobile-only ${mobileLevel ? 'open' : ''}`}
              onClick={() => {
                if (mobileLevel) {
                  setMobileLevel(null);
                } else {
                  setMobileLevel('main');
                }
              }}
              aria-label="Toggle Menu"
            >
              {mobileLevel ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* DESKTOP Full-Width Seamless Mega Menu Overlay Panel */}
      {activeTab && (
        <div className="consensys-mega-panel desktop-only">
          <div className="consensys-mega-content-container">

            {/* TAB 1: PRODUCTS / PROJECTS */}
            {activeTab === 'products' && (
              <div className="consensys-tab-content">
                <a href="#projects" className="consensys-banner-title" onClick={closeAllNav}>
                  <h2>{lang === 'hindi' ? 'हमारे समस्त उत्पादों को देखें' : 'Explore our suite of products'}</h2>
                  <div className="arrow-circle">
                    <ArrowRight size={18} />
                  </div>
                </a>

                <div className="consensys-grid-2col">
                  <div className="consensys-column-primary">
                    <a href="https://path.vrindopnishad.in/" target="_blank" rel="noopener noreferrer" className="primary-link-item">
                      <span>Vrindopnishad Path</span>
                      <ArrowUpRight size={20} className="link-arrow" />
                    </a>
                    <a href="#services" className="primary-link-item" onClick={closeAllNav}>
                      <span>Foody Vrinda</span>
                      <ArrowUpRight size={20} className="link-arrow" />
                    </a>
                    <a href="https://pic.vrindopnishad.in/" target="_blank" rel="noopener noreferrer" className="primary-link-item">
                      <span>Chitra Vrinda</span>
                      <ArrowUpRight size={20} className="link-arrow" />
                    </a>
                    <a href="https://to.vrindopnishad.in/" target="_blank" rel="noopener noreferrer" className="primary-link-item">
                      <span>Vrinda Tours</span>
                      <ArrowUpRight size={20} className="link-arrow" />
                    </a>
                  </div>

                  <div className="consensys-column-secondary">
                    <div className="section-subtitle-bar">
                      <span>{lang === 'hindi' ? 'डिजिटल ग्रन्थागार एवं साधन' : 'Digital Archives & Tools'}</span>
                      <ArrowRight size={14} />
                    </div>

                    <ul className="consensys-bordered-list">
                      <li>
                        <a href="https://path.vrindopnishad.in/" target="_blank" rel="noopener noreferrer">
                          <span>PDF Sacred Archive</span>
                          <ArrowUpRight size={16} />
                        </a>
                      </li>
                      <li>
                        <a href="https://path.vrindopnishad.in/" target="_blank" rel="noopener noreferrer">
                          <span>Sant-Vaani Discourses</span>
                          <ArrowUpRight size={16} />
                        </a>
                      </li>
                      <li>
                        <a href="#download-apps" onClick={closeAllNav}>
                          <span>Vrindopnishad Mobile Apps</span>
                          <ArrowUpRight size={16} />
                        </a>
                      </li>
                      <li>
                        <a href="#about" onClick={closeAllNav}>
                          <span>Vedic Philosophy Research</span>
                          <ArrowUpRight size={16} />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: ECOSYSTEM */}
            {activeTab === 'ecosystem' && (
              <div className="consensys-tab-content">
                <a href="#about" className="consensys-banner-title" onClick={closeAllNav}>
                  <h2>{lang === 'hindi' ? 'वैदिक ज्ञान एवं ब्रज धाम संस्कृति को समझें' : 'Learn how authentic Vedic wisdom reshapes modern life. View the report'}</h2>
                  <div className="arrow-circle">
                    <ArrowRight size={18} />
                  </div>
                </a>

                <div className="consensys-grid-2col">
                  <div className="consensys-column-secondary">
                    <div className="section-subtitle-bar">
                      <span>Sacred Wisdom</span>
                    </div>
                    <ul className="consensys-bordered-list">
                      <li>
                        <a href="https://path.vrindopnishad.in/" target="_blank" rel="noopener noreferrer">
                          <span>Bhagavad Gita & Upanishads</span>
                          <ArrowUpRight size={16} />
                        </a>
                      </li>
                      <li>
                        <a href="https://path.vrindopnishad.in/" target="_blank" rel="noopener noreferrer">
                          <span>Daily Stotra Path & Nitya Niyam</span>
                          <ArrowUpRight size={16} />
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="consensys-column-secondary">
                    <div className="section-subtitle-bar">
                      <span>Braj Dham Pilgrimages</span>
                    </div>
                    <ul className="consensys-bordered-list">
                      <li>
                        <a href="https://to.vrindopnishad.in/" target="_blank" rel="noopener noreferrer">
                          <span>Vrindavan Pilgrimage Guide</span>
                          <ArrowUpRight size={16} />
                        </a>
                      </li>
                      <li>
                        <a href="https://to.vrindopnishad.in/" target="_blank" rel="noopener noreferrer">
                          <span>Barsana & Nandgaon Parikrama</span>
                          <ArrowUpRight size={16} />
                        </a>
                      </li>
                      <li>
                        <a href="https://to.vrindopnishad.in/" target="_blank" rel="noopener noreferrer">
                          <span>Govardhan Giriraj Yatra</span>
                          <ArrowUpRight size={16} />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: COMPANY */}
            {activeTab === 'company' && (
              <div className="consensys-tab-content">
                <a href="#about" className="consensys-banner-title" onClick={closeAllNav}>
                  <h2>{lang === 'hindi' ? 'वृंदोपनिषद संस्था के बारे में जाने' : 'Explore the Vrindopnishad Digital Sanctuary'}</h2>
                  <div className="arrow-circle">
                    <ArrowRight size={18} />
                  </div>
                </a>

                <div className="consensys-grid-1col" style={{ maxWidth: '600px' }}>
                  <ul className="consensys-bordered-list">
                    <li>
                      <a href="#about" onClick={closeAllNav}>
                        <span>About Vrindopnishad</span>
                        <ArrowUpRight size={16} />
                      </a>
                    </li>
                    <li>
                      <a href="#philosophy" onClick={closeAllNav}>
                        <span>Vedic Philosophy & Core Mission</span>
                        <ArrowUpRight size={16} />
                      </a>
                    </li>
                    <li>
                      <a href="#footer" onClick={closeAllNav}>
                        <span>Sanctuary Team & Contact</span>
                        <ArrowUpRight size={16} />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* TAB 4: BLOG */}
            {activeTab === 'blog' && (
              <div className="consensys-tab-content">
                <a href="#blog" className="consensys-banner-title" onClick={closeAllNav}>
                  <h2>{lang === 'hindi' ? 'आलेख एवं समाचार पढ़ें' : 'Explore the Blog'}</h2>
                  <div className="arrow-circle">
                    <ArrowRight size={18} />
                  </div>
                </a>

                <div className="section-subtitle-bar" style={{ marginBottom: '1.25rem' }}>
                  <span>Featured</span>
                </div>

                <div className="consensys-cards-grid">
                  <div className="consensys-split-card">
                    <div className="split-card-media card-blue-bg">
                      <div className="split-card-arrow">
                        <ArrowRight size={16} />
                      </div>
                      <img src="/v-logo-rounded/official-logo-dark.svg" alt="Vrindopnishad" className="split-card-logo-img" width="55" height="55" />
                    </div>

                    <div className="split-card-info">
                      <div className="card-category">SACRED ANNOUNCEMENT, NEWS</div>
                      <h3 className="card-title">
                        Vrindopnishad launches authentic digital stotra archive for seekers worldwide.
                      </h3>
                      <div className="card-date">May 8, 2026</div>
                    </div>
                  </div>

                  <div className="consensys-split-card">
                    <div className="split-card-media card-orange-bg">
                      <div className="split-card-arrow">
                        <ArrowRight size={16} />
                      </div>
                      <img src="/v-logo-rounded/official-logo-dark.svg" alt="Vrindopnishad" className="split-card-logo-img black-logo" width="55" height="55" />
                    </div>

                    <div className="split-card-info">
                      <div className="card-category">SPIRITUAL DISCOURSES</div>
                      <h3 className="card-title">
                        Sant-Vaani daily discourses updated with authentic Sanskrit shlokas & Hindi translations.
                      </h3>
                      <div className="card-date">May 1, 2026</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Mega Menu Footer Links */}
            <div className="consensys-mega-footer">
              <div className="social-links-row">
                <a href="https://path.vrindopnishad.in/" target="_blank" rel="noopener noreferrer">
                  <span>Bhajan Path</span> <ArrowUpRight size={14} />
                </a>
                <a href="https://pic.vrindopnishad.in/" target="_blank" rel="noopener noreferrer">
                  <span>Gallery</span> <ArrowUpRight size={14} />
                </a>
                <a href="https://to.vrindopnishad.in/" target="_blank" rel="noopener noreferrer">
                  <span>Vrinda Tours</span> <ArrowUpRight size={14} />
                </a>
                <a href="https://path.vrindopnishad.in/" target="_blank" rel="noopener noreferrer">
                  <span>PDF Library</span> <ArrowUpRight size={14} />
                </a>
                <a href="#download-apps" onClick={closeAllNav}>
                  <span>Mobile Apps</span> <ArrowUpRight size={14} />
                </a>
              </div>

              {/* Extended Mega Menu Footer Controls */}
              <div className="mega-footer-controls">
                <button
                  type="button"
                  onClick={() => onLanguageChange(lang === 'english' ? 'hindi' : 'english')}
                  className="consensys-action-btn lang-btn"
                  title="Switch Language"
                >
                  <Globe size={14} />
                  <span className="lang-code">{lang === 'english' ? 'EN' : 'HI'}</span>
                </button>

                <AnimatedThemeToggler
                  variant="circle"
                  className="consensys-action-btn theme-btn"
                  title="Toggle Theme"
                />
              </div>
            </div>

          </div>
        </div>
      )}

      {/* MOBILE DRILL-DOWN NAVIGATION DRAWER (Target Screenshots) */}
      {mobileLevel && (
        <div className="consensys-mobile-drawer mobile-only">

          {/* Top Sticky Header Bar inside Mobile Drawer */}
          <div className="mobile-drawer-header">
            {mobileLevel === 'main' ? (
              <>
                <a href="index.html" className="consensys-logo-badge" title="Vrindopnishad Home" onClick={closeAllNav}>
                  <img
                    src="/v-logo-rounded/official-logo-dark.svg"
                    alt="Vrindopnishad Logo"
                    width="24"
                    height="24"
                  />
                </a>
                <button
                  type="button"
                  className="mobile-close-btn"
                  onClick={closeAllNav}
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="mobile-back-btn"
                  onClick={() => setMobileLevel('main')}
                  aria-label="Back"
                >
                  <ArrowLeft size={18} />
                </button>
                <div className="mobile-sub-title">
                  {mobileLevel === 'products' && (lang === 'hindi' ? 'उत्पाद' : 'Products')}
                  {mobileLevel === 'ecosystem' && (lang === 'hindi' ? 'इकोसिस्टम' : 'Ecosystem')}
                  {mobileLevel === 'company' && (lang === 'hindi' ? 'संस्था' : 'Company')}
                  {mobileLevel === 'blog' && (lang === 'hindi' ? 'आलेख' : 'Blog')}
                </div>
                <button
                  type="button"
                  className="mobile-close-btn"
                  onClick={closeAllNav}
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </>
            )}
          </div>

          <div className="mobile-drawer-body">
            {/* LEVEL 1: MAIN LEVEL (Target Screenshot) */}
            {mobileLevel === 'main' && (
              <div className="mobile-main-level">
                <div className="mobile-nav-list">
                  <button
                    type="button"
                    className="mobile-nav-item"
                    onClick={() => setMobileLevel('products')}
                  >
                    <span>{lang === 'hindi' ? 'उत्पाद' : 'Products'}</span>
                    <ArrowRight size={20} />
                  </button>

                  <button
                    type="button"
                    className="mobile-nav-item"
                    onClick={() => setMobileLevel('ecosystem')}
                  >
                    <span>{lang === 'hindi' ? 'इकोसिस्टम' : 'Ecosystem'}</span>
                    <ArrowRight size={20} />
                  </button>

                  <button
                    type="button"
                    className="mobile-nav-item"
                    onClick={() => setMobileLevel('company')}
                  >
                    <span>{lang === 'hindi' ? 'संस्था' : 'Company'}</span>
                    <ArrowRight size={20} />
                  </button>

                  <button
                    type="button"
                    className="mobile-nav-item"
                    onClick={() => setMobileLevel('blog')}
                  >
                    <span>{lang === 'hindi' ? 'आलेख' : 'Blog'}</span>
                    <ArrowRight size={20} />
                  </button>
                </div>

                {/* Social Links List (Target Screenshot) */}
                <div className="mobile-social-section">
                  <ul className="consensys-bordered-list">
                    <li>
                      <a href="https://path.vrindopnishad.in/" target="_blank" rel="noopener noreferrer">
                        <span>Bhajan Path</span> <ArrowUpRight size={16} />
                      </a>
                    </li>
                    <li>
                      <a href="https://pic.vrindopnishad.in/" target="_blank" rel="noopener noreferrer">
                        <span>Gallery</span> <ArrowUpRight size={16} />
                      </a>
                    </li>
                    <li>
                      <a href="https://to.vrindopnishad.in/" target="_blank" rel="noopener noreferrer">
                        <span>Vrinda Tours</span> <ArrowUpRight size={16} />
                      </a>
                    </li>
                    <li>
                      <a href="https://path.vrindopnishad.in/" target="_blank" rel="noopener noreferrer">
                        <span>PDF Library</span> <ArrowUpRight size={16} />
                      </a>
                    </li>
                    <li>
                      <a href="#download-apps" onClick={closeAllNav}>
                        <span>Mobile Apps</span> <ArrowUpRight size={16} />
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Mobile Quick Action Controls (Language, Auth & Theme Toggler) */}
                <div className="mobile-controls-row">
                  {isLoggedIn && user ? (
                    <button
                      type="button"
                      onClick={() => {
                        closeAllNav();
                        window.location.hash = '#auth-page';
                        if (onOpenAuth) onOpenAuth('signin');
                        else openAuthModal('signin');
                      }}
                      className="mobile-control-btn"
                    >
                      <User size={15} />
                      <span>{user.name.split(' ')[0]} (Account)</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        closeAllNav();
                        window.location.hash = '#auth-page';
                        if (onOpenAuth) onOpenAuth('signin');
                        else openAuthModal('signin');
                      }}
                      className="mobile-control-btn"
                    >
                      <LogIn size={15} />
                      <span>{lang === 'hindi' ? 'साइन इन' : 'Sign In'}</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => onLanguageChange(lang === 'english' ? 'hindi' : 'english')}
                    className="mobile-control-btn"
                  >
                    <Globe size={15} />
                    <span>{lang === 'english' ? 'EN' : 'HI'}</span>
                  </button>

                  <AnimatedThemeToggler
                    variant="circle"
                    className="mobile-control-btn theme-btn"
                    title="Toggle Theme"
                  />
                </div>
              </div>
            )}

            {/* LEVEL 2: PRODUCTS SUB-LEVEL */}
            {mobileLevel === 'products' && (
              <div className="mobile-sub-level">
                <a href="#projects" className="mobile-banner-card" onClick={closeAllNav}>
                  <h2 className="mobile-banner-text">
                    {lang === 'hindi' ? 'हमारे समस्त उत्पादों को देखें' : 'Explore our suite of products'}
                  </h2>
                  <div className="mobile-banner-arrow">
                    <ArrowRight size={18} />
                  </div>
                </a>

                <div className="mobile-sub-section">
                  <div className="mobile-section-title">
                    {lang === 'hindi' ? 'फ्लैगशिप ऐप्स' : 'Flagship Apps'}
                  </div>
                  <ul className="consensys-bordered-list">
                    <li>
                      <a href="https://path.vrindopnishad.in/" target="_blank" rel="noopener noreferrer">
                        <span>Vrindopnishad Path</span> <ArrowUpRight size={16} />
                      </a>
                    </li>
                    <li>
                      <a href="#services" onClick={closeAllNav}>
                        <span>Foody Vrinda</span> <ArrowUpRight size={16} />
                      </a>
                    </li>
                    <li>
                      <a href="https://pic.vrindopnishad.in/" target="_blank" rel="noopener noreferrer">
                        <span>Chitra Vrinda</span> <ArrowUpRight size={16} />
                      </a>
                    </li>
                    <li>
                      <a href="https://to.vrindopnishad.in/" target="_blank" rel="noopener noreferrer">
                        <span>Vrinda Tours</span> <ArrowUpRight size={16} />
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="mobile-sub-section">
                  <div className="mobile-section-title">
                    {lang === 'hindi' ? 'डिजिटल ग्रन्थागार एवं साधन' : 'Digital Archives & Tools'}
                  </div>
                  <ul className="consensys-bordered-list">
                    <li>
                      <a href="https://path.vrindopnishad.in/" target="_blank" rel="noopener noreferrer">
                        <span>PDF Sacred Archive</span> <ArrowUpRight size={16} />
                      </a>
                    </li>
                    <li>
                      <a href="https://path.vrindopnishad.in/" target="_blank" rel="noopener noreferrer">
                        <span>Sant-Vaani Discourses</span> <ArrowUpRight size={16} />
                      </a>
                    </li>
                    <li>
                      <a href="#download-apps" onClick={closeAllNav}>
                        <span>Vrindopnishad Mobile Apps</span> <ArrowUpRight size={16} />
                      </a>
                    </li>
                    <li>
                      <a href="#about" onClick={closeAllNav}>
                        <span>Vedic Philosophy Research</span> <ArrowUpRight size={16} />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* LEVEL 2: ECOSYSTEM SUB-LEVEL (Target Screenshot 1) */}
            {mobileLevel === 'ecosystem' && (
              <div className="mobile-sub-level">
                <a href="#about" className="mobile-banner-card" onClick={closeAllNav}>
                  <h2 className="mobile-banner-text">
                    {lang === 'hindi' ? 'वैदिक ज्ञान एवं ब्रज धाम संस्कृति को समझें' : 'Learn how authentic Vedic wisdom reshapes modern life. View the report'}
                  </h2>
                  <div className="mobile-banner-arrow">
                    <ArrowRight size={18} />
                  </div>
                </a>

                <div className="mobile-sub-section">
                  <div className="mobile-section-title">Sacred Wisdom</div>
                  <ul className="consensys-bordered-list">
                    <li>
                      <a href="https://path.vrindopnishad.in/" target="_blank" rel="noopener noreferrer">
                        <span>Bhagavad Gita & Upanishads</span> <ArrowUpRight size={16} />
                      </a>
                    </li>
                    <li>
                      <a href="https://path.vrindopnishad.in/" target="_blank" rel="noopener noreferrer">
                        <span>Daily Stotra Path & Nitya Niyam</span> <ArrowUpRight size={16} />
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="mobile-sub-section">
                  <div className="mobile-section-title">Braj Dham Pilgrimages</div>
                  <ul className="consensys-bordered-list">
                    <li>
                      <a href="https://to.vrindopnishad.in/" target="_blank" rel="noopener noreferrer">
                        <span>Vrindavan Pilgrimage Guide</span> <ArrowUpRight size={16} />
                      </a>
                    </li>
                    <li>
                      <a href="https://to.vrindopnishad.in/" target="_blank" rel="noopener noreferrer">
                        <span>Barsana & Nandgaon Parikrama</span> <ArrowUpRight size={16} />
                      </a>
                    </li>
                    <li>
                      <a href="https://to.vrindopnishad.in/" target="_blank" rel="noopener noreferrer">
                        <span>Govardhan Giriraj Yatra</span> <ArrowUpRight size={16} />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* LEVEL 2: COMPANY SUB-LEVEL */}
            {mobileLevel === 'company' && (
              <div className="mobile-sub-level">
                <a href="#about" className="mobile-banner-card" onClick={closeAllNav}>
                  <h2 className="mobile-banner-text">
                    {lang === 'hindi' ? 'वृंदोपनिषद संस्था के बारे में जाने' : 'Explore the Vrindopnishad Digital Sanctuary'}
                  </h2>
                  <div className="mobile-banner-arrow">
                    <ArrowRight size={18} />
                  </div>
                </a>

                <div className="mobile-sub-section">
                  <div className="mobile-section-title">Company</div>
                  <ul className="consensys-bordered-list">
                    <li>
                      <a href="#about" onClick={closeAllNav}>
                        <span>About Vrindopnishad</span> <ArrowUpRight size={16} />
                      </a>
                    </li>
                    <li>
                      <a href="#philosophy" onClick={closeAllNav}>
                        <span>Vedic Philosophy & Core Mission</span> <ArrowUpRight size={16} />
                      </a>
                    </li>
                    <li>
                      <a href="#footer" onClick={closeAllNav}>
                        <span>Sanctuary Team & Contact</span> <ArrowUpRight size={16} />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* LEVEL 2: BLOG SUB-LEVEL (Target Screenshot 4) */}
            {mobileLevel === 'blog' && (
              <div className="mobile-sub-level">
                <a href="#blog" className="mobile-banner-card" onClick={closeAllNav}>
                  <h2 className="mobile-banner-text">
                    {lang === 'hindi' ? 'आलेख पढ़ें' : 'Explore the Blog'}
                  </h2>
                  <div className="mobile-banner-arrow">
                    <ArrowRight size={18} />
                  </div>
                </a>

                <div className="mobile-sub-section">
                  <div className="mobile-section-title">Featured</div>

                  <div className="mobile-blog-cards-list">
                    {/* Card 1: Electric Blue */}
                    <div className="mobile-blog-card">
                      <div className="mobile-card-media card-blue-bg">
                        <img src="/v-logo-rounded/official-logo-dark.svg" alt="Vrindopnishad" className="split-card-logo-img" width="65" height="65" />
                      </div>

                      <div className="mobile-card-info">
                        <div className="card-category">SACRED ANNOUNCEMENT, NEWS</div>
                        <h3 className="card-title">
                          Vrindopnishad launches authentic digital stotra archive for seekers worldwide.
                        </h3>
                        <div className="card-date">May 8, 2026</div>
                      </div>
                    </div>

                    {/* Card 2: Red-Orange (Screenshot 4) */}
                    <div className="mobile-blog-card">
                      <div className="mobile-card-media card-orange-bg">
                        <img src="/v-logo-rounded/official-logo-dark.svg" alt="Vrindopnishad" className="split-card-logo-img black-logo" width="65" height="65" />
                      </div>

                      <div className="mobile-card-info">
                        <div className="card-category">SPIRITUAL DISCOURSES</div>
                        <h3 className="card-title">
                          Sant-Vaani daily discourses updated with authentic Sanskrit shlokas & Hindi translations.
                        </h3>
                        <div className="card-date">May 1, 2026</div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
};

export default ConsensysMegaNav;
