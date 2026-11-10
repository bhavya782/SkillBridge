import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import {
  Sparkles,
  Briefcase,
  Send,
  DollarSign,
  TrendingUp,
  FileCheck2,
  CheckCircle2,
  Star,
  ShieldCheck,
  Compass,
} from 'lucide-react';

export default function FreelancerDashboard() {
  const [stats, setStats] = useState({
    activeBids: 2,
    activeContracts: 1,
    completedProjects: 14,
    totalEarnings: 38400,
    trustScore: 94,
    clientRating: 4.95,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-950/60 border border-violet-500/30 text-violet-400 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Freelancer Hub</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Freelancer Workspace & Reputation</h1>
          <p className="text-xs text-slate-400 mt-1">
            Track active proposals, milestone submissions, and transparent trust score metrics.
          </p>
        </div>

        <Link
          to="/explore/projects"
          className="px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-violet-600/30 transition-all self-start sm:self-auto"
        >
          <Compass className="w-4 h-4" />
          Browse Recommended Projects
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl glass-card border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2 text-xs">
            <span>Reputation Trust Score</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400">{stats.trustScore}/100</div>
          <span className="text-[10px] text-emerald-400">Top 5% Platform Tier</span>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2 text-xs">
            <span>Average Rating</span>
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white">{stats.clientRating} ★</div>
          <span className="text-[10px] text-slate-400">14 Verified Reviews</span>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2 text-xs">
            <span>Active Contracts</span>
            <FileCheck2 className="w-4 h-4 text-violet-400" />
          </div>
          <div className="text-2xl font-bold text-white">{stats.activeContracts}</div>
          <span className="text-[10px] text-violet-400">In-progress milestones</span>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2 text-xs">
            <span>Cumulative Earnings</span>
            <DollarSign className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold text-white">${stats.totalEarnings}</div>
          <span className="text-[10px] text-indigo-400">Direct simulated escrow</span>
        </div>
      </div>

      {/* Trust Score Breakdown Explained */}
      <div className="p-6 rounded-2xl glass-panel border border-emerald-500/20">
        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">
            Transparent Trust Score Breakdown
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
            <div className="text-[11px] text-slate-400 mb-1">Completed Deliverables</div>
            <div className="font-bold text-white text-base">30 / 30 pts</div>
            <p className="text-[10px] text-slate-500 mt-1">14 completed client contracts</p>
          </div>
          <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
            <div className="text-[11px] text-slate-400 mb-1">Client Ratings</div>
            <div className="font-bold text-white text-base">29.7 / 30 pts</div>
            <p className="text-[10px] text-slate-500 mt-1">4.95 / 5.0 star average</p>
          </div>
          <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
            <div className="text-[11px] text-slate-400 mb-1">On-Time Milestones</div>
            <div className="font-bold text-white text-base">19 / 20 pts</div>
            <p className="text-[10px] text-slate-500 mt-1">98% on-time milestone delivery</p>
          </div>
          <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
            <div className="text-[11px] text-slate-400 mb-1">Verified Evidence</div>
            <div className="font-bold text-white text-base">15 / 20 pts</div>
            <p className="text-[10px] text-slate-500 mt-1">GitHub & LinkedIn connected</p>
          </div>
        </div>
      </div>

      {/* Quick Nav Hub */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Link
          to="/freelancer/contracts"
          className="p-6 rounded-2xl glass-card border border-slate-800 hover:border-violet-500/40 transition-all"
        >
          <FileCheck2 className="w-6 h-6 text-violet-400 mb-3" />
          <h3 className="font-bold text-white text-sm mb-1">Milestone Submissions</h3>
          <p className="text-xs text-slate-400">View active deliverables and submit links for client approval.</p>
        </Link>

        <Link
          to="/freelancer/proposals"
          className="p-6 rounded-2xl glass-card border border-slate-800 hover:border-indigo-500/40 transition-all"
        >
          <Send className="w-6 h-6 text-indigo-400 mb-3" />
          <h3 className="font-bold text-white text-sm mb-1">My Submitted Proposals</h3>
          <p className="text-xs text-slate-400">Track acceptance status and Smart Bid feedback.</p>
        </Link>

        <Link
          to="/explore/projects"
          className="p-6 rounded-2xl glass-card border border-slate-800 hover:border-cyan-500/40 transition-all"
        >
          <Sparkles className="w-6 h-6 text-cyan-400 mb-3" />
          <h3 className="font-bold text-white text-sm mb-1">AI Project Recommendations</h3>
          <p className="text-xs text-slate-400">Find new projects aligned with your verified skill matrix.</p>
        </Link>
      </div>
    </div>
  );
}
