import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export interface NotificationToastData {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  time: string;
}

export const NotificationToast: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationToastData[]>([]);

  useEffect(() => {
    const hours = new Date().getHours();
    let timeGreeting = 'Good Day';
    if (hours >= 5 && hours < 12) timeGreeting = 'Good Morning';
    else if (hours >= 12 && hours < 17) timeGreeting = 'Good Afternoon';
    else if (hours >= 17 && hours < 22) timeGreeting = 'Good Evening';

    const welcomeNotification: NotificationToastData = {
      id: 'welcome-1',
      name: 'Vrindopnishad Hub',
      description: `${timeGreeting}! Welcome to Vrindopnishad 🙏`,
      icon: '✨',
      color: '#00C9A7',
      time: 'Just now'
    };

    setNotifications([welcomeNotification]);

    const timer = setTimeout(() => {
      setNotifications([]);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  if (notifications.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 99999,
        maxWidth: '380px',
        width: 'calc(100% - 40px)',
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem'
      }}
    >
      <AnimatePresence>
        {notifications.map((item) => (
          <motion.div
            key={item.id}
            initial={{ scale: 0, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            style={{
              pointerEvents: 'auto',
              position: 'relative',
              width: '100%',
              borderRadius: '16px',
              padding: '0.9rem 1.1rem',
              background: 'var(--card-bg, rgba(255, 255, 255, 0.95))',
              border: '1px solid var(--card-border, rgba(15, 23, 42, 0.12))',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.12)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              cursor: 'pointer'
            }}
            whileHover={{ scale: 1.02 }}
          >
            <button
              onClick={() => removeNotification(item.id)}
              style={{
                position: 'absolute',
                top: '10px',
                right: '12px',
                background: 'none',
                border: 'none',
                color: 'var(--tertiary-color, #94a3b8)',
                fontSize: '1.2rem',
                lineHeight: 1,
                cursor: 'pointer'
              }}
              aria-label="Close notification"
            >
              &times;
            </button>

            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.75rem' }}>
              <div
                style={{
                  display: 'flex',
                  width: '38px',
                  height: '38px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '12px',
                  backgroundColor: item.color,
                  flexShrink: 0
                }}
              >
                <span style={{ fontSize: '1.15rem' }}>{item.icon}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', paddingRight: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', color: 'var(--text-color, #0f172a)' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>{item.name}</span>
                  <span style={{ margin: '0 0.3rem', opacity: 0.5 }}>·</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--tertiary-color, #64748b)' }}>{item.time}</span>
                </div>
                <p style={{ fontSize: '0.825rem', fontWeight: 400, color: 'var(--secondary-color, #475569)', margin: '0.15rem 0 0 0' }}>
                  {item.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotificationToast;
