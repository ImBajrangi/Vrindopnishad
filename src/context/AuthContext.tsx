import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { UserProfile, getCachedUser, setCachedUser, clearCachedUser } from '@/lib/authCache';

interface AuthContextType {
  user: UserProfile | null;
  isLoggedIn: boolean;
  isAuthModalOpen: boolean;
  authMode: 'signin' | 'register';
  openAuthModal: (mode?: 'signin' | 'register') => void;
  closeAuthModal: () => void;
  signIn: (email: string, password: string) => Promise<UserProfile>;
  register: (name: string, email: string, password: string) => Promise<UserProfile>;
  socialSignIn: (provider: 'google' | 'apple' | 'guest') => Promise<UserProfile>;
  signOut: () => void;
  triggerSuccessConfetti: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const triggerSuccessConfetti = () => {
  // Fire dual side cannons + fireworks cascade
  const duration = 3.5 * 1000;
  const animationEnd = Date.now() + duration;
  const colors = ['#f59e0b', '#fbbf24', '#3b82f6', '#10b981', '#0284c7', '#ea580c'];

  // Initial explosive burst center
  confetti({
    particleCount: 80,
    spread: 100,
    origin: { y: 0.6 },
    colors: colors,
    zIndex: 999999,
  });

  // Continuous side cannons
  const frame = () => {
    if (Date.now() > animationEnd) return;

    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      startVelocity: 60,
      origin: { x: 0, y: 0.7 },
      colors: colors,
      zIndex: 999999,
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      startVelocity: 60,
      origin: { x: 1, y: 0.7 },
      colors: colors,
      zIndex: 999999,
    });

    requestAnimationFrame(frame);
  };

  frame();
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => getCachedUser());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'register'>('signin');

  useEffect(() => {
    const cached = getCachedUser();
    if (cached) {
      setUser(cached);
    }
  }, []);

  const openAuthModal = (mode: 'signin' | 'register' = 'signin') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const handleAuthSuccess = (profile: UserProfile) => {
    setCachedUser(profile);
    setUser(profile);
    triggerSuccessConfetti();
  };

  const signIn = async (email: string, password: string): Promise<UserProfile> => {
    // Simulate network delay for ultra responsive smooth feel
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Basic validation check
    if (!email || !password) {
      throw new Error('Please enter both email and password.');
    }

    const userName = email.split('@')[0];
    const formattedName = userName.charAt(0).toUpperCase() + userName.slice(1);

    const profile: UserProfile = {
      id: 'usr_' + Date.now(),
      name: formattedName,
      email: email,
      signedInAt: new Date().toISOString(),
      provider: 'email',
      avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(email)}`,
    };

    handleAuthSuccess(profile);
    return profile;
  };

  const register = async (name: string, email: string, password: string): Promise<UserProfile> => {
    await new Promise((resolve) => setTimeout(resolve, 900));

    if (!name || !email || !password) {
      throw new Error('Please fill in all required fields.');
    }

    const profile: UserProfile = {
      id: 'usr_' + Date.now(),
      name: name,
      email: email,
      signedInAt: new Date().toISOString(),
      provider: 'email',
      avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}`,
    };

    handleAuthSuccess(profile);
    return profile;
  };

  const socialSignIn = async (provider: 'google' | 'apple' | 'guest'): Promise<UserProfile> => {
    await new Promise((resolve) => setTimeout(resolve, 600));

    let profile: UserProfile;

    if (provider === 'google') {
      profile = {
        id: 'usr_g_' + Date.now(),
        name: 'Vedic Seeker (Google)',
        email: 'seeker@vrindopnishad.in',
        signedInAt: new Date().toISOString(),
        provider: 'google',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      };
    } else if (provider === 'apple') {
      profile = {
        id: 'usr_a_' + Date.now(),
        name: 'Vedic Devotee (Apple)',
        email: 'devotee@apple.vrindopnishad.in',
        signedInAt: new Date().toISOString(),
        provider: 'apple',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
      };
    } else {
      profile = {
        id: 'usr_guest_' + Date.now(),
        name: 'Guest Pilgrimage Seeker',
        email: 'guest@vrindopnishad.in',
        signedInAt: new Date().toISOString(),
        provider: 'guest',
        avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250',
      };
    }

    handleAuthSuccess(profile);
    return profile;
  };

  const signOut = () => {
    clearCachedUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isAuthModalOpen,
        authMode,
        openAuthModal,
        closeAuthModal,
        signIn,
        register,
        socialSignIn,
        signOut,
        triggerSuccessConfetti,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
