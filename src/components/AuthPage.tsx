import React, { useState, useRef } from 'react';
import { ArrowLeft, CheckCircle2, Eye, EyeOff, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuth } from '@/context/AuthContext';
import { Confetti, ConfettiRef } from '@/components/ui/confetti';
import { Button } from '@/components/ui/button';
import SideRays from './SideRays';
import './AuthPage.css';

interface AuthPageProps {
  onBackToHome: () => void;
  lang?: 'english' | 'hindi';
}

export const AuthPage: React.FC<AuthPageProps> = ({ onBackToHome, lang = 'english' }) => {
  const { user, isLoggedIn, signIn, register, socialSignIn, signOut, triggerSuccessConfetti } = useAuth();

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

  const confettiRef = useRef<ConfettiRef>(null);

  const handleContinueWithEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError(lang === 'hindi' ? 'कृपया एक वैध ईमेल दर्ज करें।' : 'Please enter a valid email address.');
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
        if (!name.trim()) throw new Error(lang === 'hindi' ? 'कृपया अपना पूरा नाम दर्ज करें।' : 'Please enter your full name.');
        if (!email.trim()) throw new Error(lang === 'hindi' ? 'कृपया एक वैध ईमेल दर्ज करें।' : 'Please enter a valid email address.');
        if (password.length < 6) throw new Error(lang === 'hindi' ? 'पासवर्ड कम से कम 6 अक्षरों का होना चाहिए।' : 'Password must be at least 6 characters.');
        if (password !== confirmPassword) throw new Error(lang === 'hindi' ? 'पासवर्ड मेल नहीं खाते हैं।' : 'Passwords do not match.');

        await register(name, email, password);
        setSuccessMsg(lang === 'hindi' ? 'खाता सफलतापूर्वक बनाया गया!' : 'Account created successfully!');
      } else {
        if (!email.trim()) throw new Error(lang === 'hindi' ? 'कृपया एक वैध ईमेल दर्ज करें।' : 'Please enter a valid email address.');
        if (!password) throw new Error(lang === 'hindi' ? 'कृपया अपना पासवर्ड दर्ज करें।' : 'Please enter your password.');

        await signIn(email, password);
        setSuccessMsg(lang === 'hindi' ? 'पुनः स्वागत है!' : 'Welcome back!');
      }

      confetti({ particleCount: 75, spread: 70, origin: { y: 0.6 } });

      setTimeout(() => {
        onBackToHome();
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocial = async (provider: 'google' | 'apple' | 'guest') => {
    setError('');
    setLoading(true);
    try {
      await socialSignIn(provider);
      setSuccessMsg(`Signed in successfully!`);

      confetti({ particleCount: 75, spread: 70, origin: { y: 0.6 } });

      setTimeout(() => {
        onBackToHome();
      }, 1500);
    } catch (err: any) {
      setError(err.message || `Failed to sign in.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-root">
      {/* Background SideRays Light Canvas */}
      <SideRays />

      {/* Top Header Navigation */}
      <header className="auth-page-header">
        {/* Top Left Official Brand Logo */}
        <div className="auth-brand-logo" onClick={onBackToHome}>
          <div className="auth-logo-badge">
            <img
              src="/v-logo-rounded/official-logo-dark.svg"
              alt="Vrindopnishad Logo"
              width="26"
              height="26"
            />
          </div>
          <span className="brand-text">Vrindopnishad</span>
        </div>

        {/* Center Floating Pill Menu Bar */}
        <div className="auth-nav-pill">
          <a href="#home" onClick={(e) => { e.preventDefault(); onBackToHome(); }}>{lang === 'hindi' ? 'मुख्य पृष्ठ' : 'Home'}</a>
          <a href="#philosophy" onClick={(e) => { e.preventDefault(); onBackToHome(); }}>{lang === 'hindi' ? 'सेवाएं' : 'Our Services'}</a>
          <a href="#story" onClick={(e) => { e.preventDefault(); onBackToHome(); }}>{lang === 'hindi' ? 'हमारा इतिहास' : 'Our Story'}</a>
        </div>

        {/* Top Right Back Button */}
        <button onClick={onBackToHome} className="auth-back-btn">
          <ArrowLeft size={15} />
          <span>{lang === 'hindi' ? 'वापस जाएं' : 'Back to Sanctuary'}</span>
        </button>
      </header>

      {/* Main Split Screen Area */}
      <main className="auth-page-main">

        {/* LEFT COLUMN: Clean Minimalist Auth Portal */}
        <div className="auth-left-col">

          {/* Main Title & Subtitle */}
          <div className="auth-headline-box">
            <h1 className="auth-main-title">
              {mode === 'signin'
                ? (lang === 'hindi' ? 'वृंदोपनिषद में स्वागत है' : 'Welcome to Vrindopnishad')
                : (lang === 'hindi' ? 'खाता बनाएं' : 'Create your account')}
            </h1>
            <p className="auth-main-subtitle">
              {mode === 'signin'
                ? (lang === 'hindi' ? 'वैदिक ज्ञान एवं आत्म-साक्षात्कार का पवित्र धाम' : 'Your Vedic sanctuary for timeless wisdom & satvic living')
                : (lang === 'hindi' ? 'हजारों साधकों के पवित्र समुदाय से जुड़ें' : 'Join thousands of spiritual seekers and devotees')}
            </p>
          </div>

          {/* User Logged In State */}
          {isLoggedIn && user ? (
            <div className="auth-user-card">
              <div className="user-avatar-wrap">
                <img src={user.avatarUrl || '/v-logo-rounded/official-logo-dark.svg'} alt={user.name} />
              </div>
              <div>
                <span className="user-status-badge">
                  <Sparkles size={13} /> {lang === 'hindi' ? 'सक्रिय सत्र' : 'Active Sanctuary Session'}
                </span>
                <h3 className="user-name">{user.name}</h3>
                <p className="user-email">{user.email}</p>
              </div>

              <button type="button" className="auth-pill-submit-btn" onClick={onBackToHome}>
                {lang === 'hindi' ? 'आश्रम प्रवेश करें →' : 'Enter Sanctuary →'}
              </button>
              <button type="button" className="auth-signout-btn" onClick={signOut}>
                {lang === 'hindi' ? 'साइन आउट' : 'Sign Out'}
              </button>
            </div>
          ) : (
            /* Main Form Area */
            <div className="auth-form-container">

              {/* Google Social Button */}
              <button type="button" onClick={() => handleSocial('google')} className="google-pill-btn">
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z" />
                  <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z" />
                  <path fill="#FBBC05" d="M5.6 14.8c-.3-.8-.4-1.8-.4-2.8s.1-2 .4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z" />
                  <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z" />
                </svg>
                <span>{lang === 'hindi' ? 'गूगल द्वारा आगे बढ़ें' : 'Continue with Google'}</span>
              </button>

              {/* Or Separator */}
              <div className="or-divider-row">
                <div className="or-line" />
                <span className="or-text">{lang === 'hindi' ? 'अथवा' : 'or'}</span>
                <div className="or-line" />
              </div>

              {/* Error & Success Banners */}
              {error && (
                <div className="auth-alert error">
                  ⚠️ {error}
                </div>
              )}
              {successMsg && (
                <div className="auth-alert success">
                  <CheckCircle2 size={16} color="#34d399" />
                  <span>{successMsg}</span>
                </div>
              )}

              {/* Email Form */}
              <form onSubmit={step === 'email' ? handleContinueWithEmail : handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>

                {mode === 'register' && step === 'credentials' && (
                  <div>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={lang === 'hindi' ? 'पूरा नाम' : 'Full Name'}
                      className="auth-pill-input"
                      required
                    />
                  </div>
                )}

                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="auth-pill-input"
                    required
                  />
                </div>

                {step === 'credentials' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    <div style={{ position: 'relative' }}>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={lang === 'hindi' ? 'पासवर्ड...' : 'Enter password...'}
                        className="auth-pill-input"
                        style={{ paddingRight: '3rem' }}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ position: 'absolute', right: '1.25rem', top: '50%', background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>

                    {mode === 'register' && (
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder={lang === 'hindi' ? 'पासवर्ड की पुष्टि करें...' : 'Confirm password...'}
                        className="auth-pill-input"
                        required
                      />
                    )}
                  </div>
                )}

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="auth-pill-submit-btn"
                >
                  {loading
                    ? (lang === 'hindi' ? 'प्रक्रिया जारी है...' : 'Processing...')
                    : step === 'email'
                      ? (lang === 'hindi' ? 'ईमेल द्वारा जारी रखें' : 'Continue with email')
                      : mode === 'signin'
                        ? (lang === 'hindi' ? 'साइन इन करें' : 'Sign In')
                        : (lang === 'hindi' ? 'खाता बनाएं' : 'Create Account')}
                </button>
              </form>

              {/* Mode Toggle Switch & Guest Option */}
              <div className="auth-mode-switch-row">
                {mode === 'signin' ? (
                  <span>
                    {lang === 'hindi' ? 'खाता नहीं है?' : "Don't have an account?"}{' '}
                    <button
                      type="button"
                      onClick={() => { setMode('register'); setStep('credentials'); setError(''); }}
                      className="auth-toggle-btn"
                    >
                      {lang === 'hindi' ? 'पंजीकरण करें' : 'Register'}
                    </button>
                  </span>
                ) : (
                  <span>
                    {lang === 'hindi' ? 'पहले से खाता है?' : 'Already have an account?'}{' '}
                    <button
                      type="button"
                      onClick={() => { setMode('signin'); setStep('email'); setError(''); }}
                      className="auth-toggle-btn"
                    >
                      {lang === 'hindi' ? 'साइन इन करें' : 'Sign In'}
                    </button>
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => handleSocial('guest')}
                  className="auth-guest-btn"
                >
                  {lang === 'hindi' ? 'अतिथि के रूप में जारी रखें' : 'Continue as Guest'}
                </button>
              </div>

              {/* Legal Disclaimer */}
              <p className="auth-disclaimer-text">
                {lang === 'hindi' ? 'आगे बढ़कर आप हमारी ' : 'By signing up, you agree to the '}
                <a href="#terms" onClick={(e) => e.preventDefault()}>{lang === 'hindi' ? 'उपयोग की शर्तें' : 'Terms of Use'}</a>,{' '}
                <a href="#privacy" onClick={(e) => e.preventDefault()}>{lang === 'hindi' ? 'गोपनीयता नीति' : 'Privacy Notice'}</a>, {lang === 'hindi' ? 'और ' : 'and '}
                <a href="#cookie" onClick={(e) => e.preventDefault()}>{lang === 'hindi' ? 'कुकी नीति' : 'Cookie Notice'}</a>.
              </p>

            </div>
          )}

        </div>

        {/* RIGHT COLUMN: Elegant Sacred Sanctuary Showcase Preview */}
        <div className="auth-right-col">
          <div className="sanctuary-preview-card">

            <div className="preview-hero-banner">
              <span className="preview-tag">DIGITAL SANCTUARY</span>
              <h2 className="preview-heading">
                {lang === 'hindi' ? 'प्राचीन वैदिक धरोहर एवं साधना डिजिटल मंच' : 'Authentic Vedic Scriptures & Spiritual Sanctuary'}
              </h2>
              <p className="preview-subtext">
                {lang === 'hindi'
                  ? 'श्रीमद्भगवद्गीता, स्तोत्र पाठ, सात्विक जीवन और ब्रज धाम तीर्थ यात्रा का दिव्य संगम।'
                  : 'Access authentic Stotra Path recitations, spiritual visual art, and sacred pilgrimage guidance.'}
              </p>
            </div>

            {/* Sacred Pillars Preview Grid */}
            <div className="sanctuary-pillars-grid">

              <div className="sanctuary-pillar-item">
                <span className="pillar-num">01</span>
                <div>
                  <h4 className="pillar-title">Vrindopnishad Path</h4>
                  <p className="pillar-desc">Authentic daily Vedic recitations & verse commentaries</p>
                </div>
              </div>

              <div className="sanctuary-pillar-item">
                <span className="pillar-num">02</span>
                <div>
                  <h4 className="pillar-title">Chitra Vrinda</h4>
                  <p className="pillar-desc">Sacred visual art galleries & divine Vrindavan aesthetics</p>
                </div>
              </div>

              <div className="sanctuary-pillar-item">
                <span className="pillar-num">03</span>
                <div>
                  <h4 className="pillar-title">Vrinda Tours</h4>
                  <p className="pillar-desc">Spiritual pilgrimage journeys & sacred site explorations</p>
                </div>
              </div>

            </div>

            {/* Inspiring Bottom Sanctuary Badge */}
            <div className="sanctuary-quote-box">
              <span>"Where ancient wisdom meets modern digital innovation."</span>
            </div>

          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="auth-page-footer">
        <div className="auth-footer-inner">
          <div className="footer-brand-title">
            <img src="/v-logo-rounded/official-logo-dark.svg" alt="Vrindopnishad" width="18" height="18" />
            <span>Vrindopnishad</span>
          </div>

          <div className="footer-credits">
            <span>curated by Braj Dham Heritage</span>
            <span>•</span>
            <span>© 2026 Vrindopnishad Sanctuary</span>
          </div>
        </div>
      </footer>

    </div>
  );
};
