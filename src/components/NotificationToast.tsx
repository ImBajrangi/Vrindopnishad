import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface NotificationToastProps {
  isReady?: boolean;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({ isReady = true }) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [timeStr, setTimeStr] = useState<string>('now');
  const [topOffset, setTopOffset] = useState<number>(95);

  // Dynamic vertical response relative to header state and available free space
  useEffect(() => {
    let lastScroll = 0;

    const handleScroll = () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll <= 0) {
        setTopOffset(95); // Default top bar space
      } else if (currentScroll > lastScroll && currentScroll > 60) {
        setTopOffset(18); // Header hidden -> smoothly glides up into free top space!
      } else {
        setTopOffset(76); // Compact scrolled header
      }

      lastScroll = currentScroll;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isReady) return;

    // Small delay after loader finishes so entry is smooth & clear
    const showTimer = setTimeout(() => {
      const hours = new Date().getHours();
      let timeGreeting = 'Good Day';
      if (hours >= 5 && hours < 12) timeGreeting = 'Good Morning';
      else if (hours >= 12 && hours < 17) timeGreeting = 'Good Afternoon';
      else if (hours >= 17 && hours < 22) timeGreeting = 'Good Evening';

      setToastMessage(`${timeGreeting}! Welcome to Vrindopnishad 🙏`);
      setTimeStr('now');
    }, 400);

    const autoHideTimer = setTimeout(() => {
      setToastMessage(null);
    }, 8000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(autoHideTimer);
    };
  }, [isReady]);

  const animations = {
    initial: { scale: 0.85, opacity: 0, y: -16 },
    animate: { scale: 1, opacity: 1, y: 0, originY: 0 },
    exit: { scale: 0.85, opacity: 0, y: -16 },
    transition: { type: "spring", stiffness: 160, damping: 20, mass: 0.9 },
  };

  return (
    <div 
      className="notifications"
      style={{
        top: `${topOffset}px`,
        transition: 'top 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <AnimatePresence mode="wait">
        {toastMessage && (
          <motion.div
            key="vrinda-toast-item"
            className="notification success"
            style={{ position: 'relative', pointerEvents: 'auto', width: '100%' }}
            {...animations}
            whileHover={{ scale: 1.02 }}
          >
            <button
              className="notification-close"
              onClick={() => setToastMessage(null)}
              aria-label="Close notification"
            >
              &times;
            </button>

            <div className="notification-header">
              <div className="notification-app-icon">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <span className="notification-app-name">Vrindopnishad</span>
              <span className="notification-time">{timeStr}</span>
            </div>

            <div className="notification-content">
              <span>{toastMessage}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationToast;
