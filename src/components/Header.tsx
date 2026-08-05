import React from 'react';
import ConsensysMegaNav from './ConsensysMegaNav';

interface HeaderProps {
  onOpenTools: () => void;
  onOpenNavMenu?: () => void;
  lang: 'english' | 'hindi';
  onLanguageChange: (lang: 'english' | 'hindi') => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenTools,
  onOpenNavMenu,
  lang,
  onLanguageChange
}) => {
  return (
    <ConsensysMegaNav
      lang={lang}
      onLanguageChange={onLanguageChange}
      onOpenNavMenu={onOpenNavMenu}
    />
  );
};
