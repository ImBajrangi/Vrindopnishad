import React from 'react';
import ConsensysMegaNav from './ConsensysMegaNav';

interface HeaderProps {
  onOpenTools: () => void;
  onOpenNavMenu?: () => void;
  onOpenAuth?: (mode?: 'signin' | 'register') => void;
  lang: 'english' | 'hindi';
  onLanguageChange: (lang: 'english' | 'hindi') => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenTools,
  onOpenNavMenu,
  onOpenAuth,
  lang,
  onLanguageChange
}) => {
  return (
    <ConsensysMegaNav
      lang={lang}
      onLanguageChange={onLanguageChange}
      onOpenNavMenu={onOpenNavMenu}
      onOpenAuth={onOpenAuth}
    />
  );
};

export default Header;
