import React, { useState, useEffect } from 'react';
import { X, ExternalLink, BookOpen, Utensils, Image, MapPin, FileText, Smartphone, Sparkles, Search } from 'lucide-react';
import LEDTicker from './originkit/ui/pixel-led-display';
import InfiniteMenu from './InfiniteMenu';
import OptionWheel from './OptionWheel';

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
    link: 'https://path.vrindopnishad.in/',
    icon: <BookOpen size={20} />,
    tag: 'POPULAR'
  },
  {
    id: 'foody-vrinda',
    title: 'Foody Vrinda',
    titleHindi: 'फुडी वृंदा',
    category: 'Cloud Kitchen',
    description: 'Delicious satvik homemade meals delivered fresh to your doorstep',
    descriptionHindi: 'स्वादिष्ट सात्विक भोजन आपके द्वार तक',
    imageUrl: '/images/projects/foody_vrinda_hero.jpg',
    link: '#services',
    icon: <Utensils size={20} />,
    tag: 'FRESH'
  },
  {
    id: 'chitra-vrinda',
    title: 'Chitra Vrinda',
    titleHindi: 'चित्र वृंदा',
    category: 'Digital Art & Gallery',
    description: 'Divine photography, sacred art & digital creations',
    descriptionHindi: 'दिव्य चित्रकला एवं कलात्मक डिजिटल संग्रह',
    imageUrl: '/images/projects/chitra_vrinda_hero.jpg',
    link: 'https://pic.vrindopnishad.in/',
    icon: <Image size={20} />,
    tag: 'GALLERY'
  },
  {
    id: 'vrinda-tours',
    title: 'Vrinda Tours',
    titleHindi: 'वृंदा टूर्स',
    category: 'Pilgrimage & Yatra',
    description: 'Interactive Brij Dham yatra guide & 84 Kos pilgrimage route',
    descriptionHindi: 'ब्रज धाम यात्रा मार्गदर्शन एवं तीर्थ दर्शन',
    imageUrl: '/images/projects/vrinda_tours_hero.jpg',
    link: 'https://to.vrindopnishad.in/',
    icon: <MapPin size={20} />,
    tag: 'YATRA'
  },
  {
    id: 'pdf-library',
    title: 'PDF Sacred Archive',
    titleHindi: 'पीडीएफ ग्रन्थागार',
    category: 'Document Archive',
    description: 'Digital library of ancient manuscripts & spiritual publications',
    descriptionHindi: 'प्राचीन ग्रंथों एवं वैदिक साहित्य का डिजिटल संग्रह',
    imageUrl: '/images/projects/chitra_vrinda_hero.jpg',
    link: 'https://vrindopnishad.in/Vrindopnishad%20Web/pdf/main/pdf-viewer.html',
    icon: <FileText size={20} />,
    tag: 'LIBRARY'
  },
  {
    id: 'sant-vaani',
    title: 'Sant-Vaani',
    titleHindi: 'संत-वाणी',
    category: 'Spiritual Discourses',
    description: 'Sacred shlokas, saint discourses & divine wisdom audio',
    descriptionHindi: 'संतों के अमूल्य प्रवचन एवं वैदिक ऋचाएं',
    imageUrl: '/images/projects/chitra_vrinda_hero.jpg',
    link: 'https://path.vrindopnishad.in/',
    icon: <Sparkles size={20} />,
    tag: 'AUDIO'
  },
  {
    id: 'get-apps',
    title: 'Vrindopnishad Apps',
    titleHindi: 'वृंदोपनिषद ऐप्स',
    category: 'Mobile Applications',
    description: 'Android apps for Foody Vrinda, Bhajan Path & pilgrimage guides',
    descriptionHindi: 'मोबाइल ऐप्स - सात्विक भोजन, भजन एवं यात्रा मार्गदर्शिका',
    imageUrl: '/images/projects/foody_vrinda_hero.jpg',
    link: '#download-apps',
    icon: <Smartphone size={20} />,
    tag: 'MOBILE'
  }
];

