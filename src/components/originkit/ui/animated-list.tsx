"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export interface AnimatedListProps {
  className?: string;
  children: React.ReactNode;
  delay?: number;
}

export const AnimatedList = React.memo(
  ({ className = "", children, delay = 1000 }: AnimatedListProps) => {
    const [index, setIndex] = useState(0);
    const childrenArray = React.Children.toArray(children);

    useEffect(() => {
      if (index < childrenArray.length - 1) {
        const timeout = setTimeout(() => {
          setIndex((prevIndex) => prevIndex + 1);
        }, delay);

        return () => clearTimeout(timeout);
      }
    }, [index, delay, childrenArray.length]);

    const itemsToShow = useMemo(
      () => childrenArray.slice(0, index + 1).reverse(),
      [index, childrenArray]
    );

    return (
      <div 
        className={`animated-list-container ${className}`}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          width: '100%',
          maxHeight: '100%',
          overflowY: 'auto'
        }}
      >
        <AnimatePresence>
          {itemsToShow.map((item) => (
            <AnimatedListItem key={(item as React.ReactElement).key || Math.random()}>
              {item}
            </AnimatedListItem>
          ))}
        </AnimatePresence>
      </div>
    );
  }
);

AnimatedList.displayName = "AnimatedList";

export function AnimatedListItem({ children }: { children: React.ReactNode }) {
  const animations = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1, originY: 0 },
    exit: { scale: 0, opacity: 0 },
    transition: { type: "spring", stiffness: 350, damping: 25 },
  };

  return (
    <motion.div {...animations} style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      {children}
    </motion.div>
  );
}

// Sample Notification Data
export interface NotificationItem {
  name: string;
  description: string;
  icon: string;
  color: string;
  time: string;
}

const defaultNotifications: NotificationItem[] = [
  {
    name: "Payment received",
    description: "Vrinda Sacred Offerings",
    time: "15m ago",
    icon: "💸",
    color: "#00C9A7",
  },
  {
    name: "User signed up",
    description: "Vrindopnishad Path",
    time: "10m ago",
    icon: "👤",
    color: "#FFB800",
  },
  {
    name: "New message",
    description: "Sant-Vaani Discourse",
    time: "5m ago",
    icon: "💬",
    color: "#FF3D71",
  },
  {
    name: "New event",
    description: "Brij Dham 84 Kos Yatra",
    time: "2m ago",
    icon: "🗞️",
    color: "#1E86FF",
  },
];

const notifications = Array.from({ length: 8 }, () => defaultNotifications).flat();

export const NotificationCard: React.FC<NotificationItem> = ({
  name,
  description,
  icon,
  color,
  time,
}) => {
  return (
    <div
      style={{
        position: 'relative',
        margin: '0 auto',
        minHeight: 'fit-content',
        width: '100%',
        maxWidth: '420px',
        cursor: 'pointer',
        overflow: 'hidden',
        borderRadius: '16px',
        padding: '1rem 1.25rem',
        background: 'var(--card-bg, rgba(255, 255, 255, 0.95))',
        border: '1px solid var(--card-border, rgba(15, 23, 42, 0.12))',
        boxShadow: 'var(--shadow-md, 0 4px 12px rgba(0, 0, 0, 0.08))',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.03)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.85rem' }}>
        <div
          style={{
            display: 'flex',
            width: '42px',
            height: '42px',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '12px',
            backgroundColor: color,
            flexShrink: 0
          }}
        >
          <span style={{ fontSize: '1.25rem' }}>{icon}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', color: 'var(--text-color, #0f172a)' }}>
            <span style={{ fontSize: '0.95rem', fontWeight: 600 }}>{name}</span>
            <span style={{ margin: '0 0.35rem', opacity: 0.5 }}>·</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--tertiary-color, #64748b)' }}>{time}</span>
          </div>
          <p style={{ fontSize: '0.85rem', fontWeight: 400, color: 'var(--secondary-color, #475569)', margin: '0.2rem 0 0 0' }}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export function AnimatedListDemo({ className = "" }: { className?: string }) {
  return (
    <div
      className={className}
      style={{
        position: 'relative',
        display: 'flex',
        height: '480px',
        width: '100%',
        flexDirection: 'column',
        overflow: 'hidden',
        padding: '0.5rem',
      }}
    >
      <AnimatedList>
        {notifications.map((item, idx) => (
          <NotificationCard {...item} key={idx} />
        ))}
      </AnimatedList>

      {/* Subtle fade overlay at bottom */}
      <div
        style={{
          pointerEvents: 'none',
          position: 'absolute',
          inset: 'auto 0 0 0',
          height: '25%',
          background: 'linear-gradient(to top, var(--bg-color, #ffffff) 0%, transparent 100%)',
        }}
      />
    </div>
  );
}

export default AnimatedListDemo;
