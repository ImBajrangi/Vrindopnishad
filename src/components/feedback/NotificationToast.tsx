import React, { useEffect, useState, useCallback, ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export type ToastType = 'message' | 'success' | 'warning' | 'error';

export interface ToastOptions {
  title?: string;
  preserve?: boolean;
  action?: string;
  onAction?: () => void;
  onUndoAction?: () => void;
}

export interface ToastItem {
  id: number;
  text: string | ReactNode;
  title?: string;
  type: ToastType;
  timeStr?: string;
  measuredHeight?: number;
  preserve?: boolean;
  action?: string;
  onAction?: () => void;
  onUndoAction?: () => void;
}

let toastIdCounter = 0;

export const toastStore = {
  toasts: [] as ToastItem[],
  listeners: new Set<() => void>(),

  add(
    text: string | ReactNode,
    type: ToastType = 'success',
    opts?: ToastOptions
  ) {
    const id = ++toastIdCounter;
    const toast: ToastItem = {
      id,
      text,
      type,
      title: opts?.title || 'Vrindopnishad',
      timeStr: 'now',
      preserve: opts?.preserve,
      action: opts?.action,
      onAction: opts?.onAction,
      onUndoAction: opts?.onUndoAction,
    };

    this.toasts.push(toast);
    this.notify();
    return id;
  },

  remove(id: number) {
    this.toasts = this.toasts.filter((t) => t.id !== id);
    this.notify();
  },

  clear() {
    this.toasts = [];
    this.notify();
  },

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  },

  notify() {
    this.listeners.forEach((fn) => fn());
  }
};

export const useToasts = () => {
  return {
    message: useCallback((text: string | ReactNode, opts?: ToastOptions) => {
      return toastStore.add(text, 'message', opts);
    }, []),
    success: useCallback((text: string | ReactNode, opts?: ToastOptions) => {
      return toastStore.add(text, 'success', opts);
    }, []),
    warning: useCallback((text: string | ReactNode, opts?: ToastOptions) => {
      return toastStore.add(text, 'warning', opts);
    }, []),
    error: useCallback((text: string | ReactNode, opts?: ToastOptions) => {
      return toastStore.add(text, 'error', opts);
    }, []),
    remove: useCallback((id: number) => {
      toastStore.remove(id);
    }, []),
    clear: useCallback(() => {
      toastStore.clear();
    }, [])
  };
};

export const toast = {
  message: (text: string | ReactNode, opts?: ToastOptions) =>
    toastStore.add(text, 'message', opts),
  success: (text: string | ReactNode, opts?: ToastOptions) =>
    toastStore.add(text, 'success', opts),
  warning: (text: string | ReactNode, opts?: ToastOptions) =>
    toastStore.add(text, 'warning', opts),
  error: (text: string | ReactNode, opts?: ToastOptions) =>
    toastStore.add(text, 'error', opts),
  remove: (id: number) => toastStore.remove(id),
  clear: () => toastStore.clear()
};

// Subtle, low-friction periodic micro-cues
const PERIODIC_PULSES = [
  {
    title: 'Quote Studio',
    text: '4K Sanskrit Quote Studio is available',
    type: 'message' as ToastType,
    action: 'Open',
    target: '.sanctuary-experience-section'
  },
  {
    title: 'Vedic Oracle',
    text: 'Ask Vedic Sage AI for scriptural citations',
    type: 'message' as ToastType,
    action: 'Ask',
    target: '.vedic-ask-floating-container'
  },
  {
    title: 'Upanishad Academy',
    text: 'Katha Upanishad Chapter 2 unlocked',
    type: 'success' as ToastType,
    action: 'Read',
    target: '.bento-section-wrapper'
  }
];

