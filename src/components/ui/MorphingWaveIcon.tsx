import React from 'react';
import './MorphingWaveIcon.css';

interface MorphingWaveIconProps {
  active: boolean;
  className?: string;
  size?: number;
  color?: string;
}

export const MorphingWaveIcon: React.FC<MorphingWaveIconProps> = ({
  active,
  className = '',
  size = 20,
  color = 'currentColor'
}) => {
  return (
    <div
      className={`morphing-wave-icon-container ${active ? 'is-active' : 'is-inactive'} ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        color: color
      }}
      aria-hidden="true"
    >
      <div className="wave-bars-wrapper">
        <span className="wave-bar bar-1"></span>
        <span className="wave-bar bar-2"></span>
        <span className="wave-bar bar-3"></span>
        <span className="wave-bar bar-4"></span>
      </div>
    </div>
  );
};

export default MorphingWaveIcon;
