import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Mail, Lock, AlertCircle, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, loginAsDemo } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      navigate('/');
    } else {
      setError(res.message || 'Login failed. Try demo accounts below.');
    }
  };

  const handleDemo = (role) => {
    loginAsDemo(role);
    if (role === 'client') navigate('/client/dashboard');
    else if (role === 'admin') navigate('/admin/dashboard');
    else navigate('/freelancer/dashboard');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full glass-panel p-8 rounded-2xl border border-indigo-500/20 shadow-2xl relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Secure Access</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Log in to SkillBridge</h2>
          <p className="text-xs text-slate-400 mt-1">Manage projects, proposals, and milestone contracts</p>
        </div>

        {error && (
          <div className="p-3 mb-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@domain.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-slate-300">Password</label>
              <a href="#forgot" className="text-[11px] text-indigo-400 hover:underline">Forgot?</a>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 mt-2"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Demo Login Buttons */}
        <div className="mt-8 pt-6 border-t border-slate-800 text-center">
          <div className="text-[11px] font-semibold text-slate-400 mb-3 uppercase tracking-wider">
            Quick Evaluator 1-Click Login
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleDemo('client')}
              type="button"
              className="py-1.5 px-2 rounded-lg bg-indigo-950/70 border border-indigo-500/30 hover:bg-indigo-900 text-indigo-300 text-xs font-medium transition-colors"
            >
              Client
            </button>
            <button
              onClick={() => handleDemo('freelancer')}
              type="button"
              className="py-1.5 px-2 rounded-lg bg-violet-900/40 border border-violet-500/30 hover:bg-violet-900 text-violet-300 text-xs font-medium transition-colors"
            >
              Freelancer
            </button>
            <button
              onClick={() => handleDemo('admin')}
              type="button"
              className="py-1.5 px-2 rounded-lg bg-amber-900/40 border border-amber-500/30 hover:bg-amber-900 text-amber-300 text-xs font-medium transition-colors"
            >
              Admin
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-indigo-400 hover:underline font-semibold">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}
