import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Menu, X } from 'lucide-react';
import './CurvedElasticDrawer.css';

interface CurvedElasticDrawerProps {
  lang?: 'english' | 'hindi';
  onNavigateSection?: (sectionId: string) => void;
}

export const CurvedElasticDrawer: React.FC<CurvedElasticDrawerProps> = ({
  lang = 'english',
  onNavigateSection,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolledHidden, setIsScrolledHidden] = useState(false);
  const pathRef = useRef<SVGPathElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lastScrollY = useRef(0);

  // Elastic SVG curve control point state (viewBox 0..200, 0..1000)
  const curveState = useRef({
    controlX: 130,   // Resting curve depth matching Hello Monday (90px-100px bulge)
    controlY: 500,   // Control Y center
  });

  const HEIGHT = 1000;
  const WIDTH = 200;

  // Render Hello Monday exact curved SVG path
  const updateCurve = (cX: number, cY: number) => {
    if (!pathRef.current) return;
    const clampedY = Math.max(50, Math.min(950, cY));
    const d = `M ${WIDTH} 0 Q ${cX} ${clampedY} ${WIDTH} ${HEIGHT} Z`;
    pathRef.current.setAttribute('d', d);
  };

  useEffect(() => {
    // Initial resting curve state
    updateCurve(curveState.current.controlX, curveState.current.controlY);

    // Scroll listener: auto-hide handle when scrolling down, show when scrolling up or at top
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 100 && currentScrollY > lastScrollY.current) {
        setIsScrolledHidden(true);
      } else {
        setIsScrolledHidden(false);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const relY = ((e.clientY - rect.top) / rect.height) * HEIGHT;
    const distFromRight = rect.right - e.clientX;

    // Pull control point deeper inwards (liquid wave elasticity)
    const targetControlX = Math.max(-100, 130 - (distFromRight * 1.1));

    gsap.to(curveState.current, {
      controlX: targetControlX,
      controlY: relY,
      duration: 0.35,
      ease: 'power2.out',
      onUpdate: () => {
        updateCurve(curveState.current.controlX, curveState.current.controlY);
      },
    });
  };

  const handlePointerLeave = () => {
    // Elastic spring back to resting state (controlX: 130, controlY: 500)
    gsap.to(curveState.current, {
      controlX: 130,
      controlY: 500,
      duration: 1.2,
      ease: 'elastic.out(1.2, 0.35)',
      onUpdate: () => {
        updateCurve(curveState.current.controlX, curveState.current.controlY);
      },
    });
  };

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
    // Curtain sweep elastic animation
    gsap.to(curveState.current, {
      controlX: -300,
      controlY: 500,
      duration: 0.45,
      ease: 'power3.inOut',
      onUpdate: () => {
        updateCurve(curveState.current.controlX, 500);
      },
      onComplete: () => {
        updateCurve(130, 500);
      }
    });
  };

  const handleJumpTo = (id: string) => {
    setIsOpen(false);
    if (onNavigateSection) {
      onNavigateSection(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Hello Monday Signature Inverting Curved Handle (Always visible at right edge) */}
      <div
        ref={containerRef}
        className={`hello-monday-handle-wrapper ${isOpen ? 'is-menu-open' : ''} ${isScrolledHidden && !isOpen ? 'scroll-hidden' : ''}`}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onClick={toggleDrawer}
        title={isOpen ? "Close Menu" : "Open Menu"}
        aria-label={isOpen ? "Close Menu" : "Open Menu"}
      >
        <svg
          className="hello-monday-svg"
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          preserveAspectRatio="none"
        >
          <path
            ref={pathRef}
            fill={isOpen ? "#ffffff" : "#050508"}
          />
        </svg>

        {/* Centered Icon: White 3-line Menu when closed, Black X when open */}
        <div className={`hello-monday-icon-center ${isOpen ? 'open-icon' : 'closed-icon'}`}>
          {isOpen ? (
            <X size={20} className="text-black opacity-100 stroke-[2.8]" />
          ) : (
            <Menu size={20} className="text-white opacity-100 stroke-[2.4]" />
          )}
        </div>
      </div>

      {/* Hello Monday Editorial Pitch-Black Active Menu Overlay (Matches Bottom Reference Image) */}
      <div className={`hello-monday-menu-overlay ${isOpen ? 'active' : ''}`}>
        {/* Top Left Editorial Logo */}
        <div className="hm-editorial-logo">
          <span className="hm-logo-line1">VRINDOPNISHAD</span>
          <span className="hm-logo-line2">/ DEPT.</span>
        </div>

        {/* Middle-Right Stacked Serif Links (Exact Hello Monday Typography Layout) */}
        <nav className="hm-editorial-nav">
          <button className="hm-editorial-link" onClick={() => handleJumpTo('academy-section')}>
            {lang === 'hindi' ? 'दिव्य संग्रह' : 'Sacred Collection'}
          </button>
          <button className="hm-editorial-link" onClick={() => handleJumpTo('story-section')}>
            {lang === 'hindi' ? 'ज्ञान केंद्र' : 'Wisdom Hub'}
          </button>
          <button className="hm-editorial-link" onClick={() => handleJumpTo('contact')}>
            {lang === 'hindi' ? 'हमारा उद्देश्य' : 'Our Mission'}
          </button>
          <button className="hm-editorial-link active-link" onClick={() => handleJumpTo('sanctuary-section')}>
            <span className="hm-bullet">•</span>
            {lang === 'hindi' ? 'डिजिटल मंदिर' : 'Sacred Sanctuary'}
          </button>
          <button className="hm-editorial-link" onClick={() => handleJumpTo('sanctuary-section')}>
            {lang === 'hindi' ? 'ब्रज यात्रा' : 'Braj Dham'}
          </button>
        </nav>

        {/* Bottom-Right Minimal Footer Links */}
        <div className="hm-editorial-footer">
          <button onClick={() => handleJumpTo('academy-section')}>Panchang</button>
          <button onClick={() => handleJumpTo('story-section')}>Daily Sadhana</button>
          <button onClick={() => handleJumpTo('sanctuary-section')}>Vedic Sanctuary</button>
        </div>
      </div>
    </>
  );
};

export default CurvedElasticDrawer;
