import React, { useEffect, useState } from 'react';

export const OfflineOverlay: React.FC = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 999999,
        background: '#030509',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        boxSizing: 'border-box'
      }}
    >
      <div
        style={{
          maxWidth: '440px',
          width: '100%',
          padding: '2.5rem 2rem',
          borderRadius: '24px',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          backdropFilter: 'blur(16px)',
          textAlign: 'center',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)'
        }}
      >
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'rgba(229, 185, 90, 0.1)',
            border: '1px solid rgba(229, 185, 90, 0.3)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.5rem',
            boxShadow: '0 0 25px rgba(229, 185, 90, 0.2)'
          }}
        >
          <img
            src="/v-logo-rounded/official-logo.svg"
            alt="Vrindopnishad Logo"
            style={{ width: '48px', height: '48px', objectFit: 'contain' }}
          />
        </div>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>
          Offline Mode
        </h2>
        <p style={{ fontSize: '0.95rem', color: 'rgba(255, 255, 255, 0.65)', lineHeight: 1.6, marginBottom: '1.8rem' }}>
          You are currently disconnected from the internet. Please check your network connection to experience full sanctuary updates.
        </p>
        <button
          onClick={() => window.location.reload()}
          style={{
            padding: '0.75rem 1.75rem',
            borderRadius: '999px',
            background: 'linear-gradient(135deg, #e7c354 0%, #c49929 100%)',
            color: '#000000',
            fontWeight: 700,
            fontSize: '0.9rem',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(231, 195, 84, 0.3)'
          }}
        >
          Retry Connection ↻
        </button>
      </div>
    </div>
  );
};
