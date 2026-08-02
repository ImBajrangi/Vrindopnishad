import { useEffect } from 'react';
import gsap from 'gsap';

declare global {
  interface Window {
    Splitting?: (options?: any) => any;
  }
}

export const useScrollTextEffects = () => {
  useEffect(() => {
    // Helper to ensure text elements are split into words & chars
    const prepareSplitting = () => {
      const selectors = [
        '.hx-6',
        '.hx-13',
        '[data-effect10]',
        '[data-effect22]',
        '[data-effect28]',
        '[data-blur-text]'
      ];

      selectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
          if (!el.hasAttribute('data-splitting')) {
            el.setAttribute('data-splitting', '');
          }

          // Inject .hx__select element for hx-13 if missing
          if (el.classList.contains('hx-13') && !el.querySelector('.hx__select')) {
            const selectSpan = document.createElement('span');
            selectSpan.className = 'hx__select';
            el.appendChild(selectSpan);
          }

          // Fallback split if Splitting library isn't on window
          if (!el.querySelector('.char') && !el.querySelector('.word')) {
            const content = el.textContent || '';
            const words = content.split(' ');
            el.innerHTML = words
              .map(
                w =>
                  `<span class="word">${w
                    .split('')
                    .map(c => `<span class="char">${c}</span>`)
                    .join('')}</span>`
              )
              .join(' ');
            if (el.classList.contains('hx-13') && !el.querySelector('.hx__select')) {
              const selectSpan = document.createElement('span');
              selectSpan.className = 'hx__select';
              el.appendChild(selectSpan);
            }
          }
        });
      });

      if (typeof window !== 'undefined' && window.Splitting) {
        try {
          window.Splitting();
        } catch (e) {
          console.warn('Splitting execution fallback used', e);
        }
      }
    };

    prepareSplitting();

    // Effect 10: Lucid Dreaming Diaries (Blur character reveal)
    const animateLucidDreaming = (el: Element) => {
      const chars = el.querySelectorAll('.char');
      if (!chars.length) return;
      gsap.killTweensOf(chars);
      gsap.fromTo(
        chars,
        { opacity: 0, filter: 'blur(16px)' },
        {
          duration: 0.6,
          ease: 'power2.out',
          opacity: 1,
          filter: 'blur(0px)',
          stagger: { each: 0.03, from: 'random' },
          onComplete: () => {
            gsap.set(chars, { opacity: 1, filter: 'none' });
          }
        }
      );
    };

    // Effect 22: Dance into Existence Animation (3D Scatter & Assembly)
    const animateDance = (el: Element) => {
      const words = Array.from(el.querySelectorAll('.word'));
      words.forEach(word => {
        const chars = Array.from(word.querySelectorAll('.char'));
        const charsTotal = chars.length;
        if (!charsTotal) return;

        gsap.killTweensOf(chars);

        chars.forEach((char, position) => {
          const factor =
            position < Math.ceil(charsTotal / 2)
              ? position
              : Math.ceil(charsTotal / 2) -
                Math.abs(Math.floor(charsTotal / 2) - position) -
                1;
          const x =
            (charsTotal % 2
              ? Math.abs(Math.ceil(charsTotal / 2) - 1 - factor)
              : Math.abs(Math.ceil(charsTotal / 2) - factor)) *
            120 *
            (position < charsTotal / 2 ? -1 : 1);
          const y = factor * 40;
          const rotationZ =
            position < charsTotal / 2
              ? Math.abs(factor - charsTotal / 2) * 6
              : -1 * Math.abs(factor - charsTotal / 2) * 6;

          const parent = char.parentNode as HTMLElement;
          if (parent) gsap.set(parent, { perspective: 1000 });

          gsap.set(char, {
            willChange: 'transform, opacity',
            x,
            y,
            rotationY: -180,
            rotationZ,
            opacity: 0,
            scale: 0.7
          });
        });

        gsap.to(chars, {
          duration: 1.0,
          ease: 'power2.out',
          x: 0,
          y: 0,
          rotationZ: 0,
          rotationY: 0,
          opacity: 1,
          scale: 1,
          stagger: {
            amount: 0.3,
            from: 'center'
          },
          onComplete: () => {
            gsap.set(chars, { opacity: 1, transform: 'none', filter: 'none' });
          }
        });
      });
    };

    // Effect 28: Liberation Animation
    const animateLiberation = (el: Element) => {
      const words = Array.from(el.querySelectorAll('.word'));
      words.forEach(word => {
        const chars = Array.from(word.querySelectorAll('.char'));
        const charsTotal = chars.length;
        if (!charsTotal) return;

        gsap.killTweensOf(chars);

        chars.forEach((char, position) => {
          const factor =
            position < Math.ceil(charsTotal / 2)
              ? position
              : Math.ceil(charsTotal / 2) -
                Math.abs(Math.floor(charsTotal / 2) - position) -
                1;

          const scale = gsap.utils.mapRange(
            0,
            Math.ceil(charsTotal / 2),
            0.6,
            1.6,
            factor
          );
          const y = gsap.utils.mapRange(
            0,
            Math.ceil(charsTotal / 2),
            0,
            40,
            factor
          );
          const rotation =
            position < charsTotal / 2
              ? gsap.utils.mapRange(
                  0,
                  Math.ceil(charsTotal / 2),
                  -3,
                  0,
                  factor
                )
              : gsap.utils.mapRange(
                  0,
                  Math.ceil(charsTotal / 2),
                  0,
                  3,
                  factor
                );

          gsap.set(char, {
            transformOrigin: '50% 100%',
            scale,
            y,
            rotation,
            filter: 'blur(10px) opacity(0)'
          });
        });

        gsap.to(chars, {
          duration: 0.75,
          ease: 'power2.inOut',
          y: 0,
          rotation: 0,
          scale: 1,
          filter: 'blur(0px) opacity(1)',
          stagger: {
            amount: 0.12,
            from: 'center'
          },
          onComplete: () => {
            gsap.set(chars, { opacity: 1, transform: 'none', filter: 'none' });
          }
        });
      });
    };

    // Blur Text Effect - Word by word skew and blur slide
    const animateBlurText = (el: Element) => {
      const words = el.querySelectorAll('.word');
      if (!words.length) return;
      gsap.killTweensOf(words);
      gsap.fromTo(
        words,
        { opacity: 0, skewX: -15, filter: 'blur(8px)' },
        {
          duration: 0.6,
          ease: 'sine.out',
          opacity: 1,
          skewX: 0,
          filter: 'blur(0px)',
          stagger: 0.03,
          onComplete: () => {
            gsap.set(words, { opacity: 1, transform: 'none', filter: 'none' });
          }
        }
      );
    };

    // hx-6 Dynamics effect
    const animateDynamics = (el: Element) => {
      const chars = el.querySelectorAll('.char');
      const tl = gsap.timeline({ defaults: { duration: 0.1, ease: 'sine' } });
      if (chars.length > 0) {
        tl.to(chars, {
          stagger: (pos, _, arr) => 0.04 * (arr.length - 1 - pos),
          opacity: 0.2
        }).to(chars, {
          stagger: pos => 0.15 + 0.04 * pos,
          opacity: 1
        });
      }
      tl.fromTo(
        el,
        { '--after-width': '0%' },
        { duration: 0.8, ease: 'power4.out', '--after-width': '105%' },
        '<'
      );
    };

    // hx-13 Reprehensible effect
    const animateReprehensible = (el: Element) => {
      const selectMarker = el.querySelector('.hx__select');
      const chars = el.querySelectorAll('.char');
      const glowColor =
        getComputedStyle(document.documentElement)
          .getPropertyValue('--hx13-glow-color')
          .trim() || '#1a73e8';
      const tl = gsap.timeline({
        defaults: { duration: 0.4, ease: 'power1.inOut' }
      });

      if (chars.length) {
        tl.fromTo(
          chars,
          { filter: `drop-shadow(0px 0px 0px ${glowColor})` },
          { stagger: 0.03, filter: `drop-shadow(0px 0px 20px ${glowColor})` }
        );
      }
      if (selectMarker) {
        tl.to(
          selectMarker,
          { duration: 0.8, ease: 'expo', '--select-width': '103%' },
          0
        );
      }
    };

    // IntersectionObserver to trigger animations ONCE when elements scroll into view
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -30px 0px' };
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const el = entry.target as HTMLElement;
        if (entry.isIntersecting && !el.dataset.animated) {
          el.dataset.animated = 'true';
          if (el.classList.contains('hx-6')) animateDynamics(el);
          else if (el.classList.contains('hx-13')) animateReprehensible(el);
          else if (el.hasAttribute('data-effect10')) animateLucidDreaming(el);
          else if (el.hasAttribute('data-effect22')) animateDance(el);
          else if (el.hasAttribute('data-effect28')) animateLiberation(el);
          else if (el.hasAttribute('data-blur-text')) animateBlurText(el);

          // Unobserve so that once revealed, it STAYS VISIBLE PERMANENTLY!
          observer.unobserve(el);
        }
      });
    }, observerOptions);

    const observeAll = () => {
      const selectors = [
        '.hx-6',
        '.hx-13',
        '[data-effect10]',
        '[data-effect22]',
        '[data-effect28]',
        '[data-blur-text]'
      ];
      selectors.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => observer.observe(el));
      });
    };

    const timer = setTimeout(() => {
      prepareSplitting();
      observeAll();
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);
};
