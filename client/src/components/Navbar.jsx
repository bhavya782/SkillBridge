import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Sparkles,
  Briefcase,
  Layers,
  MessageSquare,
  FileCheck2,
  LogOut,
  ShieldAlert,
  User,
  PlusCircle,
  Compass,
  Cpu,
  BarChart3,
} from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 glass-panel border-b border-indigo-500/15 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-300 bg-clip-text text-transparent">
                SkillBridge<span className="text-indigo-400">.ai</span>
              </span>
              <span className="text-[9px] tracking-wider uppercase font-semibold text-indigo-400/80 -mt-1">
                Talent Intelligence
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <Link to="/explore/projects" className="hover:text-white transition-colors flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-indigo-400" />
              Explore Projects
            </Link>
            <Link to="/explore/freelancers" className="hover:text-white transition-colors flex items-center gap-1.5">
              <User className="w-4 h-4 text-violet-400" />
              Top Freelancers
            </Link>
            <Link to="/about" className="hover:text-white transition-colors">
              About Platform
            </Link>

            {user && (
              <div className="h-4 w-px bg-slate-800 mx-1" />
            )}

            {/* Role-specific Dashboard link */}
            {user?.role === 'client' && (
              <>
                <Link to="/client/dashboard" className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1.5">
                  <BarChart3 className="w-4 h-4" /> Client Portal
                </Link>
                <Link to="/client/create-project" className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-md shadow-indigo-600/30">
                  <PlusCircle className="w-3.5 h-3.5" /> Post Project
                </Link>
              </>
            )}

            {user?.role === 'freelancer' && (
              <>
                <Link to="/freelancer/dashboard" className="text-violet-400 hover:text-violet-300 font-semibold flex items-center gap-1.5">
                  <Cpu className="w-4 h-4" /> Freelancer Hub
                </Link>
                <Link to="/freelancer/contracts" className="hover:text-white flex items-center gap-1.5">
                  <FileCheck2 className="w-4 h-4 text-emerald-400" /> Contracts
                </Link>
              </>
            )}

            {user?.role === 'admin' && (
              <Link to="/admin/dashboard" className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4" /> Admin Console
              </Link>
            )}
          </div>

          {/* User Auth actions */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex flex-col text-right">
                  <span className="text-xs font-semibold text-white">{user.name}</span>
                  <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">
                    {user.role}
                  </span>
                </div>
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full border border-indigo-500/40 object-cover" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-500/30 text-indigo-300 flex items-center justify-center text-xs font-bold">
                    {user.name.charAt(0)}
                  </div>
                )}
                <button
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  title="Logout"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/25 transition-all"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
