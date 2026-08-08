import React, { useState, useEffect, useRef } from 'react';
import { ArrowUp, Sparkles, Search, Command, CornerDownLeft, X, BookOpen, Compass, Sun, Image as ImageIcon, Utensils, Volume2, VolumeX } from 'lucide-react';
import confetti from 'canvas-confetti';
import { TypingAnimation } from './ui/typing-animation';
import './VedicAskInputBar.css';

interface VedicAskInputBarProps {
  lang?: 'english' | 'hindi';
  onSearchSubmit?: (query: string) => void;
}

interface QuickChip {
  id: string;
  labelEn: string;
  labelHi: string;
  icon: React.ReactNode;
  queryEn: string;
  queryHi: string;
}

const QUICK_CHIPS: QuickChip[] = [
  {
    id: 'gita',
    labelEn: 'Bhagavad Gita Ch 12',
    labelHi: 'भगवद्गीता १२वां अध्याय',
    icon: <BookOpen size={14} className="text-amber-400" />,
    queryEn: 'Where can I read Bhagavad Gita Chapter 12 with meaning?',
    queryHi: 'श्रीमद्भगवद्गीता १२वां अध्याय अर्थ सहित दिखाएं',
  },
  {
    id: 'parikrama',
    labelEn: 'Braj Yatra Guide',
    labelHi: 'ब्रज यात्रा मार्गदर्शिका',
    icon: <Compass size={14} className="text-sky-400" />,
    queryEn: 'How do I plan my Vrindavan & Govardhan Parikrama tour?',
    queryHi: 'वृंदावन एवं गोवर्धन परिक्रमा की योजना कैसे बनाएं?',
  },
  {
    id: 'stotra',
    labelEn: 'Morning Stotras',
    labelHi: 'प्रातः नित्य स्तोत्र',
    icon: <Sun size={14} className="text-amber-400" />,
    queryEn: 'What are the Nitya Niyam Stotras for daily morning path?',
    queryHi: 'प्रातःकाल पाठ के लिए नित्य नियम स्तोत्र कौन से हैं?',
  },
  {
    id: 'art',
    labelEn: 'Chitra Vrinda Art',
    labelHi: 'चित्र वृंदा कला',
    icon: <ImageIcon size={14} className="text-purple-400" />,
    queryEn: 'Show me high-resolution digital art of Radha Krishna in Chitra Vrinda',
    queryHi: 'चित्र वृंदा में श्री राधा कृष्ण के उच्च गुणवत्ता वाले चित्र दिखाएं',
  },
  {
    id: 'prasadam',
    labelEn: 'Foody Vrinda',
    labelHi: 'फूडी वृंदा प्रसादम',
    icon: <Utensils size={14} className="text-emerald-400" />,
    queryEn: 'What pure satvik prasadam options are available on Foody Vrinda?',
    queryHi: 'फूडी वृंदा पर कौन से शुद्ध सात्विक प्रसादम व्यंजन उपलब्ध हैं?',
  },
];

const PROMPT_SUGGESTIONS_EN = [
  'How do I plan my Vrindavan & Govardhan Parikrama tour?',
  'Where can I read Bhagavad Gita Chapter 12 with Hindi meaning?',
  'What are the Nitya Niyam Stotras for daily morning path?',
  'Show me high-resolution digital art of Radha Krishna in Chitra Vrinda',
  'What pure satvik prasadam options are available on Foody Vrinda?',
];

const PROMPT_SUGGESTIONS_HI = [
  'वैदिक ग्रन्थ, स्तोत्र पाठ एवं ब्रज यात्रा के विषय में पूछें...',
  'वृंदावन एवं गोवर्धन परिक्रमा की योजना कैसे बनाएं?',
  'श्रीमद्भगवद्गीता १२वां अध्याय अर्थ सहित दिखाएं',
  'प्रातःकाल पाठ के लिए नित्य नियम स्तोत्र',
  'चित्र वृंदा में श्री राधा कृष्ण के डिजिटल चित्र',
];

