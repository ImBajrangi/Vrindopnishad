import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export const NotificationToast: React.FC = () => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [timeStr, setTimeStr] = useState<string>('now');

  useEffect(() => {
    const hours = new Date().getHours();
    let timeGreeting = 'Good Day';
    if (hours >= 5 && hours < 12) timeGreeting = 'Good Morning';
    else if (hours >= 12 && hours < 17) timeGreeting = 'Good Afternoon';
    else if (hours >= 17 && hours < 22) timeGreeting = 'Good Evening';

    setToastMessage(`${timeGreeting}! Welcome to Vrindopnishad 🙏`);
    setTimeStr('now');

    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  const animations = {
    initial: { scale: 0.4, opacity: 0, y: 20 },
    animate: { scale: 1, opacity: 1, y: 0 },
    exit: { scale: 0.4, opacity: 0, y: 20 },
    transition: { type: "spring", stiffness: 140, damping: 18, mass: 0.9 },
  };

  return (
    <div 
      className="notifications-center-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 2147483647,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        padding: '1.5rem'
      }}
    >
      <AnimatePresence mode="wait">
        {toastMessage && (
          <motion.div 
            key="vrinda-center-toast"
            className="notification success" 
            style={{ 
              position: 'relative', 
              pointerEvents: 'auto', 
              width: '100%',
              maxWidth: '380px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.35)'
            }}
            {...animations}
            whileHover={{ scale: 1.04 }}
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
