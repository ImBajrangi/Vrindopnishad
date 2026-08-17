import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ScrollBlurTextProps {
  text: string;
  effect?: 1 | 2 | 3 | 4;
  className?: string;
  style?: React.CSSProperties;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div' | 'span';
  stagger?: number;
  scrub?: boolean | number;
  start?: string;
  end?: string;
}

export const ScrollBlurText: React.FC<ScrollBlurTextProps> = ({
  text,
  effect = 4,
  className = '',
  style = {},
  as: Component = 'div',
  stagger = 0.04,
  scrub = 0.5,
  start = 'top bottom-=15%',
  end = 'bottom center+=15%'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const words = text.split(' ').map((word, i, arr) => ({
    word,
    needsSpace: i !== arr.length - 1
  }));

  useEffect(() => {
    if (!containerRef.current) return;

    const targetNodes = containerRef.current.querySelectorAll('.scroll-blur-word');
    if (!targetNodes.length) return;

    let fromVars: gsap.TweenVars = {};
    let toVars: gsap.TweenVars = {};

    switch (effect) {
      case 1:
        // Dark to Bright Unblur
        fromVars = {
          filter: 'blur(10px) brightness(0%)',
          willChange: 'filter'
        };
        toVars = {
          filter: 'blur(0px) brightness(100%)',
          ease: 'none',
          stagger
        };
        break;
      case 2:
        // Subtle Depth Blur
        fromVars = {
          filter: 'blur(10px) brightness(30%)',
          willChange: 'filter'
        };
        toVars = {
          filter: 'blur(0px) brightness(100%)',
          ease: 'none',
          stagger
        };
        break;
      case 3:
        // Stretch & Unblur Scale
        fromVars = {
          scaleY: 0.1,
          scaleX: 1.8,
          filter: 'blur(10px) brightness(50%)',
          willChange: 'filter, transform'
        };
        toVars = {
          scaleY: 1,
          scaleX: 1,
          filter: 'blur(0px) brightness(100%)',
          ease: 'none',
          stagger
        };
        break;
      case 4:
      default:
        // Effect 4: Word Skew & Blur Slide (Codrops)
        fromVars = {
          opacity: 0,
          skewX: -20,
          filter: 'blur(8px)',
          willChange: 'filter, transform, opacity'
        };
        toVars = {
          opacity: 1,
          skewX: 0,
          filter: 'blur(0px)',
          ease: 'sine.out',
          stagger
        };
        break;
    }

    const anim = gsap.fromTo(targetNodes, fromVars, {
      ...toVars,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom-=10%',
        toggleActions: 'play none none none',
        once: true
      }
    });

    return () => {
      anim.kill();
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === containerRef.current) st.kill();
      });
    };
  }, [text, effect, stagger, scrub, start, end]);

  return (
    <Component
      ref={containerRef as any}
      className={`scroll-blur-container ${className}`}
      style={{
        display: 'inline-flex',
        flexWrap: 'wrap',
        gap: '0.28em',
        lineHeight: '1.25',
        ...style
      }}
    >
      {words.map((item, idx) => (
        <span
          key={idx}
          className="scroll-blur-word"
          style={{
            display: 'inline-block',
            transformOrigin: 'left center',
            whiteSpace: 'pre'
          }}
        >
          {item.word}
          {item.needsSpace ? ' ' : ''}
        </span>
      ))}
    </Component>
  );
};

export default ScrollBlurText;
