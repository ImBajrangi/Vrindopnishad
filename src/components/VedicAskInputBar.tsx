import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Mic,
  MicOff,
  ArrowUp,
  Sparkles,
  Command,
  CornerDownLeft,
  X,
  BookOpen,
  Compass,
  Sun,
  Image as ImageIcon,
  Utensils,
  Radio
} from 'lucide-react';
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
  categoryEn: string;
  categoryHi: string;
  icon: React.ReactNode;
  queryEn: string;
  queryHi: string;
  accent: string;
}

const QUICK_CHIPS: QuickChip[] = [
  {
    id: 'gita',
    labelEn: 'Gita Chapter 12',
    labelHi: 'भगवद्गीता १२वां अध्याय',
    categoryEn: 'Scripture',
    categoryHi: 'शास्त्र',
    icon: <BookOpen size={15} />,
    queryEn: 'Where can I read Bhagavad Gita Chapter 12 with Hindi meaning?',
    queryHi: 'श्रीमद्भगवद्गीता १२वां अध्याय अर्थ सहित दिखाएं',
    accent: '#f59e0b',
  },
  {
    id: 'parikrama',
    labelEn: 'Braj Yatra Guide',
    labelHi: 'ब्रज यात्रा गाइड',
    categoryEn: 'Pilgrimage',
    categoryHi: 'तीर्थ दर्शन',
    icon: <Compass size={15} />,
    queryEn: 'How do I plan my Vrindavan & Govardhan Parikrama tour?',
    queryHi: 'वृंदावन एवं गोवर्धन परिक्रमा की योजना कैसे बनाएं?',
    accent: '#38bdf8',
  },
  {
    id: 'stotra',
    labelEn: 'Morning Stotras',
    labelHi: 'प्रातः नित्य स्तोत्र',
    categoryEn: 'Daily Sadhana',
    categoryHi: 'नित्य नियम',
    icon: <Sun size={15} />,
    queryEn: 'What are the Nitya Niyam Stotras for daily morning path?',
    queryHi: 'प्रातःकाल पाठ के लिए नित्य नियम स्तोत्र कौन से हैं?',
    accent: '#fbbf24',
  },
  {
    id: 'art',
    labelEn: 'Chitra Vrinda Art',
    labelHi: 'चित्र वृंदा कला',
    categoryEn: 'Divine Gallery',
    categoryHi: 'कला दीर्घा',
    icon: <ImageIcon size={15} />,
    queryEn: 'Show me high-resolution digital art of Radha Krishna in Chitra Vrinda',
    queryHi: 'चित्र वृंदा में श्री राधा कृष्ण के डिजिटल चित्र दिखाएं',
    accent: '#c084fc',
  },
  {
    id: 'prasadam',
    labelEn: 'Foody Vrinda',
    labelHi: 'फूडी वृंदा आहार',
    categoryEn: 'Satvic Food',
    categoryHi: 'सात्विक भोजन',
    icon: <Utensils size={15} />,
    queryEn: 'What pure satvik prasadam options are available on Foody Vrinda?',
    queryHi: 'फूडी वृंदा पर कौन से शुद्ध सात्विक प्रसादम व्यंजन उपलब्ध हैं?',
    accent: '#34d399',
  },
];

const PROMPT_SUGGESTIONS_EN = [
  'How do I plan my Vrindavan & Govardhan tour?',
  'Read Bhagavad Gita Chapter 12 with Hindi meaning',
  'What are the Nitya Niyam Stotras for morning path?',
  'Show digital art of Radha Krishna in Chitra Vrinda',
  'What pure satvik meals are on Foody Vrinda?',
];

const PROMPT_SUGGESTIONS_HI = [
  'वृंदावन एवं गोवर्धन परिक्रमा की योजना कैसे बनाएं?',
  'श्रीमद्भगवद्गीता १२वां अध्याय अर्थ सहित दिखाएं',
  'प्रातःकाल पाठ के लिए नित्य नियम स्तोत्र',
  'चित्र वृंदा में श्री राधा कृष्ण के डिजिटल चित्र',
  'फूडी वृंदा पर शुद्ध सात्विक प्रसादम व्यंजन',
];

