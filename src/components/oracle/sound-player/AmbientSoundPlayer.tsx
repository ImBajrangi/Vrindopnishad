import React, { useState, useEffect, useRef } from 'react';
import './AmbientSoundPlayer.css';

interface AmbientSoundPlayerProps {
  lang?: 'english' | 'hindi';
}

export const AmbientSoundPlayer: React.FC<AmbientSoundPlayerProps> = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHiddenInFooter, setIsHiddenInFooter] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  // Footer Scroll Detection: Hide or adjust when reaching footer
  useEffect(() => {
    const checkFooterVisibility = () => {
      const footerEl = document.querySelector('footer') || document.getElementById('contact');
      if (!footerEl) return;

      const rect = footerEl.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      const footerIsInView = rect.top < windowHeight - 60;
      setIsHiddenInFooter(footerIsInView);
    };

    window.addEventListener('scroll', checkFooterVisibility, { passive: true });
    window.addEventListener('resize', checkFooterVisibility, { passive: true });
    checkFooterVisibility();

    return () => {
      window.removeEventListener('scroll', checkFooterVisibility);
      window.removeEventListener('resize', checkFooterVisibility);
    };
  }, []);

  const toggleSound = () => {
    if (!isPlaying) {
      // Initialize Web Audio API synth with warm ambient drone harmonics
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // Warm ambient harmonic frequency (220Hz - A3 scale)
        osc.type = 'sine';
        osc.frequency.setValueAtTime(220, ctx.currentTime);

        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 1.8);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        oscRef.current = osc;
        gainRef.current = gain;

        setIsPlaying(true);
      } catch (err) {
        console.warn('AudioContext error:', err);
      }
    } else {
      // Soft gentle fade-out
      if (gainRef.current && audioCtxRef.current) {
        gainRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.8);
        setTimeout(() => {
          oscRef.current?.stop();
          oscRef.current?.disconnect();
          audioCtxRef.current?.close();
          audioCtxRef.current = null;
          oscRef.current = null;
          gainRef.current = null;
        }, 800);
      }
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      if (oscRef.current) {
        oscRef.current.stop();
        audioCtxRef.current?.close();
      }
    };
  }, []);

  return (
    <div className={`ambient-sound-container ${isHiddenInFooter ? 'is-hidden-footer' : ''}`}>
      <button
        onClick={toggleSound}
        className={`ambient-toggle-btn ${isPlaying ? 'active' : ''}`}
        title={isPlaying ? 'Mute Ambient Sanctuary Sound' : 'Play Ambient Sanctuary Soundscape'}
        aria-label="Toggle Ambient Audio"
      >
        {isPlaying ? (
          /* SVG Morphing Frequency Wave Animation when Active */
          <svg width="28" height="20" viewBox="0 0 32 24" fill="none" className="ambient-svg-wave">
            <path
              className="wave-morph-path primary"
              d="M 2 12 Q 8 4, 16 12 T 30 12"
              stroke="var(--ambient-wave-primary, #c3f53c)"
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
            />
            <path
              className="wave-morph-path secondary"
              d="M 2 12 Q 8 18, 16 12 T 30 12"
              stroke="var(--ambient-wave-secondary, #d97706)"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        ) : (
          /* Single Static Minimal Line when Silent */
          <svg width="24" height="20" viewBox="0 0 32 24" fill="none" className="ambient-svg-silent">
            <line
              x1="4"
              y1="12"
              x2="28"
              y2="12"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        )}
      </button>
    </div>
  );
};

export default AmbientSoundPlayer;
