import React, { useState, useEffect, useRef } from 'react';
import './OpenAISubNav.css';

export type SubNavTabType = 'get-started' | 'go-further' | 'use-cases';

interface OpenAISubNavProps {
  lang?: 'english' | 'hindi';
  activeTab: SubNavTabType;
  onTabChange: (tab: SubNavTabType) => void;
}

export const OpenAISubNav: React.FC<OpenAISubNavProps> = ({
  lang = 'english',
  activeTab,
  onTabChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number }>({ left: 0, width: 0 });
  const [isPinned, setIsPinned] = useState(false);
  const [isNavHidden, setIsNavHidden] = useState(false);
  const [isSectionVisible, setIsSectionVisible] = useState(true);

  // Dynamic Scroll Pinning & Section Boundary Detection
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const sectionContainer = document.getElementById('openai-academy-wrapper');
      const headerEl = document.querySelector('.consensys-header');

      const navIsHidden = headerEl
        ? headerEl.classList.contains('nav-hidden')
        : (currentScrollY > 60 && currentScrollY > lastScrollY);

      setIsNavHidden(navIsHidden);

      if (sectionContainer) {
        const rect = sectionContainer.getBoundingClientRect();
        const topThreshold = navIsHidden ? 24 : 80;
        const unpinTopThreshold = topThreshold + 60;

        // Section bounds visibility: True while scrolling within the academy section
        const isInsideSection = rect.top <= topThreshold + 180 && rect.bottom >= topThreshold + 120;
        setIsSectionVisible(isInsideSection);

        // Keep pinned once scrolled into section
        setIsPinned((prevPinned) => {
          if (!prevPinned) {
            return rect.top <= topThreshold && rect.bottom > 0;
          } else {
            return rect.top <= unpinTopThreshold && rect.bottom > -200;
          }
        });
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update sliding background pill indicator position smoothly when activeTab changes
  useEffect(() => {
    const updateIndicator = () => {
      if (!containerRef.current) return;
      const activeBtn = containerRef.current.querySelector(`.openai-subnav-tab.active`) as HTMLElement;
      if (activeBtn) {
        setIndicatorStyle({
          left: activeBtn.offsetLeft,
          width: activeBtn.offsetWidth,
        });
      }
    };

    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    const timer = setTimeout(updateIndicator, 50);
    return () => {
      window.removeEventListener('resize', updateIndicator);
      clearTimeout(timer);
    };
  }, [activeTab, isPinned, isNavHidden, isSectionVisible]);

  const scrollToSection = (id: string, tab: SubNavTabType) => {
    onTabChange(tab);
    const element = document.getElementById(id);
    if (element) {
      const topOffset = isNavHidden ? 75 : 140;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <div
        className={`openai-subnav-sticky-wrapper ${isSectionVisible ? 'is-section-active' : ''} ${isNavHidden ? 'nav-hidden-top' : ''}`}
      >
        <div className="openai-subnav-pill-container" ref={containerRef}>
          {/* Animated Sliding Background Glider */}
          <div
            className="openai-subnav-active-glider"
            style={{
              left: `${indicatorStyle.left}px`,
              width: `${indicatorStyle.width}px`,
            }}
          />

          <button
            type="button"
            onClick={() => scrollToSection('get-started-section', 'get-started')}
            className={`openai-subnav-tab ${activeTab === 'get-started' ? 'active' : ''}`}
          >
            {lang === 'hindi' ? 'नित्य दर्शन' : 'Darshan'}
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('go-further-section', 'go-further')}
            className={`openai-subnav-tab ${activeTab === 'go-further' ? 'active' : ''}`}
          >
            {lang === 'hindi' ? 'वैदिक ग्रन्थ' : 'Scriptures'}
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('use-cases-section', 'use-cases')}
            className={`openai-subnav-tab ${activeTab === 'use-cases' ? 'active' : ''}`}
          >
            {lang === 'hindi' ? 'साधना एवं मन्त्र' : 'Meditation'}
          </button>
        </div>
      </div>
    </>
  );
};
