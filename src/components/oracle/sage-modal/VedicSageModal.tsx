import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Share2,
  X,
  ExternalLink,
  Volume2,
  VolumeX,
  Copy,
  Check,
  ArrowRight,
  Clock,
  Heart
} from 'lucide-react';
import confetti from 'canvas-confetti';
import './VedicSageModal.css';

interface ScripturalResponse {
  category: 'art' | 'food' | 'parikrama' | 'temple_aarti' | 'gita' | 'stotra';
  query: string;
  source: string;
  sourceHi: string;
  shloka: string;
  poeticEssenceEn: string;
  poeticEssenceHi: string;
  bannerImage?: string;
  bannerTitleEn?: string;
  bannerTitleHi?: string;
  bannerCtaUrl?: string;
  bannerCtaLabelEn?: string;
  bannerCtaLabelHi?: string;
  scheduleList?: { place: string; time: string; note: string }[];
  audioFreq: number;
}

interface VedicSageModalProps {
  isOpen: boolean;
  query: string | null;
  onClose: () => void;
  lang?: 'english' | 'hindi';
  onOpenQuoteBuilder?: (verse: { shloka: string; translation: string; source: string }) => void;
}

const SCRIPTURE_DATABASE: Record<string, ScripturalResponse> = {
  temple_aarti: {
    category: 'temple_aarti',
    query: 'Vrindavan Mangala Aarti',
    source: 'Braj Darshan • Morning Awakening',
    sourceHi: 'ब्रज दर्शन • प्रातः मंगला भाव',
    shloka: 'सदा पश्यन्ति सूरयो दिव्यं मङ्गलाख्याम्।\nश्रीराधारमणो जयति श्रीगोविन्दो जयत्यपि॥',
    poeticEssenceEn: 'Before sunrise, the sanctum stirs with conch shells and holy bells. In the serene morning quiet, behold Thakur Ji awaken to divine love.',
    poeticEssenceHi: 'भोर की शांत बेला में शंख और घंटों की मधुर ध्वनि के साथ ठाकुर जी जागते हैं। ब्रह्ममुहूर्त का यह प्रथम दर्शन हृदय को असीम शांति से भर देता है।',
    bannerImage: '/images/projects/vrinda_tours_hero.jpg',
    bannerTitleEn: 'Morning Darshan & Mangala Timetable',
    bannerTitleHi: 'प्रातः मंगला आरती एवं दर्शन समय',
    bannerCtaUrl: 'https://to.vrindopnishad.in/',
    bannerCtaLabelEn: 'View Full Temple Guide',
    bannerCtaLabelHi: 'मन्दिर मार्गदर्शिका देखें',
    scheduleList: [
      { place: 'Radha Raman', time: '4:00 AM', note: 'Self-manifested Saligram Sila' },
      { place: 'Radha Damodar', time: '4:30 AM', note: '4 Sacred Samadhi Parikramas' },
      { place: 'ISKCON', time: '4:30 AM', note: 'Tulsi Puja & Gurvastakam' },
      { place: 'Bankey Bihari', time: '7:45 AM', note: 'Morning Shringar Darshan' }
    ],
    audioFreq: 216
  },
  art: {
    category: 'art',
    query: 'Chitra Vrinda Sacred Art',
    source: 'Chitra Vrinda • Divine Art',
    sourceHi: 'चित्र वृंदा • दिव्य कला',
    shloka: 'फुल्लारविन्दवदनं मयूरवरबर्हवेष्टिताक्रीडम्।\nआनन्दकन्दमच्युतं प्रणमत वृन्दावनचन्द्रम्॥',
    poeticEssenceEn: 'A glimpse into the eternal realm of Sri Radha Krishna — where every brushstroke is meditation, and every artwork is an offering of divine love.',
    poeticEssenceHi: 'श्री राधा कृष्ण के नित्य लीला दर्शन — जहाँ हर रंग और रूप में पावन ब्रज की दिव्यता और अनन्य प्रेम झलकता है।',
    bannerImage: '/images/projects/chitra_vrinda_hero.jpg',
    bannerTitleEn: '500+ Sacred 4K Digital Artworks',
    bannerTitleHi: '५००+ दिव्य ४के कलाकृतियां एवं वॉलपेपर',
    bannerCtaUrl: 'https://pic.vrindopnishad.in/',
    bannerCtaLabelEn: 'Explore Gallery',
    bannerCtaLabelHi: 'गैलरी देखें',
    audioFreq: 288
  },
  food: {
    category: 'food',
    query: 'Foody Vrinda Prasadam',
    source: 'Bhagavad Gita 9.26 • Pure Bhog',
    sourceHi: 'श्रीमद्भगवद्गीता ९.२६ • सात्विक भोग',
    shloka: 'पत्रं पुष्पं फलं तोयं यो मे भक्त्या प्रयच्छति।\nतदहं भक्त्युपहृतमश्नामि प्रयतात्मनः॥',
    poeticEssenceEn: 'Prepared in pure desi cow ghee without onion or garlic, offered first with heartfelt love as Mahaprasadam for body and soul.',
    poeticEssenceHi: 'शुद्ध देसी घी में निर्मित, लहसुन-प्याज से सर्वथा मुक्त — पहले प्रभु को अर्पित पावन प्रसादम जो आत्मा को तृप्त करे।',
    bannerImage: '/images/projects/foody_vrinda_hero.png',
    bannerTitleEn: 'Pure Vaishnav Satvik Meals',
    bannerTitleHi: 'शुद्ध वैष्णव सात्विक भोजन',
    bannerCtaUrl: '#services',
    bannerCtaLabelEn: 'Order Satvik Thali',
    bannerCtaLabelHi: 'सात्विक थाली मंगाएं',
    audioFreq: 196
  },
  parikrama: {
    category: 'parikrama',
    query: 'Sacred Parikrama',
    source: 'Padma Purana • Braj Rahasya',
    sourceHi: 'पद्म पुराण • ब्रज रहस्य',
    shloka: 'वृंदावनं परित्यज्य पादमेकं न गच्छति।\nश्रीराधाचरणाम्भोजे मकरन्दीकृतो मनः॥',
    poeticEssenceEn: 'Every footstep around sacred Vrindavan is a step into eternity. Walk with gentle silence, chanting the holy names, and feel the sacred dust of Braj.',
    poeticEssenceHi: 'पावन ब्रज धाम की परिक्रमा का हर पग जन्मों के बंधनों से मुक्ति और श्री राधा के चरणकमलों का पावन सान्निध्य प्रदान करता है।',
    bannerImage: '/images/projects/vrinda_tours_hero.jpg',
    bannerTitleEn: 'Vrindavan (10km) & Govardhan (21km) Yatra',
    bannerTitleHi: 'वृंदावन (१० किमी) एवं गोवर्धन (२१ किमी) यात्रा',
    bannerCtaUrl: 'https://to.vrindopnishad.in/',
    bannerCtaLabelEn: 'Plan Yatra',
    bannerCtaLabelHi: 'यात्रा योजना बनाएं',
    audioFreq: 174
  },
  stotra: {
    category: 'stotra',
    query: 'Morning Stotra',
    source: 'Adi Shankaracharya • Pratah Smarana',
    sourceHi: 'आदि शंकराचार्य • प्रातः स्मरण स्तोत्र',
    shloka: 'प्रातः स्मरामि हृदि संस्फुरदात्मतत्त्वं\nसच्चित्सुखं परमहंसगतिं तुरीयम्।\nयत्स्वप्नजागरसुषुप्तिमवैति नित्यं\nतद्ब्रह्म निष्कलमहं न च भूतसङ्घः॥',
    poeticEssenceEn: 'At dawn, awaken your heart to the radiant, pure consciousness within — the eternal witness of waking, dreaming, and deep peace.',
    poeticEssenceHi: 'प्रातःकाल अपने हृदय में प्रकाशित उस सच्चिदानंद आत्मतत्त्व का स्मरण करें, जो समस्त अवस्थाओं का साक्षी और परमानंद का स्रोत है।',
    audioFreq: 256
  },
  gita: {
    category: 'gita',
    query: 'Bhagavad Gita 12.7',
    source: 'Srimad Bhagavad Gita 12.7 • Bhakti Yoga',
    sourceHi: 'श्रीमद्भगवद्गीता १२.७ • भक्ति योग',
    shloka: 'तेषामहं समुद्धर्ता मृत्युसंसारसागरात्।\nभवामि नचिरात्पार्थ मय्यावेशितचेतसाम्॥',
    poeticEssenceEn: 'For the soul who surrenders their heart in devotion, Bhagavan becomes their gentle protector, lifting them effortlessly above all anxiety and fear.',
    poeticEssenceHi: 'जो अनन्य भाव से मुझे अपना हृदय सौंप देते हैं, उनका संसार रूपी सागर से उद्धार करने का सम्पूर्ण दायित्व मैं स्वयं ले लेता हूँ।',
    audioFreq: 216
  }
};

