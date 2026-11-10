import React, { useState, useEffect } from 'react';
import API from '../services/api';
import {
  Users,
  Briefcase,
  ShieldAlert,
  DollarSign,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 48,
    totalProjects: 19,
    activeProjects: 8,
    totalContracts: 12,
    completedContracts: 9,
    totalVolume: 42500,
    totalDisputes: 1,
    analytics: [
      { month: 'Jun', projects: 4, volume: 8500 },
      { month: 'Jul', projects: 8, volume: 16000 },
      { month: 'Aug', projects: 14, volume: 29000 },
      { month: 'Sep', projects: 19, volume: 42500 },
    ],
  });

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const res = await API.get('/admin/stats');
      if (res.data.success) {
        setStats(res.data.data);
      }
    } catch (e) {
      // Retain pre-calculated demo admin data
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Platform Operations & Security</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">Admin Platform Intelligence</h1>
        <p className="text-xs text-slate-400 mt-1">
          Monitor user growth, milestone escrow volumes, dispute resolution, and project moderation.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl glass-card border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2 text-xs">
            <span>Total Registered</span>
            <Users className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold text-white">{stats.totalUsers}</div>
          <span className="text-[10px] text-indigo-400">Clients & Freelancers</span>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2 text-xs">
            <span>Marketplace Projects</span>
            <Briefcase className="w-4 h-4 text-violet-400" />
          </div>
          <div className="text-2xl font-bold text-white">{stats.totalProjects}</div>
          <span className="text-[10px] text-violet-400">{stats.activeProjects} active now</span>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2 text-xs">
            <span>Total Escrow Volume</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400">${stats.totalVolume.toLocaleString()}</div>
          <span className="text-[10px] text-emerald-400">{stats.completedContracts} completed</span>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2 text-xs">
            <span>Disputes Open</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-amber-400">{stats.totalDisputes}</div>
          <span className="text-[10px] text-amber-400">Immediate SLA required</span>
        </div>
      </div>

      {/* Recharts Analytics Visualization */}
      <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white">Platform Transaction Volume & Growth</h2>
            <p className="text-xs text-slate-400">Escrow transactions processed ($ USD)</p>
          </div>
          <div className="px-3 py-1 rounded-lg bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
            Q2–Q3 Metrics
          </div>
        </div>

        <div className="h-64 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={stats.analytics}>
              <defs>
                <linearGradient id="volGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f293d" />
              <XAxis dataKey="month" stroke="#64748b" textAnchor="middle" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '12px',
                  fontSize: '12px',
                }}
              />
              <Area type="monotone" dataKey="volume" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#volGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
