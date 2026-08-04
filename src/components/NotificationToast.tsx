import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface NotificationToastProps {
  isReady?: boolean;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({ isReady = true }) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [timeStr, setTimeStr] = useState<string>('now');

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
    }, 7500);

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
    <div className="notifications">
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