function resolveScriptureResponse(queryText: string): ScripturalResponse {
  const q = queryText.toLowerCase();

  // 1. Temple Aarti & Morning Darshan
  if (
    /\b(aarti|arti|mangala|darshan|shringar|bhog aarti|sandhya aarti|temple timings?|mandir timings?|darshan times?|radha raman|bankey bihari|bihariji|damodar|iskcon)\b/i.test(q) ||
    q.includes('आरती') ||
    q.includes('दर्शन') ||
    q.includes('मंगला')
  ) {
    return SCRIPTURE_DATABASE['temple_aarti'];
  }

  // 2. Parikrama & Yatra
  if (
    /\b(parikrama|yatra|vrindavan|govardhan|barsana|nandgaon|mathura|tour|tours|travel|temple|temples|mandir|itinerary|route|guide)\b/i.test(q) ||
    q.includes('परिक्रमा') ||
    q.includes('यात्रा') ||
    q.includes('मन्दिर')
  ) {
    return SCRIPTURE_DATABASE['parikrama'];
  }

  // 3. Digital Art & Chitra Vrinda
  if (
    /\b(art|arts|artwork|artworks|digital art|paintings?|wallpapers?|gallery|drawings?|illustrations?|chitra|chitra vrinda|4k|hd wallpaper)\b/i.test(q) ||
    q.includes('चित्र') ||
    q.includes('कला')
  ) {
    return SCRIPTURE_DATABASE['art'];
  }

  // 4. Satvik Food & Foody Vrinda
  if (
    /\b(food|prasadam?|foody|satvik|sattvic|meals?|thali|khana|bhojan|diet|kitchen|makhan|peda|sweets?)\b/i.test(q) ||
    q.includes('भोजन') ||
    q.includes('सात्विक') ||
    q.includes('प्रसाद')
  ) {
    return SCRIPTURE_DATABASE['food'];
  }

  // 5. Morning Stotras & Mantras
  if (
    /\b(stotra|stotram|morning path|niyam|mantras?|chants?|chanting|gayatri|shanti path|prayers?|pratah)\b/i.test(q) ||
    q.includes('स्तोत्र') ||
    q.includes('नियम') ||
    q.includes('मन्त्र')
  ) {
    return SCRIPTURE_DATABASE['stotra'];
  }

  // 6. Default Gita & Shastra
  return SCRIPTURE_DATABASE['gita'];
}

