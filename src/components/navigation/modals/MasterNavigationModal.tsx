import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { InfiniteMenu } from '../../effects';

interface MasterNavigationModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'english' | 'hindi';
}

const DESTINATIONS = [
  {
    id: 'vrindopnishad-path',
    title: 'Vrindopnishad Path',
    titleHindi: 'वृंदोपनिषद पाठ',
    category: 'Sacred Scriptures',
    description: 'Authentic Stotras, Mantras & Sacred Spiritual Wisdom',
    descriptionHindi: 'प्रामाणिक वैदिक पाठ, स्तोत्र एवं आध्यात्मिक साधना',
    imageUrl: '/images/projects/chitra_vrinda_hero.jpg',
    link: 'https://path.vrindopnishad.in/'
  },
  {
    id: 'foody-vrinda',
    title: 'Foody Vrinda',
    titleHindi: 'फुडी वृंदा',
    category: 'Cloud Kitchen',
    description: 'Delicious satvik homemade meals delivered fresh to your doorstep',
    descriptionHindi: 'स्वादिष्ट सात्विक भोजन आपके द्वार तक',
    imageUrl: '/images/projects/foody_vrinda_hero.jpg',
    link: '#services'
  },
  {
    id: 'chitra-vrinda',
    title: 'Chitra Vrinda',
    titleHindi: 'चित्र वृंदा',
    category: 'Digital Art & Gallery',
    description: 'Divine photography, sacred art & digital creations',
    descriptionHindi: 'दिव्य चित्रकला एवं कलात्मक डिजिटल संग्रह',
    imageUrl: '/images/projects/chitra_vrinda_hero.jpg',
    link: 'https://pic.vrindopnishad.in/'
  },
  {
    id: 'vrinda-tours',
    title: 'Vrinda Tours',
    titleHindi: 'वृंदा टूर्स',
    category: 'Pilgrimage & Yatra',
    description: 'Interactive Brij Dham yatra guide & 84 Kos pilgrimage route',
    descriptionHindi: 'ब्रज धाम यात्रा मार्गदर्शन एवं तीर्थ दर्शन',
    imageUrl: '/images/projects/vrinda_tours_hero.jpg',
    link: 'https://to.vrindopnishad.in/'
  },
  {
    id: 'pdf-library',
    title: 'PDF Sacred Archive',
    titleHindi: 'पीडीएफ ग्रन्थागार',
    category: 'Document Archive',
    description: 'Digital library of ancient manuscripts & spiritual publications',
    descriptionHindi: 'प्राचीन ग्रंथों एवं वैदिक साहित्य का डिजिटल संग्रह',
    imageUrl: '/images/projects/chitra_vrinda_hero.jpg',
    link: 'https://path.vrindopnishad.in/'
  },
  {
    id: 'sant-vaani',
    title: 'Sant-Vaani',
    titleHindi: 'संत-वाणी',
    category: 'Spiritual Discourses',
    description: 'Sacred shlokas, saint discourses & divine wisdom audio',
    descriptionHindi: 'संतों के अमूल्य प्रवचन एवं वैदिक ऋचाएं',
    imageUrl: '/images/projects/chitra_vrinda_hero.jpg',
    link: 'https://path.vrindopnishad.in/'
  },
  {
    id: 'get-apps',
    title: 'Vrindopnishad Apps',
    titleHindi: 'वृंदोपनिषद ऐप्स',
    category: 'Mobile Applications',
    description: 'Android apps for Foody Vrinda, Bhajan Path & pilgrimage guides',
    descriptionHindi: 'मोबाइल ऐप्स - सात्विक भोजन, भजन एवं यात्रा मार्गदर्शिका',
    imageUrl: '/images/projects/foody_vrinda_hero.jpg',
    link: '#download-apps'
  }
];

export const MasterNavigationModal: React.FC<MasterNavigationModalProps> = ({
  isOpen,
  onClose,
  lang
}) => {
  // Lock background body scrolling when open (per AGENTS.md rule)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const menuItems = DESTINATIONS.map(p => ({
    image: p.imageUrl,
    link: p.link,
    title: lang === 'hindi' && p.titleHindi ? p.titleHindi : p.title,
    description: lang === 'hindi' && p.descriptionHindi ? p.descriptionHindi : p.description,
  }));

  return (
    <div 
      className="master-nav-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'var(--bg-color)',
        color: 'var(--text-color)',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        animation: 'masterNavFadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {/* Top Floating Glass Header Overlay */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.25rem 2.5rem',
          zIndex: 20,
          background: 'linear-gradient(to bottom, rgba(var(--bg-color-rgb), 0.95) 0%, rgba(var(--bg-color-rgb), 0) 100%)',
          pointerEvents: 'none'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', pointerEvents: 'auto' }}>
          <img 
            src="/v-logo-rounded/official-logo.svg" 
            alt="Vrindopnishad Logo" 
            style={{ width: '44px', height: '44px', objectFit: 'contain' }}
          />
          <div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '0.06em', color: 'var(--text-color)' }}>
              VRINDOPNISHAD
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--secondary-color)', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>
              NAVIGATION HUB
            </div>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="master-nav-close-btn"
          aria-label="Close Navigation Menu"
          style={{
            pointerEvents: 'auto',
            background: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
            color: 'var(--text-color)',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            transition: 'all 0.25s ease'
          }}
        >
          <X size={22} />
        </button>
      </div>

      {/* Fullscreen 3D Sphere Canvas Container */}
      <div 
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100vw', 
          height: '100vh',
          zIndex: 1 
        }}
      >
        <InfiniteMenu items={menuItems} />
      </div>
    </div>
  );
};

export default MasterNavigationModal;
