import React, { useState } from 'react';
import { Sparkles, Download, Copy, Check, X, Image as ImageIcon } from 'lucide-react';
import './QuoteBuilderModal.css';

interface QuoteVerseData {
  shloka: string;
  translation: string;
  source: string;
}

interface QuoteBuilderModalProps {
  isOpen: boolean;
  verse: QuoteVerseData | null;
  onClose: () => void;
  lang?: 'english' | 'hindi';
}

const THEMES = [
  { id: 'gold', name: 'Divine Gold', bg: 'linear-gradient(135deg, #181308 0%, #2e1d05 100%)', border: '#f59e0b' },
  { id: 'cyan', name: 'Celestial Cyan', bg: 'linear-gradient(135deg, #061524 0%, #0a2540 100%)', border: '#38bdf8' },
  { id: 'purple', name: 'Radha Kripa Purple', bg: 'linear-gradient(135deg, #180824 0%, #2c0a40 100%)', border: '#c084fc' },
  { id: 'dark', name: 'Deep Midnight', bg: 'linear-gradient(135deg, #09090b 0%, #18181b 100%)', border: '#52525b' },
];

export const QuoteBuilderModal: React.FC<QuoteBuilderModalProps> = ({
  isOpen,
  verse,
  onClose,
  lang = 'english',
}) => {
  const [activeTheme, setActiveTheme] = useState(THEMES[0]);
  const [copied, setCopied] = useState(false);

  if (!isOpen || !verse) return null;

  const handleCopyText = () => {
    const text = `"${verse.shloka}"\n\n${verse.translation}\n— ${verse.source}\n\nVia Vrindopnishad Sanctuary (https://vrindopnishad.in)`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="quote-modal-backdrop" onClick={onClose}>
      <div className="quote-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="quote-modal-header">
          <div className="quote-modal-title">
            <ImageIcon size={16} className="text-amber-400" />
            <span>{lang === 'hindi' ? 'वैदिक श्लोक कार्ड निर्माता' : 'Sacred Quote Card Generator'}</span>
          </div>
          <button className="quote-close-btn" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {/* Live Preview Canvas Box */}
        <div
          className="quote-preview-canvas"
          style={{
            background: activeTheme.bg,
            borderColor: activeTheme.border,
          }}
        >
          <div className="quote-canvas-brand">
            <Sparkles size={14} style={{ color: activeTheme.border }} />
            <span>Vrindopnishad</span>
          </div>

          <div className="quote-canvas-shloka">"{verse.shloka}"</div>
          <div className="quote-canvas-trans">{verse.translation}</div>
          <div className="quote-canvas-source" style={{ color: activeTheme.border }}>
            — {verse.source}
          </div>
        </div>

        {/* Theme Selectors */}
        <div className="quote-theme-selector">
          <span className="theme-label">{lang === 'hindi' ? 'थीम चुनें:' : 'Select Theme:'}</span>
          <div className="theme-options">
            {THEMES.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setActiveTheme(theme)}
                className={`theme-pill ${activeTheme.id === theme.id ? 'active' : ''}`}
                style={{ borderColor: theme.border }}
              >
                <span className="theme-color-dot" style={{ background: theme.border }} />
                <span>{theme.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="quote-modal-footer">
          <button className="quote-action-secondary" onClick={handleCopyText}>
            {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
            <span>{copied ? (lang === 'hindi' ? 'कॉपी हो गया' : 'Copied!') : (lang === 'hindi' ? 'टेक्स्ट कॉपी करें' : 'Copy Quote Text')}</span>
          </button>
          <button className="quote-action-primary" onClick={handleCopyText}>
            <Download size={16} />
            <span>{lang === 'hindi' ? 'कार्ड डाउनलोड करें' : 'Share / Download Card'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuoteBuilderModal;
