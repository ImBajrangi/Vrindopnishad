import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Download,
  Copy,
  Check,
  X,
  Smartphone,
  Square,
  Monitor,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';
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

type AspectRatioMode = 'story' | 'post' | 'landscape';

const THEMES = [
  {
    id: 'gold',
    name: 'Divine Amber',
    accent: '#f59e0b',
    bgStart: '#161108',
    bgMid: '#241706',
    bgEnd: '#0e0b04',
    glow: 'rgba(245, 158, 11, 0.16)',
    halo: 'rgba(245, 158, 11, 0.28)',
  },
  {
    id: 'cyan',
    name: 'Celestial Cyan',
    accent: '#38bdf8',
    bgStart: '#051320',
    bgMid: '#082138',
    bgEnd: '#030c16',
    glow: 'rgba(56, 189, 248, 0.16)',
    halo: 'rgba(56, 189, 248, 0.28)',
  },
  {
    id: 'purple',
    name: 'Vrindavan Amethyst',
    accent: '#c084fc',
    bgStart: '#160824',
    bgMid: '#280c3d',
    bgEnd: '#0d0316',
    glow: 'rgba(192, 132, 252, 0.16)',
    halo: 'rgba(192, 132, 252, 0.28)',
  },
  {
    id: 'dark',
    name: 'Obsidian Velvet',
    accent: '#f1f5f9',
    bgStart: '#0c0d12',
    bgMid: '#161722',
    bgEnd: '#08090d',
    glow: 'rgba(255, 255, 255, 0.06)',
    halo: 'rgba(255, 255, 255, 0.12)',
  },
];

const ASPECT_RATIOS: { id: AspectRatioMode; label: string; icon: React.ReactNode; width: number; height: number }[] = [
  { id: 'story', label: 'Story (9:16)', icon: <Smartphone size={13} />, width: 1080, height: 1920 },
  { id: 'post', label: 'Post (4:5)', icon: <Square size={13} />, width: 1080, height: 1350 },
  { id: 'landscape', label: 'Card (16:9)', icon: <Monitor size={13} />, width: 1200, height: 675 },
];

