import React from 'react';

interface FooterProps {
  lang: 'english' | 'hindi';
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer id="contact">
      <div className="footer-content">
        <div>
          <div className="footer-brand" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <img 
              src="/v-logo-rounded/official-logo.svg" 
              alt="Vrindopnishad Logo" 
              className="logo-light-theme" 
              style={{ width: '42px', height: '42px', filter: 'drop-shadow(0 0 6px rgba(231,195,84,0.4))' }} 
            />
            <img 
              src="/v-logo-rounded/official-logo-dark.svg" 
              alt="Vrindopnishad Logo" 
              className="logo-dark-theme" 
              style={{ width: '42px', height: '42px', filter: 'drop-shadow(0 0 6px rgba(231,195,84,0.4))' }} 
            />
            <div className="footer-logo text-gradient" style={{ margin: 0, fontSize: '1.8rem', fontWeight: 800 }}>Vrindopnishad</div>
          </div>
          <p className="fade-up-off">
            A digital sanctuary where art, technology, and spirituality converge in harmonic resonance.
          </p>
          <p className="fade-up-off" style={{ marginTop: '1rem', fontSize: '0.9rem', opacity: 0.8 }}>
            A digital sanctuary where ancient wisdom meets modern creativity, offering a unique space for spiritual and creative exploration.
          </p>
        </div>

        <div className="footer-links">
          <h3>Navigate</h3>
          <ul className="staggered-list">
            <li className="staggered-item"><a href="#home" className="text-hover">Home</a></li>
            <li className="staggered-item"><a href="https://pic.vrindopnishad.in/" className="text-hover" target="_blank" rel="noopener noreferrer">Gallery</a></li>
            <li className="staggered-item"><a href="#projects" className="text-hover">Collection</a></li>
            <li className="staggered-item"><a href="https://to.vrindopnishad.in/" className="text-hover" target="_blank" rel="noopener noreferrer">Vrinda Tours</a></li>
            <li className="staggered-item"><a href="#about" className="text-hover">About</a></li>
          </ul>
        </div>

        <div className="footer-links">
          <h3>Our Projects</h3>
          <ul className="staggered-list">
            <li className="staggered-item">
              <a href="https://path.vrindopnishad.in/" className="text-hover" target="_blank" rel="noopener noreferrer">Bhajan Path</a>
            </li>
            <li className="staggered-item">
              <a href="#services" className="text-hover">Foody Vrinda</a>
            </li>
            <li className="staggered-item">
              <a href="https://pic.vrindopnishad.in/" className="text-hover" target="_blank" rel="noopener noreferrer">Chitra Vrinda</a>
            </li>
            <li className="staggered-item">
              <a href="https://to.vrindopnishad.in/" className="footer-link" target="_blank" rel="noopener noreferrer">Vrinda Tours</a>
            </li>
            <li className="staggered-item">
              <a href="https://vrindopnishad.in/" className="text-hover" target="_blank" rel="noopener noreferrer">Web Development</a>
            </li>
          </ul>
          <h3 style={{ marginTop: '1.5rem' }}>E-commerce</h3>
          <ul className="staggered-list">
            <li className="staggered-item">
              <a href="https://edu.vrindopnishad.in/" className="text-hover" target="_blank" rel="noopener noreferrer">skillTadka</a>
            </li>
          </ul>
        </div>

        <div className="footer-links">
          <h3>Connect</h3>
          <ul className="staggered-list">
            <li className="staggered-item">
              <a href="https://www.instagram.com/vrindopnishad" className="text-hover" target="_blank" rel="noopener noreferrer">Instagram</a>
            </li>
            <li className="staggered-item">
              <a href="https://www.facebook.com/vrindopnishad" className="text-hover" target="_blank" rel="noopener noreferrer">Facebook</a>
            </li>
            <li className="staggered-item">
              <a href="https://www.youtube.com/@vrindopnishad" className="text-hover" target="_blank" rel="noopener noreferrer">YouTube</a>
            </li>
            <li className="staggered-item">
              <a href="https://chat.whatsapp.com/LUMjP73wwyY9C1DNYeyoGu" className="text-hover" target="_blank" rel="noopener noreferrer">Barsana Daily Darshan</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p>&copy; {new Date().getFullYear()} Vrindopnishad. All rights reserved.</p>
      </div>
    </footer>
  );
};
