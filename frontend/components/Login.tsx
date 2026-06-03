import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import { getTranslation, MOCK_USERS } from '../constants';
import { Language, User } from '../types';

interface LoginProps {
  language: Language;
  onLogin: (user: User) => void;
}

type ViewState = 'login' | 'signup' | 'forgot';

export const Login: React.FC<LoginProps> = ({ language, onLogin }) => {
  const [view, setView] = useState<ViewState>('login');
  const [localUsers, setLocalUsers] = useState<User[]>(MOCK_USERS);
  
  // Form States
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  
  // UI States
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const resetMessages = () => {
    setError('');
    setSuccessMsg('');
  };

  const switchView = (newView: ViewState) => {
    setView(newView);
    resetMessages();
    setUsername('');
    setPassword('');
    setName('');
    setContact('');
    setConfirmPassword('');
    setOtp('');
    setOtpSent(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();
    const user = localUsers.find(u => u.username === username && u.password === password);
    if (user) {
      onLogin(user);
    } else {
      setError(getTranslation('login.error', language));
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();
    if (password !== confirmPassword) {
      setError(getTranslation('login.pass_mismatch', language));
      return;
    }
    
    const newUser: User = {
      id: `u${Date.now()}`,
      username,
      password,
      name,
      role: 'Project Engineer', // Default role for new signups
      avatar: name.charAt(0).toUpperCase()
    };
    
    setLocalUsers([...localUsers, newUser]);
    setSuccessMsg(getTranslation('login.signup_success', language));
    setTimeout(() => switchView('login'), 2000);
  };

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();
    if (!contact) return;
    // Simulate sending OTP
    setOtpSent(true);
    setSuccessMsg(getTranslation('login.otp_sent', language));
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();
    if (password !== confirmPassword) {
      setError(getTranslation('login.pass_mismatch', language));
      return;
    }
    // Simulate password reset success
    setSuccessMsg('Password reset successfully! Please login.');
    setTimeout(() => switchView('login'), 2000);
  };

  const handleGuestLogin = () => {
    const guest = localUsers.find(u => u.id === 'guest');
    if (guest) onLogin(guest);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-dark-bg relative overflow-hidden">
      {/* Futuristic Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-brand-500/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      <Card className="w-full max-w-md z-10 shadow-2xl border border-white/20 dark:border-slate-700/50 backdrop-blur-xl bg-white/70 dark:bg-slate-900/70">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-3 bg-brand-500/10 rounded-2xl mb-4">
              <Icons.Hexagon className="h-10 w-10 text-brand-500" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              {getTranslation('login.title', language)}
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              Enterprise Project Controls OS
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50 rounded-lg flex items-center gap-2 text-red-600 dark:text-red-400 text-sm animate-in fade-in">
              <Icons.AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-900/50 rounded-lg flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm animate-in fade-in">
              <Icons.CheckCircle2 className="h-4 w-4 shrink-0" />
              {successMsg}
            </div>
          )}

          {/* LOGIN VIEW */}
          {view === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4 animate-in fade-in">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {getTranslation('login.username', language)}
                </label>
                <div className="relative">
                  <Icons.User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                    placeholder="admin / planner"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    {getTranslation('login.password', language)}
                  </label>
                  <button type="button" onClick={() => switchView('forgot')} className="text-xs text-brand-600 dark:text-brand-400 hover:underline">
                    {getTranslation('login.forgot', language)}
                  </button>
                </div>
                <div className="relative">
                  <Icons.Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                    placeholder="password123"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full py-2.5 text-base mt-2">
                {getTranslation('login.submit', language)}
              </Button>

              <div className="text-center mt-4">
                <span className="text-sm text-slate-500">{getTranslation('login.no_account', language)} </span>
                <button type="button" onClick={() => switchView('signup')} className="text-sm font-medium text-brand-600 dark:text-brand-400 hover:underline">
                  {getTranslation('login.signup', language)}
                </button>
              </div>

              <div className="mt-6 relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-slate-900 text-slate-500">Or</span>
                </div>
              </div>

              <Button variant="outline" type="button" onClick={handleGuestLogin} className="w-full mt-6 py-2.5">
                {getTranslation('login.guest', language)}
              </Button>
            </form>
          )}

          {/* SIGNUP VIEW */}
          {view === 'signup' && (
            <form onSubmit={handleSignup} className="space-y-4 animate-in fade-in">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {getTranslation('login.name', language)}
                </label>
                <div className="relative">
                  <Icons.User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {getTranslation('login.username', language)}
                </label>
                <div className="relative">
                  <Icons.AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {getTranslation('login.password', language)}
                </label>
                <div className="relative">
                  <Icons.Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {getTranslation('login.confirm_password', language)}
                </label>
                <div className="relative">
                  <Icons.Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input 
                    type="password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full py-2.5 text-base mt-2">
                {getTranslation('login.create_account', language)}
              </Button>

              <div className="text-center mt-4">
                <span className="text-sm text-slate-500">{getTranslation('login.has_account', language)} </span>
                <button type="button" onClick={() => switchView('login')} className="text-sm font-medium text-brand-600 dark:text-brand-400 hover:underline">
                  {getTranslation('login.submit', language)}
                </button>
              </div>
            </form>
          )}

          {/* FORGOT PASSWORD VIEW */}
          {view === 'forgot' && (
            <form onSubmit={otpSent ? handleResetPassword : handleSendOTP} className="space-y-4 animate-in fade-in">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {getTranslation('login.contact', language)}
                </label>
                <div className="relative">
                  <Icons.Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input 
                    type="text" 
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    disabled={otpSent}
                    className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all disabled:opacity-50"
                    placeholder="Email or Mobile"
                    required
                  />
                </div>
              </div>

              {otpSent && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      {getTranslation('login.enter_otp', language)}
                    </label>
                    <div className="relative">
                      <Icons.Key className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <input 
                        type="text" 
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                        placeholder="123456"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      {getTranslation('login.new_password', language)}
                    </label>
                    <div className="relative">
                      <Icons.Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      {getTranslation('login.confirm_password', language)}
                    </label>
                    <div className="relative">
                      <Icons.Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <input 
                        type="password" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              <Button type="submit" className="w-full py-2.5 text-base mt-2">
                {otpSent ? getTranslation('login.verify_reset', language) : getTranslation('login.send_otp', language)}
              </Button>

              <div className="text-center mt-4">
                <button type="button" onClick={() => switchView('login')} className="text-sm font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
                  <Icons.ArrowLeft className="inline h-4 w-4 mr-1" />
                  {getTranslation('login.back_to_login', language)}
                </button>
              </div>
            </form>
          )}

        </CardContent>
      </Card>
    </div>
  );
};