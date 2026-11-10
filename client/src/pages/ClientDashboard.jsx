import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import {
  Briefcase,
  PlusCircle,
  FileText,
  DollarSign,
  TrendingUp,
  Sparkles,
  ArrowRight,
  UserCheck,
  CheckCircle2,
} from 'lucide-react';

export default function ClientDashboard() {
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState({
    totalProjects: 3,
    activeContracts: 1,
    proposalsReceived: 4,
    totalSpent: 1100,
  });

  useEffect(() => {
    fetchClientData();
  }, []);

  const fetchClientData = async () => {
    try {
      const res = await API.get('/projects/my/client');
      if (res.data.success && res.data.data.length > 0) {
        setProjects(res.data.data);
        setStats({
          totalProjects: res.data.data.length,
          activeContracts: 1,
          proposalsReceived: res.data.data.reduce((acc, p) => acc + (p.proposalsCount || 0), 0),
          totalSpent: 1100,
        });
      } else {
        // Fallback demo projects
        setProjects([
          {
            _id: 'p-demo-1',
            title: 'Real-time AI Document Processing & Search Dashboard',
            category: 'AI & Machine Learning',
            budgetMin: 1500,
            budgetMax: 3000,
            status: 'in-progress',
            proposalsCount: 3,
          },
          {
            _id: 'p-demo-2',
            title: 'Fintech Micro-investing SaaS Design & UI Architecture',
            category: 'UI/UX Design',
            budgetMin: 800,
            budgetMax: 1800,
            status: 'open',
            proposalsCount: 1,
          },
        ]);
      }
    } catch (e) {
      setProjects([
        {
          _id: 'p-demo-1',
          title: 'Real-time AI Document Processing & Search Dashboard',
          category: 'AI & Machine Learning',
          budgetMin: 1500,
          budgetMax: 3000,
          status: 'in-progress',
          proposalsCount: 3,
        },
      ]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-400 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Client Workspace</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Client Project Management</h1>
          <p className="text-xs text-slate-400 mt-1">
            Monitor open postings, compare AI-matched candidate scores, and release milestone payouts.
          </p>
        </div>

        <Link
          to="/client/create-project"
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          Post New Project
        </Link>
      </div>

      {/* Analytics KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl glass-card border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2 text-xs">
            <span>Posted Projects</span>
            <Briefcase className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold text-white">{stats.totalProjects}</div>
          <span className="text-[10px] text-indigo-400">Total job postings</span>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2 text-xs">
            <span>Proposals Received</span>
            <FileText className="w-4 h-4 text-violet-400" />
          </div>
          <div className="text-2xl font-bold text-white">{stats.proposalsReceived}</div>
          <span className="text-[10px] text-violet-400">Under review</span>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2 text-xs">
            <span>Active Contracts</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white">{stats.activeContracts}</div>
          <span className="text-[10px] text-emerald-400">Milestones running</span>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2 text-xs">
            <span>Escrow & Paid</span>
            <DollarSign className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold text-white">${stats.totalSpent}</div>
          <span className="text-[10px] text-cyan-400">Simulated payments</span>
        </div>
      </div>

      {/* My Projects & Talent Matches Action */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <span>Active Project Postings</span>
          <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold">
            {projects.length}
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project._id}
              className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded bg-indigo-950/80 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase">
                    {project.category}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    project.status === 'in-progress' 
                      ? 'bg-emerald-950/70 border border-emerald-500/30 text-emerald-400' 
                      : 'bg-indigo-950/70 border border-indigo-500/30 text-indigo-400'
                  }`}>
                    {project.status}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-2">{project.title}</h3>
                <div className="text-xs text-slate-400 mb-4">
                  Budget: ${project.budgetMin} – ${project.budgetMax} • {project.proposalsCount || 0} Proposal(s)
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                <Link
                  to={`/client/projects/${project._id}/proposals`}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  Review Proposals ({project.proposalsCount || 0})
                </Link>

                <Link
                  to={`/client/contracts`}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
                >
                  Milestone Workspace
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