export const VedicSageModal: React.FC<VedicSageModalProps> = ({
  isOpen,
  query,
  onClose,
  lang = 'english',
  onOpenQuoteBuilder,
}) => {
  const [activeQuery, setActiveQuery] = useState<string>(query || '');
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [copied, setCopied] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    if (query) {
      setActiveQuery(query);
    }
  }, [query]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const data = resolveScriptureResponse(activeQuery);

  const toggleVerseAudio = () => {
    if (isAudioPlaying) {
      stopAudio();
    } else {
      startAudio(data.audioFreq || 216);
    }
  };

  const startAudio = (baseFreq: number) => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(baseFreq, ctx.currentTime);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(baseFreq * 1.5, ctx.currentTime);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 1.0);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();

      osc1Ref.current = osc1;
      osc2Ref.current = osc2;
      gainRef.current = gain;

      setIsAudioPlaying(true);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  };

  const stopAudio = () => {
    if (gainRef.current && audioCtxRef.current) {
      gainRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.3);
      setTimeout(() => {
        osc1Ref.current?.stop();
        osc2Ref.current?.stop();
        audioCtxRef.current?.close();
        audioCtxRef.current = null;
        osc1Ref.current = null;
        osc2Ref.current = null;
        gainRef.current = null;
      }, 300);
    }
    setIsAudioPlaying(false);
  };

  const handleCopyWisdom = () => {
    const text = `"${data.shloka}"\n\n${lang === 'hindi' ? data.poeticEssenceHi : data.poeticEssenceEn}\n— ${data.source}\n\nVia Vrindopnishad Sage AI`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const handleOpenQuoteBuilder = () => {
    if (onOpenQuoteBuilder) {
      onOpenQuoteBuilder({
        shloka: data.shloka,
        translation: lang === 'hindi' ? data.poeticEssenceHi : data.poeticEssenceEn,
        source: data.source,
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="sage-soul-wrapper">
      {/* Translucent Soft Blur Dismissal Backdrop */}
      <div className="sage-soul-backdrop" onClick={onClose} />

      {/* POETIC MINIMAL LIQUID SATELLITE CAPSULE WITH GOOEY BOUNCY SPRING */}
      <motion.div
        className="sage-soul-card"
        initial={{ opacity: 0, y: 45, scale: 0.8, filter: 'blur(12px)' }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          transition: {
            type: 'spring',
            bounce: 0.48,
            duration: 0.747,
          }
        }}
        exit={{
          opacity: 0,
          y: 30,
          scale: 0.85,
          filter: 'blur(8px)',
          transition: {
            type: 'spring',
            bounce: 0.48,
            duration: 0.747,
          }
        }}
      >
        {/* Soft Golden Spiritual Halo */}
        <div className="sage-soul-halo" />

        {/* Top Header: Floating Sacred Badge & Actions */}
        <div className="sage-soul-header">
          <div className="sage-soul-meta">
            <span className="sage-soul-dot" />
            <span className="sage-soul-source">
              {lang === 'hindi' ? data.sourceHi : data.source}
            </span>
          </div>

          <div className="sage-soul-actions">
            {/* Inline Meditative Chanting Waveform Capsule */}
            <button
              type="button"
              onClick={toggleVerseAudio}
              className={`sage-drone-pill ${isAudioPlaying ? 'is-playing' : ''}`}
              title={isAudioPlaying ? 'Pause Chant' : 'Listen Chanting'}
            >
              {isAudioPlaying ? <VolumeX size={12} /> : <Volume2 size={12} />}
              <span>{isAudioPlaying ? (lang === 'hindi' ? 'रोकें' : 'Pause') : (lang === 'hindi' ? 'ध्वनि' : 'Chant')}</span>
              {isAudioPlaying && (
                <div className="drone-live-bars">
                  <span />
                  <span />
                  <span />
                </div>
              )}
            </button>

            <button
              type="button"
              onClick={handleCopyWisdom}
              className="sage-mini-btn"
              title="Copy Shloka"
              aria-label="Copy"
            >
              {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="sage-mini-btn close"
              aria-label="Close"
            >
              <X size={14} />
            </button>
          </div>
        </div>

        {/* Optional Visual Highlight Card (For Chitra Vrinda & Foody Vrinda) */}
        {data.bannerImage && (
          <div className="sage-soul-banner">
            <img src={data.bannerImage} alt={data.source} className="soul-banner-img" />
            <div className="soul-banner-overlay" />
            <div className="soul-banner-info">
              <span className="soul-banner-title">
                {lang === 'hindi' ? data.bannerTitleHi : data.bannerTitleEn}
              </span>
              {data.bannerCtaUrl && (
                <a
                  href={data.bannerCtaUrl}
                  target={data.bannerCtaUrl.startsWith('http') ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className="soul-banner-cta"
                >
                  <span>{lang === 'hindi' ? data.bannerCtaLabelHi : data.bannerCtaLabelEn}</span>
                  <ArrowRight size={12} />
                </a>
              )}
            </div>
          </div>
        )}

        {/* Sacred Sanskrit Shloka: Poetic Typography */}
        <div className="sage-soul-verse">
          <pre className="soul-sanskrit-shloka">{data.shloka}</pre>
        </div>

        {/* Heartfelt Poetic Meaning */}
        <div className="sage-soul-meaning">
          <p className="soul-essence-text">
            {lang === 'hindi' ? data.poeticEssenceHi : data.poeticEssenceEn}
          </p>
        </div>

        {/* Morning Aarti Schedule (Only for Aarti Query) */}
        {data.scheduleList && (
          <div className="sage-soul-schedule">
            <div className="soul-schedule-grid">
              {data.scheduleList.map((item, i) => (
                <div key={i} className="soul-schedule-chip">
                  <div className="schedule-chip-left">
                    <span className="chip-place">{item.place}</span>
                    <span className="chip-note">{item.note}</span>
                  </div>
                  <span className="chip-time">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sleek Featherweight Actions Row */}
        <div className="sage-soul-footer">
          <button
            type="button"
            onClick={handleOpenQuoteBuilder}
            className="soul-action-btn outline"
          >
            <Share2 size={12} />
            <span>{lang === 'hindi' ? 'कार्ड बनाएं' : 'Share Quote'}</span>
          </button>

          <a
            href={data.bannerCtaUrl || 'https://to.vrindopnishad.in/'}
            target={data.bannerCtaUrl?.startsWith('http') ? '_blank' : '_self'}
            rel="noopener noreferrer"
            className="soul-action-btn primary"
          >
            <span>
              {data.category === 'art'
                ? (lang === 'hindi' ? 'चित्र गैलरी' : 'Open Gallery')
                : data.category === 'food'
                ? (lang === 'hindi' ? 'सात्विक भोजन' : 'Order Food')
                : data.category === 'temple_aarti' || data.category === 'parikrama'
                ? (lang === 'hindi' ? 'यात्रा पोर्टल' : 'Open Tours')
                : (lang === 'hindi' ? 'ग्रन्थ पाथ' : 'Open Path')}
            </span>
            <ExternalLink size={12} />
          </a>
        </div>

        {/* Liquid Molten Connector Droplet */}
        <div className="sage-soul-droplet" />
      </motion.div>
    </div>
  );
};

export default VedicSageModal;
