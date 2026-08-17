import React, { useState, useRef, useEffect } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Confetti, ConfettiRef } from '@/components/ui/confetti';
import { Button } from '@/components/ui/button';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: 'english' | 'hindi';
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, lang = 'english' }) => {
  const { user, isLoggedIn, authMode, signIn, register, socialSignIn, signOut, triggerSuccessConfetti } = useAuth();

  const [mode, setMode] = useState<'signin' | 'register'>(authMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const confettiRef = useRef<ConfettiRef>(null);

  useEffect(() => {
    setMode(authMode);
    setError('');
    setSuccessMsg('');
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [authMode, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    try {
      if (mode === 'register') {
        if (!name.trim()) throw new Error('Please enter your full name.');
        if (!email.trim()) throw new Error('Please enter a valid email address.');
        if (password.length < 6) throw new Error('Password must be at least 6 characters.');
        if (password !== confirmPassword) throw new Error('Passwords do not match.');

        const newUser = await register(name, email, password);
        setSuccessMsg(`Welcome to Vrindopnishad, ${newUser.name}! Registration successful.`);
      } else {
        if (!email.trim()) throw new Error('Please enter your email address.');
        if (!password) throw new Error('Please enter your password.');

        const signedUser = await signIn(email, password);
        setSuccessMsg(`Welcome back, ${signedUser.name}! Sign in successful.`);
      }

      // Fire canvas confetti animation!
      confettiRef.current?.fire({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 },
      });

      // Auto close after brief celebration delay
      setTimeout(() => {
        onClose();
      }, 2000);

    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'apple' | 'guest') => {
    setError('');
    setLoading(true);
    try {
      const socialUser = await socialSignIn(provider);
      setSuccessMsg(`Signed in as ${socialUser.name}!`);

      confettiRef.current?.fire({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5 },
      });

      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err: any) {
      setError('Social sign in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 overflow-y-auto bg-slate-950/80 backdrop-blur-md transition-all duration-300 animate-in fade-in">
      {/* Confetti Overlay Canvas inside modal */}
      <Confetti
        ref={confettiRef}
        manualstart={true}
        className="pointer-events-none fixed inset-0 z-[100000] size-full"
      />

      <div className="relative w-full max-w-md overflow-hidden rounded-[32px] border border-amber-500/30 bg-slate-900/95 p-6 sm:p-8 shadow-2xl shadow-amber-500/10 text-slate-100 backdrop-blur-xl">
        {/* Ambient background graphics */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-amber-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-orange-500/15 blur-3xl" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {isLoggedIn && user ? (
          /* Logged In View */
          <div className="text-center py-4 space-y-5">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 p-1 shadow-lg shadow-amber-500/30">
              <img
                src={user.avatarUrl || '/v-logo-rounded/official-logo-dark.svg'}
                alt={user.name}
                className="h-full w-full rounded-full object-cover bg-slate-900"
              />
            </div>
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-400 border border-amber-500/30 mb-2">
                <Sparkles size={13} /> {lang === 'hindi' ? 'सत्यापित साधक' : 'Verified Seeker'}
              </span>
              <h3 className="text-2xl font-bold text-white">{user.name}</h3>
              <p className="text-sm text-slate-400 mt-0.5">{user.email}</p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-left space-y-2 text-xs text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500">{lang === 'hindi' ? 'प्रवेश प्रकार:' : 'Provider:'}</span>
                <span className="font-semibold capitalize text-amber-400">{user.provider}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{lang === 'hindi' ? 'प्रवेश समय:' : 'Signed In:'}</span>
                <span>{new Date(user.signedInAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-3">
              <Button
                variant="gold"
                size="lg"
                className="w-full rounded-full"
                onClick={() => {
                  triggerSuccessConfetti();
                }}
              >
                🎉 {lang === 'hindi' ? 'उत्सव पुष्पवर्षा करें' : 'Trigger Confetti Fireworks 🎉'}
              </Button>

              <Button
                variant="outline"
                size="md"
                className="w-full rounded-full border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300"
                onClick={() => {
                  signOut();
                }}
              >
                {lang === 'hindi' ? 'साइन आउट करें' : 'Sign Out'}
              </Button>
            </div>
          </div>
        ) : (
          /* Sign In / Register Forms (Sana AI Clean Reference) */
          <>
            {/* Logo Symbol Header */}
            <div className="flex items-center gap-2 mb-4">
              <div className="grid grid-cols-2 gap-1 w-4 h-4">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Vrindopnishad</span>
            </div>

            {/* Main Header */}
            <div className="mb-6 space-y-1">
              <h2 className="text-3xl font-extrabold tracking-tight text-white">
                {mode === 'signin' ? 'Welcome to Vrindopnishad' : 'Create your account'}
              </h2>
              <p className="text-lg text-slate-400 font-normal tracking-tight">
                {mode === 'signin' ? 'Your Vedic sanctuary for wisdom' : 'Join spiritual seekers'}
              </p>
            </div>

            {/* Error / Success Banners */}
            {error && (
              <div className="mb-4 rounded-2xl border border-red-500/40 bg-red-500/10 p-3 text-xs text-red-300">
                ⚠️ {error}
              </div>
            )}
            {successMsg && (
              <div className="mb-4 flex items-center gap-2 rounded-2xl border border-emerald-500/40 bg-emerald-500/15 p-3 text-xs font-medium text-emerald-300">
                <CheckCircle2 size={16} className="shrink-0 text-emerald-400" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Google Pill Button */}
            <button
              type="button"
              onClick={() => handleSocialLogin('google')}
              className="w-full flex items-center justify-center gap-3 rounded-full border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 py-3 px-6 text-sm font-semibold text-slate-800 dark:text-white shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800/90 hover:scale-[1.01] transition-all cursor-pointer mb-4"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"/>
                <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"/>
                <path fill="#FBBC05" d="M5.6 14.8c-.3-.8-.4-1.8-.4-2.8s.1-2 .4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z"/>
                <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"/>
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Separator */}
            <div className="flex items-center gap-3 my-4">
              <div className="h-px flex-1 bg-slate-800" />
              <span className="text-xs text-slate-500">or</span>
              <div className="h-px flex-1 bg-slate-800" />
            </div>

            {/* Main Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {mode === 'register' && (
                <div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full rounded-full border border-slate-800 bg-slate-950/80 px-5 py-3 text-sm text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all"
                    required
                  />
                </div>
              )}

              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address..."
                  className="w-full rounded-full border border-slate-800 bg-slate-950/80 px-5 py-3 text-sm text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all"
                  required
                />
              </div>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password..."
                  className="w-full rounded-full border border-slate-800 bg-slate-950/80 px-5 py-3 text-sm text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {mode === 'register' && (
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password..."
                  className="w-full rounded-full border border-slate-800 bg-slate-950/80 px-5 py-3 text-sm text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all"
                  required
                />
              )}

              {/* Main Pill Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-slate-900 dark:bg-amber-500 hover:bg-slate-800 dark:hover:bg-amber-400 text-white dark:text-slate-950 font-bold py-3 px-6 text-sm shadow-md hover:scale-[1.01] transition-all cursor-pointer mt-2"
              >
                {loading
                  ? 'Processing...'
                  : mode === 'signin'
                  ? 'Continue with email 🎉'
                  : 'Create Account 🎉'}
              </button>
            </form>

            {/* Mode Switch */}
            <div className="flex items-center justify-between text-xs text-slate-400 pt-3">
              {mode === 'signin' ? (
                <span>
                  New here?{' '}
                  <button
                    type="button"
                    onClick={() => { setMode('register'); setError(''); }}
                    className="font-semibold text-amber-400 hover:underline"
                  >
                    Register
                  </button>
                </span>
              ) : (
                <span>
                  Already registered?{' '}
                  <button
                    type="button"
                    onClick={() => { setMode('signin'); setError(''); }}
                    className="font-semibold text-amber-400 hover:underline"
                  >
                    Sign In
                  </button>
                </span>
              )}

              <button
                type="button"
                onClick={() => handleSocialLogin('guest')}
                className="text-slate-500 hover:text-slate-300 font-medium"
              >
                Guest Login
              </button>
            </div>

            {/* Footer terms */}
            <p className="text-[11px] text-slate-500 leading-normal pt-4">
              By signing up, you agree to the{' '}
              <a href="#terms" onClick={(e) => e.preventDefault()} className="underline hover:text-slate-400">Terms of Use</a> and{' '}
              <a href="#privacy" onClick={(e) => e.preventDefault()} className="underline hover:text-slate-400">Privacy Notice</a>.
            </p>
          </>
        )}
      </div>
    </div>
  );
};
