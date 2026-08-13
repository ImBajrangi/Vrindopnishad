import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, Eye, EyeOff, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuth } from '@/context/AuthContext';
import './AuthPage.css';

interface AuthPageProps {
  onBackToHome: () => void;
  lang?: 'english' | 'hindi';
}

export const AuthPage: React.FC<AuthPageProps> = ({ onBackToHome, lang = 'english' }) => {
  const { user, isLoggedIn, signIn, register, socialSignIn, signOut } = useAuth();

  const [mode, setMode] = useState<'signin' | 'register'>('signin');
  const [step, setStep] = useState<'email' | 'credentials'>('email');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const t = (en: string, hi: string) => (lang === 'hindi' ? hi : en);

  const handleContinueWithEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setError(t('Please enter a valid email address.', 'कृपया एक वैध ईमेल दर्ज करें।'));
      return;
    }
    setError('');
    setStep('credentials');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    try {
      if (mode === 'register') {
        if (!name.trim()) throw new Error(t('Please enter your full name.', 'कृपया अपना पूरा नाम दर्ज करें।'));
        if (!email.trim()) throw new Error(t('Please enter a valid email.', 'कृपया वैध ईमेल दर्ज करें।'));
        if (password.length < 6) throw new Error(t('Password must be at least 6 characters.', 'पासवर्ड कम से कम 6 अक्षरों का होना चाहिए।'));
        if (password !== confirmPassword) throw new Error(t('Passwords do not match.', 'पासवर्ड मेल नहीं खाते।'));
        await register(name, email, password);
        setSuccessMsg(t('Account created successfully!', 'खाता सफलतापूर्वक बनाया गया!'));
      } else {
        if (!email.trim()) throw new Error(t('Please enter a valid email.', 'कृपया वैध ईमेल दर्ज करें।'));
        if (!password) throw new Error(t('Please enter your password.', 'कृपया अपना पासवर्ड दर्ज करें।'));
        await signIn(email, password);
        setSuccessMsg(t('Welcome back!', 'पुनः स्वागत है!'));
      }
      confetti({ particleCount: 80, spread: 75, origin: { y: 0.5 } });
      setTimeout(() => onBackToHome(), 1400);
    } catch (err: any) {
      setError(err.message || t('An authentication error occurred.', 'प्रमाणीकरण त्रुटि हुई।'));
    } finally {
      setLoading(false);
    }
  };

  const handleSocial = async (provider: 'google' | 'apple' | 'guest') => {
    setError('');
    setLoading(true);
    try {
      await socialSignIn(provider);
      confetti({ particleCount: 80, spread: 75, origin: { y: 0.5 } });
      setTimeout(() => onBackToHome(), 1400);
    } catch (err: any) {
      setError(err.message || t('Sign in failed.', 'साइन इन करने में विफल।'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-master-page">
      {/* Background Ambient Orbs */}
      <div className="auth-orb-top" />
      <div className="auth-orb-bottom" />

      {/* ═══════════════════════════════════════════════════
         TOP HEADER BAR
         ═══════════════════════════════════════════════════ */}
      <header className="auth-top-nav">
        <div className="auth-brand-group" onClick={onBackToHome} role="button" tabIndex={0}>
          <div className="auth-brand-badge">
            <img src="/v-logo-rounded/official-logo-dark.svg" alt="Logo" width="22" height="22" />
          </div>
          <span className="auth-brand-text">Vrindopnishad</span>
          <span className="auth-sanctuary-chip">{t('SANCTUARY 2.0', 'साधना मंच')}</span>
        </div>

        <button onClick={onBackToHome} className="auth-home-btn" type="button">
          <ArrowLeft size={14} />
          <span>{t('Back to Home', 'मुख्य पृष्ठ')}</span>
        </button>
      </header>

      {/* ═══════════════════════════════════════════════════
         MAIN CENTERED FORM CONTAINER
         ═══════════════════════════════════════════════════ */}
      <main className="auth-main-wrapper">
        <div className="auth-glass-box">

          {/* Logged-In User State */}
          {isLoggedIn && user ? (
            <div className="auth-logged-view">
              <div className="user-avatar-wrap">
                <img src={user.avatarUrl || '/v-logo-rounded/official-logo-dark.svg'} alt={user.name} />
              </div>
              <span className="user-active-tag">
                <Sparkles size={12} /> {t('Active Session', 'सक्रिय सत्र')}
              </span>
              <h2 className="user-display-name">{user.name}</h2>
              <p className="user-display-email">{user.email}</p>

              <button type="button" className="auth-submit-cta" onClick={onBackToHome}>
                {t('Enter Sanctuary', 'प्रवेश करें')} →
              </button>
              <button type="button" className="auth-signout-btn" onClick={signOut}>
                {t('Sign Out', 'साइन आउट')}
              </button>
            </div>
          ) : (
            /* Sign In / Register Form View */
            <div className="auth-card-body">

              {/* Title Header */}
              <div className="auth-card-header">
                <h1 className="auth-card-title">
                  {mode === 'signin' ? t('Welcome back', 'पुनः स्वागत है') : t('Create your account', 'खाता बनाएं')}
                </h1>
                <p className="auth-card-subtitle">
                  {mode === 'signin'
                    ? t('Continue your spiritual journey with Vrindopnishad', 'वृंदोपनिषद में अपनी साधना यात्रा जारी रखें')
                    : t('Join our spiritual community of seekers today', 'आज ही हमारे साधना परिवार से जुड़ें')}
                </p>
              </div>

              {/* Google Social Auth */}
              <button type="button" onClick={() => handleSocial('google')} className="auth-google-btn">
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z" />
                  <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z" />
                  <path fill="#FBBC05" d="M5.6 14.8c-.3-.8-.4-1.8-.4-2.8s.1-2 .4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z" />
                  <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z" />
                </svg>
                <span>{t('Continue with Google', 'गूगल द्वारा आगे बढ़ें')}</span>
              </button>

              {/* Divider */}
              <div className="auth-divider">
                <div className="divider-line" />
                <span className="divider-text">{t('or use email', 'अथवा ईमेल द्वारा')}</span>
                <div className="divider-line" />
              </div>

              {/* Alert Banners */}
              {error && <div className="auth-alert alert-error">{error}</div>}
              {successMsg && (
                <div className="auth-alert alert-success">
                  <CheckCircle2 size={15} /> {successMsg}
                </div>
              )}

              {/* Form Input Stack */}
              <form onSubmit={step === 'email' ? handleContinueWithEmail : handleSubmit} className="auth-form-stack">

                {step === 'credentials' && (
                  <div className="auth-email-badge">
                    <span className="email-badge-text">{email}</span>
                    <button
                      type="button"
                      className="email-edit-btn"
                      onClick={() => { setStep('email'); setError(''); }}
                    >
                      {t('Edit', 'बदलें')}
                    </button>
                  </div>
                )}

                {mode === 'register' && step === 'credentials' && (
                  <div className="input-group">
                    <label className="input-label">{t('Full Name', 'पूरा नाम')}</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t('e.g. Radhika Sharma', 'जैसे: राधिका शर्मा')}
                      className="input-control"
                      required
                    />
                  </div>
                )}

                {step === 'email' && (
                  <div className="input-group">
                    <label className="input-label">{t('Email Address', 'ईमेल पता')}</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="input-control"
                      required
                      autoFocus
                    />
                  </div>
                )}

                {step === 'credentials' && (
                  <>
                    <div className="input-group">
                      <label className="input-label">{t('Password', 'पासवर्ड')}</label>
                      <div className="password-input-box">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder={t('Enter password', 'पासवर्ड दर्ज करें')}
                          className="input-control"
                          required
                          autoFocus
                        />
                        <button
                          type="button"
                          className="eye-icon-btn"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>

                    {mode === 'register' && (
                      <div className="input-group">
                        <label className="input-label">{t('Confirm Password', 'पासवर्ड पुनः दर्ज करें')}</label>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder={t('Confirm password', 'पासवर्ड पुष्टि करें')}
                          className="input-control"
                          required
                        />
                      </div>
                    )}
                  </>
                )}

                {/* Primary Submit Action CTA */}
                <button type="submit" disabled={loading} className="auth-submit-cta">
                  {loading
                    ? t('Processing...', 'प्रक्रिया जारी है...')
                    : step === 'email'
                      ? t('Continue with Email', 'ईमेल से जारी रखें')
                      : mode === 'signin'
                        ? t('Sign In', 'साइन इन करें')
                        : t('Create Account', 'खाता बनाएं')}
                </button>
              </form>

              {/* Mode Switch & Guest Access */}
              <div className="auth-switch-footer">
                <span className="switch-text">
                  {mode === 'signin' ? t("Don't have an account?", 'खाता नहीं है?') : t('Already have an account?', 'खाता है?')}{' '}
                  <button
                    type="button"
                    className="switch-action-btn"
                    onClick={() => {
                      setMode(mode === 'signin' ? 'register' : 'signin');
                      setStep('email');
                      setError('');
                    }}
                  >
                    {mode === 'signin' ? t('Register', 'पंजीकरण करें') : t('Sign In', 'साइन इन करें')}
                  </button>
                </span>

                <button type="button" className="guest-action-btn" onClick={() => handleSocial('guest')}>
                  {t('Guest Access', 'अतिथि प्रवेश')}
                </button>
              </div>

            </div>
          )}
        </div>
      </main>

      {/* ═══════════════════════════════════════════════════
         BOTTOM FOOTER
         ═══════════════════════════════════════════════════ */}
      <footer className="auth-bottom-footer">
        <div className="footer-links-row">
          <a href="#terms" onClick={(e) => e.preventDefault()}>{t('Terms of Service', 'उपयोग शर्तें')}</a>
          <span className="footer-dot">•</span>
          <a href="#privacy" onClick={(e) => e.preventDefault()}>{t('Privacy Policy', 'गोपनीयता नीति')}</a>
          <span className="footer-dot">•</span>
          <span>© 2026 Vrindopnishad Sanctuary</span>
        </div>
      </footer>
    </div>
  );
};