interface NotificationToastProps {
  isReady?: boolean;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({ isReady = true }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [topOffset, setTopOffset] = useState<number>(96);

  // Dynamic vertical positioning relative to scroll & header state
  useEffect(() => {
    let lastScroll = 0;

    const handleScroll = () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll <= 0) {
        setTopOffset(92);
      } else if (currentScroll > lastScroll && currentScroll > 60) {
        setTopOffset(24);
      } else {
        setTopOffset(72);
      }

      lastScroll = currentScroll;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Synchronize with toastStore
  useEffect(() => {
    setToasts([...toastStore.toasts]);
    return toastStore.subscribe(() => {
      setToasts([...toastStore.toasts]);
    });
  }, []);

  // Expose global helper for live testing
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).vrindaToast = toast;
    }
  }, []);

  // Launch Clean, Direct, High-Status Onboarding Sequence
  useEffect(() => {
    if (!isReady) return;

    const timers: NodeJS.Timeout[] = [];

    // 1. Direct Welcome
    timers.push(
      setTimeout(() => {
        toast.success('Welcome to Vrindopnishad 🙏', {
          title: 'Vrindopnishad'
        });
      }, 500)
    );

    // 2. Direct Feature Cue (Subconscious Curiosity)
    timers.push(
      setTimeout(() => {
        toast.message('Spatial 432Hz Sanctuary recitations live', {
          title: 'Sanctuary',
          action: 'Listen',
          onAction: () => {
            const el = document.querySelector('.sanctuary-experience-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        });
      }, 1800)
    );

    // 3. Subtle Social Proof
    timers.push(
      setTimeout(() => {
        toast.message('14,200+ seekers connected in Satsang', {
          title: 'Community',
          action: 'Explore',
          onAction: () => {
            const el = document.querySelector('.story-section-wrapper');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        });
      }, 3200)
    );

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [isReady]);

  // Periodic Minimal Pulse (Every 75s, strictly non-intrusive)
  useEffect(() => {
    if (!isReady) return;

    let index = 0;
    const interval = setInterval(() => {
      // Only push if queue is empty
      if (toastStore.toasts.length === 0) {
        const item = PERIODIC_PULSES[index % PERIODIC_PULSES.length];
        index++;

        toastStore.add(item.text, item.type, {
          title: item.title,
          action: item.action,
          onAction: () => {
            const targetEl = document.querySelector(item.target);
            if (targetEl) {
              targetEl.scrollIntoView({ behavior: 'smooth' });
            }
          }
        });
      }
    }, 75000);

    return () => clearInterval(interval);
  }, [isReady]);

  // Sequential One-by-One Auto-Dismissal Engine
  useEffect(() => {
    if (isHovered || toasts.length === 0) return;

    const activeToast = toasts[toasts.length - 1];
    if (!activeToast || activeToast.preserve) return;

    const timer = setTimeout(() => {
      toastStore.remove(activeToast.id);
    }, 4500);

    return () => {
      clearTimeout(timer);
    };
  }, [toasts, isHovered]);

  const measureRef = (item: ToastItem) => (node: HTMLDivElement | null) => {
    if (node && item.measuredHeight == null) {
      item.measuredHeight = node.getBoundingClientRect().height;
      toastStore.notify();
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const lastVisibleCount = 3;
  const lastVisibleStart = Math.max(0, toasts.length - lastVisibleCount);
  const visibleToasts = toasts.slice(lastVisibleStart);

  const frontItem = toasts[toasts.length - 1];
  const frontHeight = frontItem?.measuredHeight || 64;

  const getStackStyle = (index: number, length: number) => {
    const offset = length - 1 - index;
    const isFront = offset === 0;

    if (isFront) {
      return {
        y: 0,
        scale: 1,
        zIndex: 100,
        opacity: 1,
        height: toasts[index]?.measuredHeight || 'auto'
      };
    }

    if (isHovered) {
      let translateY = 0;
      for (let i = length - 1; i > index; i--) {
        translateY += (toasts[i]?.measuredHeight || 64) + 10;
      }
      return {
        y: translateY,
        scale: 1,
        zIndex: 100 - offset,
        opacity: 1,
        height: toasts[index]?.measuredHeight || 'auto'
      };
    }

    // In collapsed stacked view
    return {
      y: offset * 11,
      scale: 1 - 0.045 * offset,
      zIndex: 100 - offset,
      opacity: Math.max(0, 1 - 0.2 * offset),
      height: frontHeight
    };
  };

  const totalExpandedHeight = visibleToasts.reduce((acc, t, idx) => {
    return acc + (t.measuredHeight || 64) + (idx > 0 ? 10 : 0);
  }, 0);

  const containerHeight = isHovered
    ? totalExpandedHeight
    : frontHeight + (Math.min(toasts.length - 1, 2) * 11);

  return (
    <div
      className="notifications"
      style={{
        position: 'fixed',
        top: `${topOffset}px`,
        right: '24px',
        left: 'auto',
        transform: 'none',
        zIndex: 10005,
        pointerEvents: 'none',
        maxWidth: '340px',
        width: 'calc(100vw - 48px)',
        transition: 'top 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: `${containerHeight}px`,
          transition: 'height 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <AnimatePresence>
          {toasts.map((item, index) => {
            const isVisible = index >= lastVisibleStart;
            if (!isVisible) return null;

            const stack = getStackStyle(index, toasts.length);

            return (
              <motion.div
                key={item.id}
                ref={measureRef(item)}
                className={`notification ${item.type}`}
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  left: 0,
                  pointerEvents: 'auto',
                  width: '100%',
                  zIndex: stack.zIndex,
                  overflow: 'hidden',
                  boxSizing: 'border-box',
                  boxShadow: '0 6px 24px rgba(0, 0, 0, 0.28), 0 1px 4px rgba(0, 0, 0, 0.18)'
                }}
                initial={{ scale: 0.85, opacity: 0, x: 20, y: 0 }}
                animate={{
                  scale: stack.scale,
                  opacity: stack.opacity,
                  x: 0,
                  y: stack.y,
                  height: stack.height,
                  transition: { type: 'spring', stiffness: 220, damping: 24, mass: 0.8 }
                }}
                exit={{
                  scale: 0.85,
                  opacity: 0,
                  x: 20,
                  y: 0,
                  transition: { duration: 0.2, ease: 'easeOut' }
                }}
                whileHover={{ scale: isHovered ? 1.015 : stack.scale }}
              >
                <button
                  className="notification-close"
                  onClick={() => toastStore.remove(item.id)}
                  aria-label="Close notification"
                >
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M1 1l10 10M11 1L1 11" />
                  </svg>
                </button>

                <div className="notification-header" style={{ padding: '8px 12px 2px' }}>
                  <div className="notification-app-icon" style={{ width: '16px', height: '16px' }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span className="notification-app-name" style={{ fontSize: '0.78rem', fontWeight: 600 }}>
                    {item.title || 'Vrindopnishad'}
                  </span>
                  <span className="notification-time" style={{ fontSize: '0.72rem', opacity: 0.6 }}>
                    {item.timeStr || 'now'}
                  </span>
                </div>

                <div className="notification-content" style={{ padding: '2px 12px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.82rem', lineHeight: '1.4', color: 'rgba(255, 255, 255, 0.92)' }}>
                    {item.text}
                  </span>

                  {item.action && (
                    <button
                      type="button"
                      onClick={() => {
                        item.onAction?.();
                        toastStore.remove(item.id);
                      }}
                      style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.14)',
                        borderRadius: '999px',
                        padding: '0.2rem 0.55rem',
                        fontSize: '0.74rem',
                        color: '#ffffff',
                        fontWeight: 650,
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.2rem',
                        transition: 'background 0.15s ease'
                      }}
                    >
                      {item.action} ➔
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default NotificationToast;
