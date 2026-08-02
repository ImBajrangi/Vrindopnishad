import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface OnScrollTypographyProps {
  text: string;
  effect?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  style?: React.CSSProperties;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div' | 'span';
  stagger?: number;
  scrub?: boolean | number;
  start?: string;
  end?: string;
}

export const OnScrollTypography: React.FC<OnScrollTypographyProps> = ({
  text,
  effect = 6,
  className = '',
  style = {},
  as: Component = 'div',
  stagger = 0.03,
  scrub = 0.6,
  start = 'top bottom-=10%',
  end = 'bottom center+=10%'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const chars = text.split('').map((char, idx) => ({
    char: char === ' ' ? '\u00A0' : char,
    isSpace: char === ' '
  }));

  useEffect(() => {
    if (!containerRef.current) return;

    const charNodes = containerRef.current.querySelectorAll('.scroll-char');
    if (!charNodes.length) return;

    let fromVars: gsap.TweenVars = {};
    let toVars: gsap.TweenVars = {};

    switch (effect) {
      case 1:
        // Effect 1: Random Z-Rotation & Scale
        fromVars = {
          willChange: 'opacity, transform',
          opacity: 0,
          scale: 0.6,
          rotationZ: () => gsap.utils.random(-20, 20)
        };
        toVars = {
          ease: 'power4.out',
          opacity: 1,
          scale: 1,
          rotationZ: 0,
          stagger: 0.04
        };
        break;
      case 2:
        // Effect 2: Vertical Elastic Stretch Drop
        fromVars = {
          willChange: 'opacity, transform',
          opacity: 0,
          yPercent: 120,
          scaleY: 2.3,
          scaleX: 0.7,
          transformOrigin: '50% 0%'
        };
        toVars = {
          duration: 1,
          ease: 'back.out(2)',
          opacity: 1,
          yPercent: 0,
          scaleY: 1,
          scaleX: 1,
          stagger: 0.03
        };
        break;
      case 3:
        // Effect 3: Vertical Curtain Unroll
        fromVars = {
          willChange: 'transform, opacity',
          transformOrigin: '50% 0%',
          scaleY: 0,
          opacity: 0
        };
        toVars = {
          ease: 'power2.out',
          opacity: 1,
          scaleY: 1,
          stagger: 0.03
        };
        break;
      case 4:
        // Effect 4: Center Horizontal Explosion Assemble
        fromVars = {
          willChange: 'opacity, transform',
          opacity: 0,
          x: (index: number) => 120 * (index - chars.length / 2)
        };
        toVars = {
          ease: 'power1.inOut',
          opacity: 1,
          x: 0,
          stagger: {
            grid: 'auto',
            from: 'center'
          }
        };
        break;
      case 5:
        // Effect 5: Random Particle Fly-In
        fromVars = {
          willChange: 'opacity, transform',
          opacity: 0,
          xPercent: () => gsap.utils.random(-200, 200),
          yPercent: () => gsap.utils.random(-150, 150)
        };
        toVars = {
          ease: 'power1.inOut',
          opacity: 1,
          xPercent: 0,
          yPercent: 0,
          stagger: { each: 0.04, from: 'random' }
        };
        break;
      case 6:
      default:
        // Effect 6: 3D Flip In (Perspective 2000, RotationX -90)
        fromVars = {
          willChange: 'opacity, transform',
          opacity: 0,
          rotationX: -90,
          yPercent: 50,
          transformOrigin: '50% 100%'
        };
        toVars = {
          ease: 'power2.out',
          opacity: 1,
          rotationX: 0,
          yPercent: 0,
          stagger
        };
        break;
    }

    const anim = gsap.fromTo(charNodes, fromVars, {
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
  }, [text, effect, stagger, scrub, start, end, chars.length]);

  return (
    <Component
      ref={containerRef as any}
      className={`onscroll-typography-container ${className}`}
      style={{
        display: 'inline-flex',
        flexWrap: 'wrap',
        perspective: '2000px',
        lineHeight: '1.2',
        ...style
      }}
    >
      {chars.map((item, idx) => (
        <span
          key={idx}
          className="scroll-char"
          style={{
            display: 'inline-block',
            transformStyle: 'preserve-3d',
            whiteSpace: item.isSpace ? 'pre' : 'normal'
          }}
        >
          {item.char}
        </span>
      ))}
    </Component>
  );
};

export default OnScrollTypography;