export const VedicAskInputBar: React.FC<VedicAskInputBarProps> = ({
  lang = 'english',
  onSearchSubmit,
}) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isHiddenInFooter, setIsHiddenInFooter] = useState(false);
  const [submittedQuery, setSubmittedQuery] = useState<string | null>(null);
  const [isSoundPlaying, setIsSoundPlaying] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  // Synthesizer Ambient Sound Toggle
  const toggleAmbientSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!isSoundPlaying) {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(220, ctx.currentTime);

        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 1.8);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        oscRef.current = osc;
        gainRef.current = gain;

        setIsSoundPlaying(true);
      } catch (err) {
        console.warn('AudioContext error:', err);
      }
    } else {
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
      setIsSoundPlaying(false);
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

  // Footer Scroll Detection: Hide when scrolling into Footer (#contact or <footer>)
  useEffect(() => {
    const checkFooterVisibility = () => {
      const footerEl = document.querySelector('footer') || document.getElementById('contact');
      if (!footerEl) return;

      const rect = footerEl.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      // Hide if footer top reaches 120px above the bottom of viewport
      const footerIsInView = rect.top < windowHeight - 80;
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

  // Keyboard shortcut: Cmd+K / Ctrl+K to focus input, Escape to collapse
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsFocused(true);
      } else if (e.key === 'Escape' && isFocused) {
        setIsFocused(false);
        inputRef.current?.blur();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFocused]);

  // Click outside to collapse expanded state
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const suggestions = lang === 'hindi' ? PROMPT_SUGGESTIONS_HI : PROMPT_SUGGESTIONS_EN;
    const finalQuery = query.trim() || suggestions[0];
    if (!finalQuery) return;

    setSubmittedQuery(finalQuery);
    setIsFocused(false);

    // Fire celebratory confetti on search submit
    confetti({
      particleCount: 65,
      spread: 65,
      origin: { y: 0.85 },
      colors: ['#f59e0b', '#3b82f6', '#10b981', '#ec4899', '#8b5cf6'],
    });

    if (onSearchSubmit) {
      onSearchSubmit(finalQuery);
    }
  };

  const handleChipClick = (chip: QuickChip) => {
    const selectedText = lang === 'hindi' ? chip.queryHi : chip.queryEn;
    setQuery(selectedText);
    inputRef.current?.focus();
  };

  return (
    <div
      ref={wrapperRef}
      className={`vedic-ask-floating-container ${isHiddenInFooter ? 'is-hidden-footer' : ''}`}
    >
      <form
        onSubmit={handleSubmit}
        className={`vedic-ask-glass-pill ${isFocused ? 'focused' : ''}`}
      >
        {/* Animated Top Micro-glow Highlight Line */}
        <div className="vedic-ask-glow-line" />

        {/* Input Main Control Row */}
        <div className="vedic-ask-main-row">
          <div className="vedic-ask-input-group">
            <Search size={19} className={`vedic-ask-icon ${isFocused ? 'active' : ''}`} />

            {/* Dynamic Typing Overlay when input is empty and unfocused */}
            {query === '' && !isFocused && (
              <div
                onClick={() => {
                  inputRef.current?.focus();
                  setIsFocused(true);
                }}
                className="vedic-ask-typing-overlay"
              >
                {lang === 'hindi' ? (
                  <span>वैदिक ग्रन्थ, स्तोत्र पाठ एवं ब्रज यात्रा के विषय में पूछें...</span>
                ) : (
                  <TypingAnimation
                    words={PROMPT_SUGGESTIONS_EN}
                    typeSpeed={38}
                    deleteSpeed={22}
                    pauseDelay={2200}
                    loop={true}
                    showCursor={true}
                    cursorStyle="line"
                  />
                )}
              </div>
            )}

            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              placeholder={query === '' && !isFocused ? '' : (lang === 'hindi' ? 'पूछें या खोजें...' : 'Ask or search Vrindopnishad AI...')}
              className="vedic-ask-input"
            />
          </div>

          {/* Right Action Button & Shortcut Badges */}
          <div className="vedic-ask-actions-right">
            {!isFocused && query === '' && (
              <span className="vedic-ask-shortcut-badge" title="Press Cmd+K or Ctrl+K to search">
                <Command size={11} /> K
              </span>
            )}

            {/* Integrated Ambient Audio Synthesizer Button */}
            <button
              type="button"
              onClick={toggleAmbientSound}
              className={`vedic-ask-sound-btn ${isSoundPlaying ? 'active' : ''}`}
              title={isSoundPlaying ? 'Mute Sanctuary Ambient Sound' : 'Play Sanctuary Ambient Sound'}
              aria-label="Toggle Ambient Sanctuary Audio"
            >
              {isSoundPlaying ? (
                <svg width="20" height="14" viewBox="0 0 32 24" fill="none" className="ambient-svg-wave">
                  <path d="M 2 12 Q 8 4, 16 12 T 30 12" stroke="#c3f53c" strokeWidth="2.2" strokeLinecap="round" fill="none" />
                  <path d="M 2 12 Q 8 18, 16 12 T 30 12" stroke="#d97706" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                </svg>
              ) : (
                <Volume2 size={14} />
              )}
            </button>

            {query !== '' && (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  inputRef.current?.focus();
                }}
                className="vedic-ask-clear-btn"
                aria-label="Clear input"
              >
                <X size={14} />
              </button>
            )}

            <button
              type="submit"
              className={`vedic-ask-submit-btn ${query.trim() ? 'has-query' : ''}`}
              aria-label="Submit Question"
              title={lang === 'hindi' ? 'उत्तर प्राप्त करें' : 'Ask Vrindopnishad AI'}
            >
              <ArrowUp size={18} strokeWidth={2.6} />
            </button>
          </div>
        </div>

        {/* Focused Expanded Quick Action Chips Panel */}
        {isFocused && (
          <div className="vedic-ask-expanded-panel">
            <div className="vedic-ask-panel-header">
              <span className="vedic-ask-panel-title">
                <Sparkles size={13} className="text-amber-400" />
                {lang === 'hindi' ? 'त्वरित प्रश्न एवं श्रेणियां' : 'Quick Insights & Suggested Topics'}
              </span>
              <span className="vedic-ask-panel-hint">
                <CornerDownLeft size={11} /> {lang === 'hindi' ? 'एंटर दबाएं' : 'Press Enter to ask'}
              </span>
            </div>

            <div className="vedic-ask-chips-grid">
              {QUICK_CHIPS.map((chip) => (
                <button
                  key={chip.id}
                  type="button"
                  onClick={() => handleChipClick(chip)}
                  className="vedic-ask-chip"
                >
                  <span className="chip-icon">{chip.icon}</span>
                  <span className="chip-label">
                    {lang === 'hindi' ? chip.labelHi : chip.labelEn}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </form>

      {/* Submitted Toast Banner Notification */}
      {submittedQuery && (
        <div className="vedic-ask-response-toast">
          <div className="toast-header">
            <span className="toast-title">
              <Sparkles size={14} /> Vrindopnishad Sanctuary AI
            </span>
            <button
              onClick={() => setSubmittedQuery(null)}
              className="toast-close"
              aria-label="Close message"
            >
              <X size={14} />
            </button>
          </div>
          <p className="toast-query">"{submittedQuery}"</p>
          <p className="toast-subtitle">
            Opening scripture response... Redirecting to Bhagavad Gita & Stotra Archives.
          </p>
        </div>
      )}
    </div>
  );
};

export default VedicAskInputBar;

