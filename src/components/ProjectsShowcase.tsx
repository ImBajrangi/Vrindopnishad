import React, { useState } from 'react';
import { ProjectItem } from '../types';
import LEDTicker from './originkit/ui/pixel-led-display';
import InfiniteMenu from './InfiniteMenu';
import OptionWheel from './OptionWheel';
import GradualBlur from './GradualBlur';

interface ProjectsShowcaseProps {
  projects: ProjectItem[];
  lang: 'english' | 'hindi';
}

export const ProjectsShowcase: React.FC<ProjectsShowcaseProps> = ({ projects, lang }) => {
  const [viewMode, setViewMode] = useState<'3d' | 'wheel' | 'grid'>('3d');
  const [selectedWheelIdx, setSelectedWheelIdx] = useState<number>(0);

  // Preload and cache project hero images for zero-latency instant transitions on any device
  React.useEffect(() => {
    projects.forEach(p => {
      if (p.imageUrl) {
        const img = new Image();
        img.src = p.imageUrl;
      }
    });
  }, [projects]);

  const menuItems = projects.map(p => ({
    image: p.imageUrl,
    link: p.link,
    title: lang === 'hindi' && p.titleHindi ? p.titleHindi : p.title,
    description: lang === 'hindi' && p.descriptionHindi ? p.descriptionHindi : p.description,
  }));

  const wheelItems = projects.map(p => lang === 'hindi' && p.titleHindi ? p.titleHindi : p.title);
  const activeWheelProject = projects[selectedWheelIdx] || projects[0];

  return (
    <section id="projects" className="showcase-section">
      <div className="showcase-container">
        <div className="showcase-header text-center">
          <span className="showcase-label">
            {lang === 'english' ? 'EXPLORE & NAVIGATE' : 'अन्वेषण एवं मार्गदर्शन'}
          </span>
          <div className="showcase-title-pixel" style={{ width: '100%', height: '80px', margin: '0.5rem 0 1rem 0' }}>
            <LEDTicker items={["Navigation Hub"]} separator="" speed={0} onColor="#FFFFFF" offColor="transparent" />
          </div>
          <p className="showcase-subtitle">
            {lang === 'english' ? 'Navigate to any service or destination in the Vrindopnishad universe' : 'वृंदोपनिषद मंडल के प्रत्येक आयाम तक सरलता से पहुंचे'}
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setViewMode('3d')}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: '999px',
                border: '1px solid rgba(255,255,255,0.2)',
                background: viewMode === '3d' ? 'rgba(255,255,255,0.2)' : 'transparent',
                color: '#fff',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              🌐 3D Sphere
            </button>
            <button
              onClick={() => setViewMode('wheel')}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: '999px',
                border: '1px solid rgba(255,255,255,0.2)',
                background: viewMode === 'wheel' ? 'rgba(255,255,255,0.2)' : 'transparent',
                color: '#fff',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              🎡 Curved Wheel
            </button>
            <button
              onClick={() => setViewMode('grid')}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: '999px',
                border: '1px solid rgba(255,255,255,0.2)',
                background: viewMode === 'grid' ? 'rgba(255,255,255,0.2)' : 'transparent',
                color: '#fff',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              ☰ Grid View
            </button>
          </div>
        </div>

        {viewMode === '3d' && (
          <div style={{ height: '600px', position: 'relative', background: '#000', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.1)', boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)' }}>
            <InfiniteMenu items={menuItems} scale={1} />
          </div>
        )}

        {viewMode === 'wheel' && (
          <div style={{ height: '500px', width: '100%', position: 'relative', marginTop: '2rem', borderRadius: '24px', overflow: 'hidden', background: '#000', border: '1px solid rgba(255,255,255,0.1)' }}>
            {/* Smooth background image crossfade according to selected item */}
            {projects.map((proj, i) => (
              <div
                key={proj.id}
                style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: selectedWheelIdx === i ? 0.35 : 0,
                  transition: 'opacity 0.7s ease-in-out, transform 0.9s ease-out',
                  transform: selectedWheelIdx === i ? 'scale(1.04)' : 'scale(1.0)',
                  backgroundImage: `url("${proj.imageUrl}")`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: 'blur(4px) brightness(0.8)',
                  pointerEvents: 'none',
                }}
              />
            ))}
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 50%, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.85) 100%)', pointerEvents: 'none' }} />

            <OptionWheel
              items={wheelItems}
              defaultSelected={0}
              textColor="#a6a6a6"
              activeColor="#ffffff"
              side="left"
              fontSize={3}
              spacing={1.4}
              curve={1}
              tilt={6}
              blur={2}
              fade={0.25}
              minOpacity={0.05}
              smoothing={300}
              inset={80}
              loop
              draggable
              soundUrl="/assets/sounds/click-soft.mp3"
              soundVolume={0.5}
              onChange={(idx) => {
                const safeIdx = ((idx % projects.length) + projects.length) % projects.length;
                setSelectedWheelIdx(safeIdx);
              }}
            />

            {/* Active project card overlay */}
            {activeWheelProject && (
              <div
                style={{
                  position: 'absolute',
                  right: '5%',
                  top: '50%',
                  maxWidth: '340px',
                  padding: '1.5rem 1.75rem',
                  background: 'rgba(0,0,0,0.65)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  borderRadius: '20px',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: '#fff',
                  zIndex: 5,
                  transition: 'all 0.4s ease',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                }}
              >
                <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>
                  {activeWheelProject.category}
                </span>
                <h3 style={{ fontSize: '1.5rem', margin: '0.35rem 0 0.5rem 0', fontWeight: 700, letterSpacing: '-0.02em', color: '#fff' }}>
                  {lang === 'hindi' && activeWheelProject.titleHindi ? activeWheelProject.titleHindi : activeWheelProject.title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.8)', margin: '0 0 1.25rem 0', lineHeight: '1.5' }}>
                  {lang === 'hindi' && activeWheelProject.descriptionHindi ? activeWheelProject.descriptionHindi : activeWheelProject.description}
                </p>
                <a
                  href={activeWheelProject.link}
                  target={activeWheelProject.isExternal ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: '#fff',
                    textDecoration: 'none',
                    padding: '0.55rem 1.1rem',
                    background: 'rgba(255,255,255,0.15)',
                    borderRadius: '10px',
                    border: '1px solid rgba(255,255,255,0.25)',
                    transition: 'all 0.25s ease',
                  }}
                >
                  <span>{lang === 'english' ? 'Explore Project' : 'परियोजना देखें'}</span>
                  <span>→</span>
                </a>
              </div>
            )}

            <GradualBlur
              target="parent"
              position="bottom"
              height="6rem"
              strength={2}
              divCount={5}
              curve="bezier"
              exponential
              opacity={1}
            />
          </div>
        )}

        {viewMode === 'grid' && (
          <div className="showcase-grid staggered-list" style={{ marginTop: '2rem' }}>
            {projects.map((project, index) => {
              const isFeatured = project.isFlagship || index === 0;
              const numStr = (index + 1).toString().padStart(2, '0');
              const displayTitle = lang === 'hindi' && project.titleHindi ? project.titleHindi : project.title;
              const displayDesc = lang === 'hindi' && project.descriptionHindi ? project.descriptionHindi : project.description;

              return (
                <a
                  key={project.id}
                  href={project.link}
                  target={project.isExternal ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className={`showcase-card ${isFeatured ? 'showcase-featured showcase-flagship' : 'showcase-secondary'} staggered-item project-item`}
                  data-image={project.imageUrl}
                >
                  <div className="showcase-image">
                    <img src={project.imageUrl} alt={displayTitle} loading="lazy" />
                    <div className="showcase-overlay"></div>
                  </div>

                  <div className="showcase-content">
                    <span className="showcase-num">{numStr}</span>
                    <div className="showcase-info">
                      <span className="showcase-tag">{project.category}</span>
                      <h3 className="project-title">{displayTitle}</h3>
                      <p className="showcase-description">{displayDesc}</p>
                    </div>
                    <div className="showcase-cta">
                      <span>Explore</span>
                      <span className="cta-icon">→</span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