export const VedicAskInputBar: React.FC<VedicAskInputBarProps> = ({
  lang = 'english',
  onSearchSubmit,
}) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [isHiddenInFooter, setIsHiddenInFooter] = useState(false);
  const [isSoundPlaying, setIsSoundPlaying] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  // Check Web Speech API support
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      setSpeechSupported(true);
      const recog = new SpeechRecognition();
      recog.continuous = false;
      recog.interimResults = true;
      recog.lang = lang === 'hindi' ? 'hi-IN' : 'en-IN';

      recog.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        setQuery(transcript);
      };

      recog.onend = () => {
        setIsListening(false);
      };

      recog.onerror = (e: any) => {
        console.warn('Speech recognition error:', e);
        setIsListening(false);
      };

      recognitionRef.current = recog;
    }
  }, [lang]);

  const toggleVoiceListening = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (!recognitionRef.current) {
      const suggestions = lang === 'hindi' ? PROMPT_SUGGESTIONS_HI : PROMPT_SUGGESTIONS_EN;
      const randomPrompt = suggestions[Math.floor(Math.random() * suggestions.length)];
      setQuery(randomPrompt);
      inputRef.current?.focus();
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.lang = lang === 'hindi' ? 'hi-IN' : 'en-IN';
        recognitionRef.current.start();
        setIsListening(true);
        setIsFocused(true);
      } catch (err) {
        console.warn('Could not start speech recognition:', err);
        setIsListening(false);
      }
    }
  };

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

        // 220Hz ambient meditative harmonic
        osc.type = 'sine';
        osc.frequency.setValueAtTime(220, ctx.currentTime);

        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.05, ctx.currentTime + 1.8);

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

  // Footer Scroll Detection
  useEffect(() => {
    const checkFooterVisibility = () => {
      const footerEl = document.querySelector('footer') || document.getElementById('contact');
      if (!footerEl) return;

      const rect = footerEl.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

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

  // Keyboard shortcut: Cmd+K to focus input, Escape to collapse
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsFocused(true);
      } else if (e.key === 'Escape' && (isFocused || isMenuOpen)) {
        setIsFocused(false);
        setIsMenuOpen(false);
        inputRef.current?.blur();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFocused, isMenuOpen]);

  // Click outside to collapse
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsFocused(false);
        setIsMenuOpen(false);
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

    setIsFocused(false);
    setIsMenuOpen(false);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.85 },
      colors: ['#f59e0b', '#38bdf8', '#10b981', '#ec4899'],
    });

    if (onSearchSubmit) {
      onSearchSubmit(finalQuery);
    }
  };

  const handleChipClick = (chip: QuickChip) => {
    const selectedText = lang === 'hindi' ? chip.queryHi : chip.queryEn;
    setQuery(selectedText);
    setIsMenuOpen(false);
    inputRef.current?.focus();
  };

  const showGooeyMenu = isMenuOpen || (isFocused && query === '');

  return (
    <div
      ref={wrapperRef}
      className={`vedic-ask-floating-container ${isHiddenInFooter ? 'is-hidden-footer' : ''}`}
    >
      {/* LIQUID GOOEY FLOATING SATELLITE TRAY (Rises Fluidly Above the Bar) */}
      <AnimatePresence>
        {showGooeyMenu && (
          <motion.div
            key="gooey-satellite-tray"
            className="gooey-satellite-tray"
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: { type: 'spring', stiffness: 420, damping: 28, mass: 0.8 }
            }}
            exit={{
              opacity: 0,
              y: 12,
              scale: 0.96,
              transition: { duration: 0.18, ease: 'easeOut' }
            }}
          >
            {/* Subtle Aurora Ambient Mist */}
            <div className="gooey-tray-aurora" />

            {/* Tray Header */}
            <div className="gooey-tray-header">
              <div className="gooey-tray-badge">
                <Sparkles size={14} className="text-amber-400" />
                <span>{lang === 'hindi' ? 'पवित्र विषय एवं साधन' : 'Sacred Topics & Tools'}</span>
              </div>

              <div className="gooey-tray-right-meta">
                <span className="gooey-kbd-hint">
                  <CornerDownLeft size={11} /> {lang === 'hindi' ? 'एंटर दबाएं' : 'Enter to ask'}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setIsMenuOpen(false);
                    setIsFocused(false);
                    inputRef.current?.blur();
                  }}
                  className="gooey-tray-close"
                  aria-label="Dismiss Quick Menu"
                >
                  <X size={13} />
                </button>
              </div>
            </div>

            {/* Liquid Floating Bubbles Row (Horizontal Touch Scrollable) */}
            <div className="gooey-bubbles-row">
              {QUICK_CHIPS.map((chip, idx) => (
                <motion.button
                  key={chip.id}
                  type="button"
                  onClick={() => handleChipClick(chip)}
                  className="gooey-liquid-bubble"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      type: 'spring',
                      stiffness: 400,
                      damping: 26,
                      delay: idx * 0.04
                    }
                  }}
                  style={{
                    '--chip-accent': chip.accent,
                  } as React.CSSProperties}
                >
                  <div
                    className="bubble-icon-pill"
                    style={{
                      background: `${chip.accent}14`,
                      borderColor: `${chip.accent}35`,
                      color: chip.accent
                    }}
                  >
                    {chip.icon}
                  </div>

                  <div className="bubble-text-group">
                    <span className="bubble-title">
                      {lang === 'hindi' ? chip.labelHi : chip.labelEn}
                    </span>
                    <span className="bubble-category">
                      {lang === 'hindi' ? chip.categoryHi : chip.categoryEn}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Liquid Connector Droplet (Molten Bridge Illusion) */}
            <div className="gooey-connector-droplet" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* SLEEK PURE OBSIDIAN CAPSULE BAR */}
      <form onSubmit={handleSubmit} className={`gemini-ask-bar ${isListening ? 'is-listening' : ''}`}>
        <div className="gemini-bar-inner">
          {/* Left: Plus Action Menu Toggle with Smooth Rotation */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
              if (!isMenuOpen) {
                setIsFocused(true);
              }
            }}
            className={`gemini-action-plus-btn ${isMenuOpen ? 'is-open' : ''}`}
            title={lang === 'hindi' ? 'त्वरित विकल्प' : 'Quick Sacred Topics'}
            aria-label="Toggle Quick Actions Menu"
          >
            <Plus size={18} className="gemini-plus-icon" />
          </button>

          {/* Center: Dynamic Input & Non-clipping Animated Prompt Overlay */}
          <div className="gemini-input-wrapper">
            {query === '' && !isFocused && !isListening && (
              <div
                onClick={() => {
                  inputRef.current?.focus();
                  setIsFocused(true);
                }}
                className="gemini-typing-placeholder"
              >
                {lang === 'hindi' ? (
                  <span className="truncate-text">वैदिक ग्रन्थ, स्तोत्र पाठ एवं ब्रज यात्रा पूछें...</span>
                ) : (
                  <TypingAnimation
                    words={PROMPT_SUGGESTIONS_EN}
                    typeSpeed={36}
                    deleteSpeed={20}
                    pauseDelay={2400}
                    loop={true}
                    showCursor={true}
                    cursorStyle="line"
                    className="truncate-text"
                  />
                )}
              </div>
            )}

            {isListening && query === '' && (
              <div className="gemini-listening-label">
                <Radio size={14} className="animate-pulse text-red-400" />
                <span>{lang === 'hindi' ? 'सुन रहे हैं... बोलिए...' : 'Listening... speak now...'}</span>
              </div>
            )}

            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              placeholder={
                query === '' && !isFocused
                  ? ''
                  : isListening
                  ? ''
                  : lang === 'hindi'
                  ? 'पूछें या खोजें...'
                  : 'Ask Vedic AI or explore scriptures...'
              }
              className="gemini-text-input"
            />
          </div>

          {/* Right Action Suite */}
          <div className="gemini-actions-cluster">

            {query !== '' && (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  inputRef.current?.focus();
                }}
                className="gemini-clear-btn"
                aria-label="Clear input"
              >
                <X size={13} />
              </button>
            )}

            {/* Voice Dictation Button */}
            <button
              type="button"
              onClick={toggleVoiceListening}
              className={`gemini-mic-btn ${isListening ? 'is-active' : ''}`}
              title={
                isListening
                  ? 'Stop Voice Input'
                  : speechSupported
                  ? 'Voice Search (Dictate Question)'
                  : 'Random Sacred Prompt'
              }
              aria-label="Toggle Voice Dictation"
            >
              {isListening ? (
                <MicOff size={17} className="text-red-400" />
              ) : (
                <Mic size={17} />
              )}
            </button>

            {/* Gemini Live / ChatGPT Equalizer Wave Button */}
            <button
              type="button"
              onClick={toggleAmbientSound}
              className={`gemini-live-wave-btn ${isSoundPlaying ? 'is-playing' : ''}`}
              title={
                isSoundPlaying
                  ? 'Pause Ambient Sanctuary Sound'
                  : 'Play Meditative Sanctuary Sound'
              }
              aria-label="Toggle Meditative Sound"
            >
              <div className="gemini-wave-bars">
                <span className="wave-bar bar-1" />
                <span className="wave-bar bar-2" />
                <span className="wave-bar bar-3" />
                <span className="wave-bar bar-4" />
              </div>
            </button>

            {/* Dynamic Send Button */}
            <button
              type="submit"
              className={`gemini-send-btn ${query.trim() ? 'is-ready' : ''}`}
              aria-label="Submit Question"
              title={lang === 'hindi' ? 'उत्तर प्राप्त करें' : 'Ask Vrindopnishad AI'}
            >
              <ArrowUp size={16} strokeWidth={2.6} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default VedicAskInputBar;
