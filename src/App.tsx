import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { StorySection } from './components/StorySection';
import { ProjectsShowcase } from './components/ProjectsShowcase';
import { ValuesSection } from './components/ValuesSection';
import { BentoGrid } from './components/BentoGrid';
import { AppsSection } from './components/AppsSection';
import { VedicPhilosophySection } from './components/VedicPhilosophySection';
import { SanctuaryExperienceSection } from './components/SanctuaryExperienceSection';
import { HorizontalScrollText } from './components/HorizontalScrollText';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { OfflineOverlay } from './components/OfflineOverlay';
import { NotificationToast } from './components/NotificationToast';
import { ToolsMenuModal } from './components/ToolsMenuModal';
import { DeveloperGuideModal } from './components/DeveloperGuideModal';
import { useScrollTextEffects } from './hooks/useScrollTextEffects';

import { DigitalUniverseSection } from './components/DigitalUniverseSection';

const INITIAL_PROJECTS = [
  {
    id: 'vrindopnishad-path',
    title: 'Vrindopnishad Path',
    titleHindi: 'वृंदोपनिषद पाठ',
    category: 'Vedic Scriptures',
    description: 'Authentic Stotras, Mantras & Sacred Spiritual Wisdom',
    descriptionHindi: 'प्रामाणिक वैदिक पाठ, स्तोत्र एवं आध्यात्मिक साधना',
    imageUrl: '/images/projects/chitra_vrinda_hero.jpg',
    link: 'Vrindopnishad Web/sketch/main/new-read-me.html',
    isFlagship: true
  },
  {
    id: 'foody-vrinda',
    title: 'Foody Vrinda',
    category: 'Cloud Kitchen',
    description: 'Delicious homemade meals delivered fresh to your doorstep',
    imageUrl: '/images/projects/foody_vrinda_hero.jpg',
    link: 'Projects/Cloud-Kitchen/kitchen.html',
    isFlagship: false
  },
  {
    id: 'chitra-vrinda',
    title: 'Chitra Vrinda',
    category: 'Digital Art',
    description: 'Artistic photography & digital creations',
    imageUrl: '/images/projects/chitra_vrinda_hero.jpg',
    link: 'Vrindopnishad Web/Pictures/main/Gallery.html',
    isFlagship: false
  },
  {
    id: 'vrinda-tours',
    title: 'Vrinda Tours',
    category: 'Pilgrimage',
    description: 'Sacred journeys to holy destinations',
    imageUrl: '/images/projects/vrinda_tours_hero.jpg',
    link: 'Projects/Vrinda-Tours/vrinda-tours.html',
    isFlagship: false
  }
];

export const App: React.FC = () => {
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isDevGuideOpen, setIsDevGuideOpen] = useState(false);
  const [lang, setLang] = useState<'english' | 'hindi'>('english');
  const [loadingCount, setLoadingCount] = useState(10);
  const [loadingDone, setLoadingDone] = useState(false);

  useEffect(() => {
    const updateCounter = () => {
      setLoadingCount(prev => {
        if (prev < 100) {
          return prev + 1;
        } else {
          setTimeout(() => setLoadingDone(true), 50);
          return 100;
        }
      });
    };

    const interval = setInterval(updateCounter, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      {/* Scroll progress bar */}
      <div className="scroll-progress"></div>

      {/* Preloader counter with morphing jumping cube animation */}
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
      <OfflineOverlay />
      <NotificationToast />

      <Header
        onOpenTools={() => setIsToolsOpen(true)}
        onOpenDevGuide={() => setIsDevGuideOpen(true)}
        lang={lang}
        onLanguageChange={setLang}
      />

      <main>
        <Hero />
        <StorySection />
        <HorizontalScrollText />
        <VedicPhilosophySection lang={lang} />
        <ProjectsShowcase projects={INITIAL_PROJECTS} lang={lang} />
        <SanctuaryExperienceSection lang={lang} />
        <DigitalUniverseSection lang={lang} />
        <ValuesSection />
        <BentoGrid />
        <AppsSection />
      </main>


      <Footer
        onOpenDevGuide={() => setIsDevGuideOpen(true)}
        lang={lang}
      />

      <ToolsMenuModal
        isOpen={isToolsOpen}
        onClose={() => setIsToolsOpen(false)}
      />

      <DeveloperGuideModal
        isOpen={isDevGuideOpen}
        onClose={() => setIsDevGuideOpen(false)}
      />
    </div>
  );
};

export default App;