export const QuoteBuilderModal: React.FC<QuoteBuilderModalProps> = ({
  isOpen,
  verse,
  onClose,
  lang = 'english',
}) => {
  const [activeTheme, setActiveTheme] = useState(THEMES[0]);
  const [aspectMode, setAspectMode] = useState<AspectRatioMode>('story');
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !verse) return null;

  const cleanShloka = verse.shloka.replace(/["""]/g, '').trim();

  // Copy text to clipboard
  const handleCopyText = () => {
    const text = `${cleanShloka}\n\n${verse.translation}\n— ${verse.source}\n\nVia Vrindopnishad (https://vrindopnishad.in)`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);

    confetti({
      particleCount: 20,
      spread: 40,
      origin: { y: 0.7 },
      colors: [activeTheme.accent, '#f59e0b', '#38bdf8'],
    });
  };

  // High-Resolution 4K Social Canvas Generator (Borderless, Pure Modern Luxury)
  const generateCanvas = (): HTMLCanvasElement | null => {
    const currentRatio = ASPECT_RATIOS.find((r) => r.id === aspectMode) || ASPECT_RATIOS[0];
    const width = currentRatio.width;
    const height = currentRatio.height;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // 1. Deep Obsidian Gradient Background (No harsh outlines!)
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, activeTheme.bgStart);
    gradient.addColorStop(0.5, activeTheme.bgMid);
    gradient.addColorStop(1, activeTheme.bgEnd);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // 2. Luminous Ambient Radial Halo
    const radialGlow = ctx.createRadialGradient(width / 2, height * 0.2, 30, width / 2, height * 0.2, width * 0.8);
    radialGlow.addColorStop(0, activeTheme.halo);
    radialGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = radialGlow;
    ctx.fillRect(0, 0, width, height);

    const padding = aspectMode === 'story' ? 70 : 60;

    // 3. Header: Official Brand Watermark
    ctx.fillStyle = activeTheme.accent;
    ctx.font = `bold ${aspectMode === 'story' ? 28 : 22}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
    ctx.letterSpacing = '4px';
    const headerY = aspectMode === 'story' ? 150 : 110;
    ctx.fillText('✦ VRINDOPNISHAD • SACRED WISDOM', padding, headerY);

    // Subtle Tagline
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.font = `500 ${aspectMode === 'story' ? 20 : 16}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
    ctx.letterSpacing = '1px';
    ctx.fillText('Vedic Heritage & Devotional Contemplation', padding, headerY + 34);

    // 4. Left Accent Indicator Line
    const contentStartY = aspectMode === 'story' ? height * 0.32 : height * 0.28;
    ctx.fillStyle = activeTheme.accent;
    const accentHeight = aspectMode === 'story' ? 320 : 220;
    ctx.fillRect(padding, contentStartY, 6, accentHeight);

    // 5. Sanskrit Shloka Typography
    ctx.fillStyle = '#ffffff';
    ctx.font = `bold ${aspectMode === 'story' ? 46 : 38}px "Devanagari", -apple-system, BlinkMacSystemFont, serif`;
    const shlokaLines = cleanShloka.split('\n');
    let textY = contentStartY + (aspectMode === 'story' ? 50 : 45);
    const lineSpacing = aspectMode === 'story' ? 68 : 56;

    shlokaLines.forEach((line) => {
      ctx.fillText(line, padding + 30, textY);
      textY += lineSpacing;
    });

    // 6. Word-wrapped English / Hindi Poetic Translation
    ctx.fillStyle = '#cbd5e1';
    ctx.font = `500 ${aspectMode === 'story' ? 32 : 24}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
    const words = verse.translation.split(' ');
    let currentLine = '';
    let transY = Math.max(textY + 50, aspectMode === 'story' ? height * 0.58 : height * 0.62);
    const maxWidth = width - (padding * 2 + 40);
    const transLineHeight = aspectMode === 'story' ? 48 : 38;

    for (let i = 0; i < words.length; i++) {
      const testLine = currentLine + words[i] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && i > 0) {
        ctx.fillText(currentLine, padding, transY);
        currentLine = words[i] + ' ';
        transY += transLineHeight;
      } else {
        currentLine = testLine;
      }
    }
    ctx.fillText(currentLine, padding, transY);

    // 7. Scripture Source Citation
    ctx.fillStyle = activeTheme.accent;
    ctx.font = `bold ${aspectMode === 'story' ? 28 : 22}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
    ctx.fillText(`— ${verse.source}`, padding, transY + (aspectMode === 'story' ? 60 : 45));

    // 8. Modern Gen-Z Viral Footer
    const footerY = height - padding;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = `600 ${aspectMode === 'story' ? 22 : 18}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
    ctx.fillText('vrindopnishad.in', padding, footerY);

    ctx.textAlign = 'right';
    ctx.fillStyle = activeTheme.accent;
    ctx.fillText('✦ Verified Vedic Shastra', width - padding, footerY);
    ctx.textAlign = 'left';

    return canvas;
  };

  // Instant Direct PNG Download
  const handleDownloadPNG = () => {
    setIsExporting(true);
    const canvas = generateCanvas();
    if (!canvas) {
      setIsExporting(false);
      return;
    }

    try {
      const dataUrl = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = dataUrl;
      downloadLink.download = `Vrindopnishad-${aspectMode}-${activeTheme.id}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      setExportSuccess(true);
      setIsExporting(false);
      setTimeout(() => setExportSuccess(false), 2400);

      confetti({
        particleCount: 35,
        spread: 55,
        origin: { y: 0.7 },
        colors: [activeTheme.accent, '#f59e0b', '#38bdf8'],
      });
    } catch (err) {
      console.error('Download error:', err);
      setIsExporting(false);
    }
  };

  return (
    <div className="quote-studio-backdrop" onClick={onClose}>
      <motion.div
        className="quote-studio-modal"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.88, y: 35, filter: 'blur(12px)' }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: {
            type: 'spring',
            bounce: 0.48,
            duration: 0.747,
          }
        }}
        exit={{
          opacity: 0,
          scale: 0.9,
          y: 20,
          filter: 'blur(8px)',
          transition: { duration: 0.18, ease: 'easeOut' }
        }}
      >
        {/* Dynamic Theme Glow Top Halo */}
        <div
          className="quote-studio-halo"
          style={{ background: `radial-gradient(circle, ${activeTheme.halo} 0%, transparent 70%)` }}
        />

        {/* Studio Top Control Bar */}
        <div className="quote-studio-header">
          {/* Format / Aspect Ratio Switcher */}
          <div className="aspect-switcher-pills">
            {ASPECT_RATIOS.map((ratio) => (
              <button
                key={ratio.id}
                type="button"
                onClick={() => setAspectMode(ratio.id)}
                className={`aspect-pill ${aspectMode === ratio.id ? 'is-active' : ''}`}
              >
                {ratio.icon}
                <span>{ratio.label}</span>
              </button>
            ))}
          </div>

          <div className="studio-header-right">
            {/* Color Swatches */}
            <div className="studio-swatches-group">
              {THEMES.map((theme) => (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => setActiveTheme(theme)}
                  className={`studio-swatch-btn ${activeTheme.id === theme.id ? 'is-active' : ''}`}
                  title={theme.name}
                  aria-label={theme.name}
                >
                  <span className="studio-swatch-color" style={{ background: theme.accent }} />
                </button>
              ))}
            </div>

            <button className="studio-close-btn" onClick={onClose} aria-label="Close">
              <X size={14} />
            </button>
          </div>
        </div>

        {/* Borderless Organic Canvas Preview */}
        <div
          className={`social-canvas-preview format-${aspectMode}`}
          style={{
            background: activeTheme.bgStart,
            boxShadow: `0 20px 50px rgba(0, 0, 0, 0.75), 0 0 30px ${activeTheme.glow}`
          }}
        >
          {/* Ambient Glow */}
          <div
            className="preview-ambient-halo"
            style={{ background: `radial-gradient(circle at 50% 10%, ${activeTheme.halo} 0%, transparent 70%)` }}
          />

          {/* Top Brand Watermark */}
          <div className="preview-top-brand" style={{ color: activeTheme.accent }}>
            <div className="brand-title-line">
              <Sparkles size={12} />
              <span>VRINDOPNISHAD • SACRED WISDOM</span>
            </div>
            <span className="brand-sub">Vedic Heritage & Devotional Contemplation</span>
          </div>

          {/* Center Verse with Left Accent Bar */}
          <div className="preview-center-block" style={{ borderLeftColor: activeTheme.accent }}>
            <pre className="preview-shloka-text">{cleanShloka}</pre>
          </div>

          {/* Poetic Translation & Source Citation */}
          <div className="preview-translation-block">
            <p className="preview-trans-text">{verse.translation}</p>
            <span className="preview-source-tag" style={{ color: activeTheme.accent }}>
              — {verse.source}
            </span>
          </div>

          {/* Modern Viral Footer */}
          <div className="preview-footer-line">
            <span className="footer-url">vrindopnishad.in</span>
            <span className="footer-badge" style={{ color: activeTheme.accent }}>
              ✦ Verified Vedic Shastra
            </span>
          </div>
        </div>

        {/* Sleek Featherweight Action Bar */}
        <div className="quote-studio-footer">
          <button
            type="button"
            className="studio-action-btn secondary"
            onClick={handleCopyText}
          >
            {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
            <span>{copied ? (lang === 'hindi' ? 'कॉपी हुआ!' : 'Copied!') : (lang === 'hindi' ? 'टेक्स्ट कॉपी' : 'Copy Text')}</span>
          </button>

          <button
            type="button"
            className="studio-action-btn primary"
            onClick={handleDownloadPNG}
            disabled={isExporting}
            style={{
              background: `linear-gradient(135deg, ${activeTheme.accent} 0%, ${activeTheme.accent}dd 100%)`,
              color: activeTheme.id === 'dark' ? '#000000' : '#ffffff',
              boxShadow: `0 4px 16px ${activeTheme.glow}`
            }}
          >
            {exportSuccess ? (
              <>
                <CheckCircle2 size={13} />
                <span>{lang === 'hindi' ? 'चित्र सुरक्षित हुआ!' : 'Card Downloaded!'}</span>
              </>
            ) : (
              <>
                <Download size={13} />
                <span>{lang === 'hindi' ? 'कार्ड डाउनलोड करें' : `Download ${aspectMode === 'story' ? 'Story' : aspectMode === 'post' ? 'Post' : 'Card'} (PNG)`}</span>
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default QuoteBuilderModal;
