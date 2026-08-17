import React, { useState } from 'react';
import { Sparkles, Compass, Utensils, Palette, Heart, ArrowRight, Check, X } from 'lucide-react';
import './WisdomPathwayModal.css';

interface WisdomPathwayModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: 'english' | 'hindi';
  onSelectPathway?: (pathway: string) => void;
}

export interface PathwayOption {
  id: string;
  titleEn: string;
  titleHi: string;
  descEn: string;
  descHi: string;
  icon: React.ReactNode;
  targetAnchor: string;
}

const PATHWAYS: PathwayOption[] = [
  {
    id: 'spiritual',
    titleEn: 'Spiritual Peace & Shlokas',
    titleHi: 'आध्यात्मिक शांति एवं स्तोत्र पाठ',
    descEn: 'Sacred stotras, daily bhajan path, and Bhagavad Gita wisdom.',
    descHi: 'पवित्र स्तोत्र पाठ, नित्य भजन एवं भगवद्गीता सार।',
    icon: <Heart className="w-5 h-5 text-amber-400" />,
    targetAnchor: '#recitation',
  },
  {
    id: 'travel',
    titleEn: 'Sacred Travel & Braj Yatra',
    titleHi: 'पावन ब्रज यात्रा एवं दर्शन',
    descEn: 'Guided itineraries for Vrindavan, Barsana, and Govardhan.',
    descHi: 'वृंदावन, बरसाना एवं गोवर्धन धाम यात्रा मार्गदर्शिका।',
    icon: <Compass className="w-5 h-5 text-sky-400" />,
    targetAnchor: '#download-apps',
  },
  {
    id: 'food',
    titleEn: 'Vedic Sattvic Food',
    titleHi: 'वैदिक सात्विक प्रसादम',
    descEn: 'Pure cloud kitchen prasadam, Ayurvedic diet, and sattvic living.',
    descHi: 'शुद्ध सात्विक व्यंजन, आयुर्वेदिक आहार एवं जीवन शैली।',
    icon: <Utensils className="w-5 h-5 text-emerald-400" />,
    targetAnchor: '#services',
  },
  {
    id: 'art',
    titleEn: 'Sacred Art & Heritage',
    titleHi: 'दिव्य कला एवं धरोहर',
    descEn: 'High-res digital art galleries of Sri Radha Krishna & Braj Dham.',
    descHi: 'श्री राधा कृष्ण एवं ब्रज धाम के दिव्य चित्र एवं कलाकृतियां।',
    icon: <Palette className="w-5 h-5 text-purple-400" />,
    targetAnchor: '#about',
  },
];

export const WisdomPathwayModal: React.FC<WisdomPathwayModalProps> = ({
  isOpen,
  onClose,
  lang = 'english',
  onSelectPathway,
}) => {
  const [selectedId, setSelectedId] = useState<string>('spiritual');

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

  if (!isOpen) return null;

  const handleConfirm = () => {
    localStorage.setItem('vrinda_pathway', selectedId);
    if (onSelectPathway) {
      onSelectPathway(selectedId);
    }
    onClose();

    const selectedObj = PATHWAYS.find((p) => p.id === selectedId);
    if (selectedObj) {
      const el = document.querySelector(selectedObj.targetAnchor);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="wisdom-modal-backdrop" onClick={onClose}>
      <div className="wisdom-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="wisdom-modal-header">
          <div className="wisdom-badge">
            <Sparkles size={14} className="text-amber-400" />
            <span>{lang === 'hindi' ? 'आपकी साधना यात्रा' : 'Personalized Sanctuary'}</span>
          </div>
          <button className="wisdom-close-btn" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <h2 className="wisdom-modal-title">
          {lang === 'hindi'
            ? 'आज वृंदोपनिषद में आप क्या खोजना चाहते हैं?'
            : 'What brings you to Vrindopnishad today?'}
        </h2>
        <p className="wisdom-modal-subtitle">
          {lang === 'hindi'
            ? 'अपनी पसंद चुनें ताकि हम आपके लिए सर्वोत्तम वैदिक सामग्री प्रदर्शित कर सकें।'
            : 'Select your focus to tailor your experience across scriptures, travel, and sacred art.'}
        </p>

        <div className="wisdom-pathways-grid">
          {PATHWAYS.map((p) => {
            const isSelected = selectedId === p.id;
            return (
              <div
                key={p.id}
                onClick={() => setSelectedId(p.id)}
                className={`pathway-card ${isSelected ? 'selected' : ''}`}
              >
                <div className="pathway-icon-wrapper">{p.icon}</div>
                <div className="pathway-content">
                  <h3>{lang === 'hindi' ? p.titleHi : p.titleEn}</h3>
                  <p>{lang === 'hindi' ? p.descHi : p.descEn}</p>
                </div>
                <div className={`pathway-check-badge ${isSelected ? 'active' : ''}`}>
                  {isSelected && <Check size={13} />}
                </div>
              </div>
            );
          })}
        </div>

        <div className="wisdom-modal-footer">
          <button className="wisdom-skip-btn" onClick={onClose}>
            {lang === 'hindi' ? 'बाद में चुनें' : 'Explore All'}
          </button>
          <button className="wisdom-confirm-btn" onClick={handleConfirm}>
            <span>{lang === 'hindi' ? 'आगे बढ़ें' : 'Begin My Journey'}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WisdomPathwayModal;
