import React, { useState, useEffect } from 'react';
import {
  Header,
  Hero,
  StorySection,
  ProjectsShowcase,
  ValuesSection,
  BentoGrid,
  AppsSection,
  VedicPhilosophySection,
  SanctuaryExperienceSection,
  HorizontalScrollText,
  Footer,
  CustomCursor,
  OfflineOverlay,
  NotificationToast,
  ToolsMenuModal,
  MasterNavigationModal,
  DigitalUniverseSection,
  MouseEffects,
  AuthModal,
  AuthPage,
  OpenAISubNav,
  OpenAIAcademySection,
  VedicAskInputBar,
  WisdomPathwayModal,
  AmbientSoundPlayer,
  VedicSageModal,
  QuoteBuilderModal,
} from './components';
import { AuthProvider, useAuth } from './context/AuthContext';

const AppContent: React.FC = () => {
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
  const [view, setView] = useState<'home' | 'auth'>('home');
  const [lang, setLang] = useState<'english' | 'hindi'>('english');
  const [loadingCount, setLoadingCount] = useState(10);
  const [loadingDone, setLoadingDone] = useState(false);

  // New Interactive Feature States
  const [isWisdomModalOpen, setIsWisdomModalOpen] = useState(false);
  const [isSageModalOpen, setIsSageModalOpen] = useState(false);
  const [sageQuery, setSageQuery] = useState<string | null>(null);
  const [quoteVerse, setQuoteVerse] = useState<{ shloka: string; translation: string; source: string } | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const { isAuthModalOpen, closeAuthModal, openAuthModal } = useAuth();

  const handleOpenSageModal = (query: string) => {
    setSageQuery(query);
    setIsSageModalOpen(true);
  };

  const handleOpenQuoteBuilder = (verse: { shloka: string; translation: string; source: string }) => {
    setQuoteVerse(verse);
    setIsQuoteModalOpen(true);
  };

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#signin' || hash === '#register') {
        openAuthModal(hash === '#register' ? 'register' : 'signin');
      } else if (hash === '#auth-page' || hash === '#account') {
        setView('auth');
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  useEffect(() => {
    const handleReady = () => {
      setLoadingCount(100);
      setTimeout(() => setLoadingDone(true), 100);
    };

    if (document.readyState === 'complete') {
      handleReady();
    } else {
      window.addEventListener('load', handleReady, { once: true });
      const fallback = setTimeout(handleReady, 400);
      return () => {
        window.removeEventListener('load', handleReady);
        clearTimeout(fallback);
      };
    }
  }, []);

  if (view === 'auth') {
    return (
      <AuthPage
        onBackToHome={() => {
          setView('home');
          window.location.hash = '';
        }}
        lang={lang}
      />
    );
  }

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      <div className="scroll-progress"></div>

      {!loadingDone && (
        <div className="loader" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'var(--bg-color)',
          zIndex: 999999,
          display: 'flex',
          flexDirection: 'column',
          gap: '1.75rem',
          justifyContent: 'center',
          alignItems: 'center',
          transition: 'opacity 0.5s ease',
          opacity: loadingCount === 100 ? 0 : 1
        }}>
          <div className="cube-loader-container">
            <div className="cube"><div className="cube__inner"></div></div>
            <div className="cube"><div className="cube__inner"></div></div>
            <div className="cube"><div className="cube__inner"></div></div>
          </div>
          <div className="counter" style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-color)', letterSpacing: '0.08em' }}>
            {loadingCount}%
          </div>
        </div>
      )}

      <CustomCursor />
      <MouseEffects color="#c3f53c" interactionMode="sniper" effectSize={35} />
      <OfflineOverlay />
      <NotificationToast isReady={loadingDone} />


      <Header
        onOpenTools={() => setIsToolsOpen(true)}
        onOpenNavMenu={() => setIsNavMenuOpen(true)}
        onOpenAuth={(mode) => {
          setView('auth');
          window.location.hash = '#auth-page';
          if (mode) openAuthModal(mode);
        }}
        lang={lang}
        onLanguageChange={setLang}
      />

      <main style={{ paddingBottom: '6.5rem' }}>
        <Hero lang={lang} />

        <HorizontalScrollText />

        <SanctuaryExperienceSection lang={lang} />

        <OpenAIAcademySection
          lang={lang}
          onNavigateAuth={() => {
            setView('auth');
            window.location.hash = '#auth-page';
          }}
        />
        <StorySection />
        <VedicPhilosophySection lang={lang} />
        <DigitalUniverseSection lang={lang} />
        <ValuesSection />
        <BentoGrid />
        <AppsSection />
      </main>

      {/* Floating Interactive Search Bar Pinned Across Sections Till Apps Section */}
      <VedicAskInputBar
        lang={lang}
        onSearchSubmit={handleOpenSageModal}
      />

      <Footer lang={lang} />

      {/* Onboarding Wisdom Pathway Modal */}
      <WisdomPathwayModal
        isOpen={isWisdomModalOpen}
        onClose={() => setIsWisdomModalOpen(false)}
        lang={lang}
      />

      {/* Vedic Sage AI Scriptural Citation Drawer */}
      <VedicSageModal
        isOpen={isSageModalOpen}
        query={sageQuery}
        onClose={() => setIsSageModalOpen(false)}
        lang={lang}
        onOpenQuoteBuilder={handleOpenQuoteBuilder}
      />

      {/* Social Scripture Quote Builder Modal */}
      <QuoteBuilderModal
        isOpen={isQuoteModalOpen}
        verse={quoteVerse}
        onClose={() => setIsQuoteModalOpen(false)}
        lang={lang}
      />

      <MasterNavigationModal
        isOpen={isNavMenuOpen}
        onClose={() => setIsNavMenuOpen(false)}
        lang={lang}
      />

      <ToolsMenuModal
        isOpen={isToolsOpen}
        onClose={() => setIsToolsOpen(false)}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        lang={lang}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
