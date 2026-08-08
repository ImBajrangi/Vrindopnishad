import React from 'react';
import { Sparkles, BookOpen, Quote, Share2, X, ExternalLink } from 'lucide-react';
import './VedicSageModal.css';

interface ScripturalResponse {
  query: string;
  shloka: string;
  transEn: string;
  transHi: string;
  source: string;
  explanationEn: string;
  explanationHi: string;
}

interface VedicSageModalProps {
  isOpen: boolean;
  query: string | null;
  onClose: () => void;
  lang?: 'english' | 'hindi';
  onOpenQuoteBuilder?: (verse: { shloka: string; translation: string; source: string }) => void;
}

const SCRIPTURE_DATABASE: Record<string, ScripturalResponse> = {
  gita: {
    query: 'Bhagavad Gita Chapter 12',
    shloka: 'तेषामहं समुद्धर्ता मृत्युसंसारसागरात्। भवामि नचिरात्पार्थ मय्यावेशितचेतसाम्॥',
    transEn: 'For those whose minds are set on Me, I become the swift deliverer from the ocean of birth and death.',
    transHi: 'मुझमें चित्त लगाने वाले साधकों का मैं मृत्यु रूप संसार समुद्र से शीघ्र ही उद्धार करने वाला बन जाता हूँ।',
    source: 'Bhagavad Gita 12.7',
    explanationEn: 'Sri Krishna assures Arjuna that devotion (Bhakti Yoga) with a unified mind brings immediate divine grace and liberation from worldly suffering.',
    explanationHi: 'श्रीकृष्ण अर्जुन को आश्वस्त करते हैं कि अनन्य भक्ति भाव से समर्पित साधक को भगवद्कृपा एवं संसार सागर से तारण स्वतः प्राप्त होता है।',
  },
  parikrama: {
    query: 'Vrindavan Parikrama Guide',
    shloka: 'वृंदावनं परित्यज्य पादमेकं न गच्छति। श्रीराधाचरणाम्भोजे मकरन्दीकृतो मनः॥',
    transEn: 'Devotees steeped in the nectar of Sri Radha’s lotus feet never step away from holy Vrindavan Dham.',
    transHi: 'श्री राधा चरणों के मकरन्द में लीन साधक वृंदावन धाम को छोड़कर एक पग भी अन्यत्र नहीं जाते।',
    source: 'Braj Rahasya & Padma Purana',
    explanationEn: 'The sacred 84-Kos and 7-Kos Parikrama of Vrindavan & Govardhan represents the soul’s circumambulation around divine love.',
    explanationHi: 'वृंदावन एवं गोवर्धन की पावन परिक्रमा आत्मा की परमात्मा के प्रति प्रदक्षिणा एवं दिव्य प्रीति का प्रतीक है।',
  },
  stotra: {
    query: 'Nitya Niyam Stotras',
    shloka: 'प्रातः स्मरामि हृदि संस्फुरदात्मतत्त्वं सञ्चित्सुखं परमहंसगतिं तुरीयम्।',
    transEn: 'At dawn, I meditate upon the radiant truth within my heart—the supreme consciousness and bliss.',
    transHi: 'प्रातःकाल मैं अपने हृदय में स्फुरित सच्चिदानंद स्वरूप आत्मतत्त्व का स्मरण करता हूँ।',
    source: 'Prataha Smarana Stotram',
    explanationEn: 'Reciting sacred morning stotras at Brahma Muhurta purifies the intellect and aligns daily consciousness with divine harmony.',
    explanationHi: 'प्रातः ब्रह्ममुहूर्त में नित्य स्तोत्र पाठ से बुद्धि निर्मल होती है तथा पूरा दिन सकारात्मक ऊर्जा से परिपूर्ण रहता है।',
  },
};

export const VedicSageModal: React.FC<VedicSageModalProps> = ({
  isOpen,
  query,
  onClose,
  lang = 'english',
  onOpenQuoteBuilder,
}) => {
  if (!isOpen || !query) return null;

  // Match query keyword or fallback to Gita response
  const lowerQuery = query.toLowerCase();
  let responseData = SCRIPTURE_DATABASE['gita'];

  if (lowerQuery.includes('parikrama') || lowerQuery.includes('yatra') || lowerQuery.includes('vrindavan')) {
    responseData = SCRIPTURE_DATABASE['parikrama'];
  } else if (lowerQuery.includes('stotra') || lowerQuery.includes('path') || lowerQuery.includes('morning')) {
    responseData = SCRIPTURE_DATABASE['stotra'];
  }

  const handleCreateQuote = () => {
    if (onOpenQuoteBuilder) {
      onOpenQuoteBuilder({
        shloka: responseData.shloka,
        translation: lang === 'hindi' ? responseData.transHi : responseData.transEn,
        source: responseData.source,
      });
    }
  };

  return (
    <div className="vedic-sage-backdrop" onClick={onClose}>
      <div className="vedic-sage-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="vedic-sage-header">
          <div className="vedic-sage-brand">
            <Sparkles size={16} className="text-amber-400" />
            <span>{lang === 'hindi' ? 'वृंदोपनिषद वैदिक ऋषि AI' : 'Vrindopnishad Sage AI'}</span>
          </div>
          <button className="vedic-sage-close" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <div className="vedic-sage-query-banner">
          <Quote size={14} className="text-amber-400 shrink-0" />
          <span>"{query}"</span>
        </div>

        <div className="vedic-sage-body">
          <div className="scripture-shloka-box">
            <div className="shloka-header">
              <BookOpen size={15} className="text-amber-400" />
              <span>{lang === 'hindi' ? 'सत्याग्रही श्लोक प्रमाण' : 'Scriptural Citation'}</span>
            </div>
            <p className="shloka-text">"{responseData.shloka}"</p>
            <div className="shloka-citation">— {responseData.source}</div>
          </div>

          <div className="scripture-translation-box">
            <h3>{lang === 'hindi' ? 'भावार्थ (अर्थ)' : 'English Translation'}</h3>
            <p>{lang === 'hindi' ? responseData.transHi : responseData.transEn}</p>
          </div>

          <div className="scripture-explanation-box">
            <h3>{lang === 'hindi' ? 'आध्यात्मिक विश्लेषण' : 'Spiritual Wisdom Note'}</h3>
            <p>{lang === 'hindi' ? responseData.explanationHi : responseData.explanationEn}</p>
          </div>
        </div>

        <div className="vedic-sage-footer">
          <button className="sage-btn-secondary" onClick={handleCreateQuote}>
            <Share2 size={15} />
            <span>{lang === 'hindi' ? 'कोट कार्ड बनाएं' : 'Create Quote Graphics'}</span>
          </button>
          <a
            href="https://path.vrindopnishad.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="sage-btn-primary"
          >
            <span>{lang === 'hindi' ? 'सम्पूर्ण ग्रन्थ पढ़ें' : 'Read Full Scripture'}</span>
            <ExternalLink size={15} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default VedicSageModal;
