import React, { useState } from 'react';
import { Sparkles, Play, Pause, Bookmark, Share2, Volume2, Check } from 'lucide-react';
import './DailyInsightCard.css';

interface DailyInsightCardProps {
  lang?: 'english' | 'hindi';
  onOpenQuoteBuilder?: (verse: { shloka: string; translation: string; source: string }) => void;
  onDeconstructVerse?: (shlokaText: string) => void;
}

const DAILY_VERSE = {
  shloka: 'यस्मान्नोद्विजते लोको लोकान्नोद्विजते च यः। हर्षामर्षभयोद्वेगैर्मुक्तो यः स च मे प्रियः॥',
  transEn: 'He by whom the world is not agitated and who is not agitated by the world, who is free from joy, envy, fear and anxiety—he is dear to Me.',
  transHi: 'जिससे कोई जीव उद्वेग को प्राप्त नहीं होता और जो स्वयं किसी जीव से उद्वेग को प्राप्त नहीं होता, तथा जो हर्ष, अमर्ष, भय और उद्वेगादि से रहित है—वह भक्त मुझे प्रिय है।',
  source: 'Bhagavad Gita 12.15',
};

export const DailyInsightCard: React.FC<DailyInsightCardProps> = ({
  lang = 'english',
  onOpenQuoteBuilder,
  onDeconstructVerse,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);

  const toggleAudio = () => {
    if ('speechSynthesis' in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
      } else {
        const textToRead = lang === 'hindi' ? `${DAILY_VERSE.shloka}. ${DAILY_VERSE.transHi}` : `${DAILY_VERSE.shloka}. ${DAILY_VERSE.transEn}`;
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.rate = 0.9;
        utterance.pitch = 1.0;
        utterance.onend = () => setIsPlaying(false);
        utterance.onerror = () => setIsPlaying(false);

        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
        setIsPlaying(true);
      }
    }
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    const bookmarks = JSON.parse(localStorage.getItem('vrinda_bookmarks') || '[]');
    if (!isBookmarked) {
      localStorage.setItem('vrinda_bookmarks', JSON.stringify([...bookmarks, DAILY_VERSE]));
    } else {
      localStorage.setItem('vrinda_bookmarks', JSON.stringify(bookmarks.filter((b: any) => b.source !== DAILY_VERSE.source)));
    }
  };

  const handleShare = () => {
    if (onOpenQuoteBuilder) {
      onOpenQuoteBuilder({
        shloka: DAILY_VERSE.shloka,
        translation: lang === 'hindi' ? DAILY_VERSE.transHi : DAILY_VERSE.transEn,
        source: DAILY_VERSE.source,
      });
    } else {
      const shareText = `"${DAILY_VERSE.shloka}" - ${DAILY_VERSE.source} | Discover on Vrindopnishad`;
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDeconstruct = () => {
    if (onDeconstructVerse) {
      onDeconstructVerse(`Explain Bhagavad Gita 12.15: "${DAILY_VERSE.shloka}"`);
    }
  };

  return (
    <div className="daily-insight-card">
      {/* Decorative Gold Corner Accents */}
      <span className="card-corner corner-tl" />
      <span className="card-corner corner-tr" />
      <span className="card-corner corner-bl" />
      <span className="card-corner corner-br" />

      <div className="daily-insight-header">
        <div className="daily-insight-badge">
          <Sparkles size={13} className="text-amber-400" />
          <span>{lang === 'hindi' ? 'आज का वैदिक विचार' : 'Verse of the Day'}</span>
        </div>

        <div className="daily-insight-actions">
          {isPlaying && (
            <div className="daily-audio-wave">
              <span className="wave-line w-1" />
              <span className="wave-line w-2" />
              <span className="wave-line w-3" />
            </div>
          )}

          <button
            onClick={toggleAudio}
            className={`daily-action-btn ${isPlaying ? 'playing' : ''}`}
            title={isPlaying ? 'Pause Audio' : 'Listen to Chanting'}
            aria-label="Toggle Audio Playback"
          >
            {isPlaying ? <Pause size={15} /> : <Volume2 size={15} />}
          </button>

          <button
            onClick={toggleBookmark}
            className={`daily-action-btn ${isBookmarked ? 'bookmarked' : ''}`}
            title={isBookmarked ? 'Saved to Bookmarks' : 'Bookmark Verse'}
            aria-label="Bookmark Verse"
          >
            <Bookmark size={15} fill={isBookmarked ? '#f59e0b' : 'none'} />
          </button>

          <button
            onClick={handleShare}
            className="daily-action-btn"
            title="Create Shareable Quote"
            aria-label="Share Quote"
          >
            {copied ? <Check size={15} className="text-emerald-400" /> : <Share2 size={15} />}
          </button>
        </div>
      </div>

      <div className="daily-shloka-text">"{DAILY_VERSE.shloka}"</div>

      <p className="daily-translation">
        {lang === 'hindi' ? DAILY_VERSE.transHi : DAILY_VERSE.transEn}
      </p>

      <div className="daily-card-footer">
        <button className="deconstruct-verse-btn" onClick={handleDeconstruct}>
          <Sparkles size={13} />
          <span>{lang === 'hindi' ? 'श्लोक विश्लेषण एवं अर्थ पूछें' : 'Deconstruct Verse with AI'}</span>
        </button>
        <div className="daily-source-tag">— {DAILY_VERSE.source}</div>
      </div>
    </div>
  );
};

export default DailyInsightCard;