export const MasterNavigationModal: React.FC<MasterNavigationModalProps> = ({
  isOpen,
  onClose,
  lang
}) => {
  const [viewMode, setViewMode] = useState<'grid' | '3d' | 'wheel'>('grid');
  const [selectedWheelIdx, setSelectedWheelIdx] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');

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

  const filteredDestinations = DESTINATIONS.filter(item => {
    const name = lang === 'hindi' && item.titleHindi ? item.titleHindi : item.title;
    const desc = lang === 'hindi' && item.descriptionHindi ? item.descriptionHindi : item.description;
    const q = searchQuery.toLowerCase().trim();
    return !q || name.toLowerCase().includes(q) || desc.toLowerCase().includes(q) || item.category.toLowerCase().includes(q);
  });

  const menuItems = DESTINATIONS.map(p => ({
    image: p.imageUrl,
    link: p.link,
    title: lang === 'hindi' && p.titleHindi ? p.titleHindi : p.title,
    description: lang === 'hindi' && p.descriptionHindi ? p.descriptionHindi : p.description,
  }));

  const wheelItems = DESTINATIONS.map(p => lang === 'hindi' && p.titleHindi ? p.titleHindi : p.title);
  const activeWheelProject = DESTINATIONS[selectedWheelIdx] || DESTINATIONS[0];

  const handleNavigate = (link: string) => {
    onClose();
    if (link.startsWith('http')) {
      window.open(link, '_blank', 'noopener,noreferrer');
    } else {
      window.location.hash = link;
    }
  };

  return (
    <div 
      className="master-nav-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(8, 10, 15, 0.96)',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        animation: 'masterNavFadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {/* Top Bar */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.25rem 2.5rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(15, 20, 30, 0.6)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img 
            src="/v-logo-rounded/official-logo.svg" 
            alt="Logo" 
            style={{ width: '42px', height: '42px' }}
          />
          <div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '0.05em', color: '#fff' }}>
              VRINDOPNISHAD
            </div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.5)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Master Navigation Hub
            </div>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', background: 'rgba(255,255,255,0.06)', padding: '0.35rem 0.5rem', borderRadius: '999px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <button
            onClick={() => setViewMode('grid')}
            style={{
              padding: '0.4rem 1rem',
              borderRadius: '999px',
              border: 'none',
              background: viewMode === 'grid' ? '#38bdf8' : 'transparent',
              color: viewMode === 'grid' ? '#000' : '#fff',
              fontWeight: 700,
              fontSize: '0.8rem',
              cursor: 'pointer',
              transition: 'all 0.25s ease'
            }}
          >
            ☰ Grid
          </button>
          <button
            onClick={() => setViewMode('3d')}
            style={{
              padding: '0.4rem 1rem',
              borderRadius: '999px',
              border: 'none',
              background: viewMode === '3d' ? '#38bdf8' : 'transparent',
              color: viewMode === '3d' ? '#000' : '#fff',
              fontWeight: 700,
              fontSize: '0.8rem',
              cursor: 'pointer',
              transition: 'all 0.25s ease'
            }}
          >
            🌐 3D Sphere
          </button>
          <button
            onClick={() => setViewMode('wheel')}
            style={{
              padding: '0.4rem 1rem',
              borderRadius: '999px',
              border: 'none',
              background: viewMode === 'wheel' ? '#38bdf8' : 'transparent',
              color: viewMode === 'wheel' ? '#000' : '#fff',
              fontWeight: 700,
              fontSize: '0.8rem',
              cursor: 'pointer',
              transition: 'all 0.25s ease'
            }}
          >
            🎡 Wheel
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Navigation Menu"
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#fff',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.25s ease'
          }}
        >
          <X size={22} />
        </button>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* LED Header */}
        <div style={{ width: '100%', maxWidth: '900px', height: '60px', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
          <LEDTicker items={["Navigation Menu"]} separator="" speed={0} onColor="#38bdf8" offColor="transparent" />
        </div>

        {/* Search Bar */}
        <div 
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '560px',
            margin: '0 auto 2rem',
          }}
        >
          <Search size={18} style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255, 255, 255, 0.4)' }} />
          <input
            type="text"
            placeholder={lang === 'hindi' ? 'खोजें या नेविगेट करें...' : 'Search any destination or service...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '0.85rem 1.2rem 0.85rem 3.2rem',
              borderRadius: '999px',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#fff',
              fontSize: '0.95rem',
              outline: 'none',
              transition: 'all 0.3s ease'
            }}
          />
        </div>

        {/* Render View Mode */}
        {viewMode === 'grid' && (
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.25rem',
              width: '100%',
              maxWidth: '1200px',
              paddingBottom: '2rem'
            }}
          >
            {filteredDestinations.map(item => (
              <div
                key={item.id}
                onClick={() => handleNavigate(item.link)}
                className="master-nav-card"
                style={{
                  background: 'rgba(20, 26, 38, 0.7)',
                  border: '1px solid rgba(56, 189, 248, 0.18)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div 
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '12px',
                        background: 'rgba(56, 189, 248, 0.12)',
                        border: '1px solid rgba(56, 189, 248, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#38bdf8'
                      }}
                    >
                      {item.icon}
                    </div>
                    <span 
                      style={{
                        fontSize: '0.65rem',
                        fontWeight: 800,
                        letterSpacing: '0.08em',
                        padding: '0.25rem 0.6rem',
                        borderRadius: '20px',
                        background: 'rgba(255,255,255,0.08)',
                        color: '#38bdf8',
                        border: '1px solid rgba(56,189,248,0.2)'
                      }}
                    >
                      {item.tag}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#fff', marginBottom: '0.35rem' }}>
                    {lang === 'hindi' && item.titleHindi ? item.titleHindi : item.title}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.6)', lineHeight: 1.4 }}>
                    {lang === 'hindi' && item.descriptionHindi ? item.descriptionHindi : item.description}
                  </p>
                </div>

                <div 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '1.5rem',
                    paddingTop: '0.75rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.06)'
                  }}
                >
                  <span style={{ fontSize: '0.75rem', color: '#38bdf8', fontWeight: 600 }}>
                    {item.category}
                  </span>
                  <ExternalLink size={16} style={{ color: '#38bdf8' }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {viewMode === '3d' && (
          <div style={{ width: '100%', maxWidth: '1100px', height: '550px', position: 'relative' }}>
            <InfiniteMenu items={menuItems} />
          </div>
        )}

        {viewMode === 'wheel' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '900px', position: 'relative', minHeight: '500px' }}>
            <OptionWheel
              items={wheelItems}
              defaultSelected={0}
              onChange={(idx) => {
                const safeIdx = ((idx % DESTINATIONS.length) + DESTINATIONS.length) % DESTINATIONS.length;
                setSelectedWheelIdx(safeIdx);
              }}
            />
            {activeWheelProject && (
              <div 
                onClick={() => handleNavigate(activeWheelProject.link)}
                style={{
                  marginTop: '2rem',
                  padding: '1.5rem 2.5rem',
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                  borderRadius: '16px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  maxWidth: '500px'
                }}
              >
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff' }}>
                  {lang === 'hindi' && activeWheelProject.titleHindi ? activeWheelProject.titleHindi : activeWheelProject.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.7)', margin: '0.5rem 0 1rem' }}>
                  {lang === 'hindi' && activeWheelProject.descriptionHindi ? activeWheelProject.descriptionHindi : activeWheelProject.description}
                </p>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#38bdf8', fontWeight: 700 }}>
                  Explore Destination <ExternalLink size={16} />
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MasterNavigationModal;
