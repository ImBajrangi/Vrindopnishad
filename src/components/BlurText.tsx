import { motion, Transition } from 'framer-motion';
import React, { useEffect, useRef, useState, useMemo } from 'react';

type BlurTextProps = {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  threshold?: number;
  rootMargin?: string;
  animationFrom?: Record<string, string | number>;
  animationTo?: Array<Record<string, string | number>>;
  easing?: (t: number) => number;
  onAnimationComplete?: () => void;
  stepDuration?: number;
  style?: React.CSSProperties;
};

const buildKeyframes = (
  from: Record<string, string | number>,
  steps: Array<Record<string, string | number>>
): Record<string, Array<string | number>> => {
  const keys = Array.from(new Set<string>([...Object.keys(from), ...steps.flatMap(s => Object.keys(s))]));

  const keyframes: Record<string, Array<string | number>> = {};
  keys.forEach(k => {
    let lastVal: string | number = from[k] ?? 0;
    keyframes[k] = [
      lastVal,
      ...steps.map(s => {
        if (s[k] !== undefined) {
          lastVal = s[k];
        }
        return lastVal;
      })
    ];
  });
  return keyframes;
};

const BlurText: React.FC<BlurTextProps> = ({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = (t: number) => t,
  onAnimationComplete,
  stepDuration = 0.35,
  style
}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current as Element);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const defaultFrom = useMemo(
    () =>
      direction === 'top' ? { filter: 'blur(10px)', opacity: 0, y: -16 } : { opacity: 0, y: 16, filter: 'blur(10px)' },
    [direction]
  );

  const defaultTo = useMemo(
    () => [
      {
        opacity: 0.6,
        filter: 'blur(5px)',
        y: direction === 'top' ? 3 : -3
      },
      { opacity: 1, y: 0, filter: 'blur(0px)' }
    ],
    [direction]
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;

  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) => (stepCount === 1 ? 0 : i / (stepCount - 1)));

  // Split by newlines first to preserve verse lines
  const lines = text.split('\n');

  let globalIndex = 0;
  const totalElementsCount = lines.reduce(
    (acc, line) => acc + (animateBy === 'words' ? line.split(' ').filter(Boolean).length : line.length),
    0
  );

  return (
    <div ref={ref} className={className} style={{ textAlign: 'center', width: '100%', ...style }}>
      {lines.map((lineText, lineIdx) => {
        const elements = animateBy === 'words' ? lineText.split(' ').filter(Boolean) : lineText.split('');

        return (
          <div
            key={lineIdx}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              marginBottom: lineIdx < lines.length - 1 ? '0.4em' : 0
            }}
          >
            {elements.map((segment, wordIdx) => {
              const currentIndex = globalIndex++;
              const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);

              const spanTransition: Transition = {
                duration: totalDuration,
                times,
                delay: (currentIndex * delay) / 1000,
                ease: easing
              };

              return (
                <motion.span
                  key={wordIdx}
                  initial={fromSnapshot}
                  animate={inView ? animateKeyframes : fromSnapshot}
                  transition={spanTransition}
                  onAnimationComplete={currentIndex === totalElementsCount - 1 ? onAnimationComplete : undefined}
                  style={{
                    display: 'inline-block',
                    willChange: 'transform, filter, opacity'
                  }}
                >
                  {segment === ' ' ? '\u00A0' : segment}
                  {animateBy === 'words' && wordIdx < elements.length - 1 && '\u00A0'}
                </motion.span>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default BlurText;
