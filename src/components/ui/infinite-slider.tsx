import React from 'react';
import { cn } from '../../lib/utils';
import './infinite-slider.css';

interface InfiniteSliderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  direction?: 'horizontal' | 'vertical';
  speed?: number;
  speedOnHover?: number;
  className?: string;
}

export const InfiniteSlider: React.FC<InfiniteSliderProps> = ({
  children,
  direction = 'vertical',
  speed = 30,
  speedOnHover,
  className,
  ...props
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const duration = isHovered && speedOnHover ? speedOnHover : speed;

  return (
    <div
      className={cn('relative overflow-hidden', direction === 'vertical' ? 'flex flex-col' : 'flex flex-row', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <div
        className={cn(
          'infinite-slider-track flex gap-6 shrink-0',
          direction === 'vertical' ? 'flex-col animate-vertical-scroll' : 'flex-row animate-horizontal-scroll'
        )}
        style={{
          animationDuration: `${duration}s`
        }}
      >
        {children}
        {children}
      </div>
    </div>
  );
};

export default InfiniteSlider;
