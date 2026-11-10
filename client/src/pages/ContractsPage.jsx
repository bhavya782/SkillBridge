import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
  FileCheck2,
  CheckCircle2,
  Clock,
  DollarSign,
  Send,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

export default function ContractsPage() {
  const { user } = useAuth();
  const [contracts, setContracts] = useState([]);
  const [submissionNotes, setSubmissionNotes] = useState('');
  const [deliverableUrl, setDeliverableUrl] = useState('');
  const [activeMilestoneId, setActiveMilestoneId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContracts();
  }, []);

  const fetchContracts = async () => {
    try {
      const res = await API.get('/contracts/my');
      if (res.data.success && res.data.data.length > 0) {
        setContracts(res.data.data);
      } else {
        loadDemoContracts();
      }
    } catch (e) {
      loadDemoContracts();
    } finally {
      setLoading(false);
    }
  };

  const loadDemoContracts = () => {
    setContracts([
      {
        _id: 'c-demo-1',
        project: {
          title: 'Real-time AI Document Processing & Search Dashboard',
          category: 'AI & Machine Learning',
        },
        client: { name: 'Marcus Sterling', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
        freelancer: { name: 'Aria Chen', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150' },
        totalAmount: 2200,
        paidAmount: 1100,
        status: 'active',
        milestones: [
          {
            _id: 'm-1',
            title: 'Phase 1: Backend Parsing Microservice & Ingestion Engine',
            description: 'Build text extraction pipeline and semantic embedding endpoints.',
            amount: 1100,
            dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'approved',
            deliverableUrl: 'https://github.com/ariachen-dev/ai-search-engine/pull/1',
            submissionNotes: 'Backend services are up, test suite passing at 98% coverage.',
          },
          {
            _id: 'm-2',
            title: 'Phase 2: React Frontend Search UI & Real-Time Analytics',
            description: 'Interactive dashboard with instant keyword highlight and filter widgets.',
            amount: 1100,
            dueDate: new Date(Date.now() + 16 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'in-progress',
            deliverableUrl: '',
            submissionNotes: '',
          },
        ],
      },
    ]);
  };

  const handleSubmitMilestone = async (milestoneId) => {
    try {
      await API.put(`/contracts/milestones/${milestoneId}/submit`, {
        deliverableUrl,
        submissionNotes,
      });
      fetchContracts();
      setActiveMilestoneId(null);
    } catch (e) {
      // Local demo state update
      setContracts((prev) =>
        prev.map((c) => ({
          ...c,
          milestones: c.milestones.map((m) =>
            m._id === milestoneId
              ? { ...m, status: 'submitted', deliverableUrl, submissionNotes }
              : m
          ),
        }))
      );
      setActiveMilestoneId(null);
    }
  };

  const handleApproveMilestone = async (milestoneId) => {
    try {
      await API.put(`/contracts/milestones/${milestoneId}/approve`);
      fetchContracts();
    } catch (e) {
      // Local demo state update
      setContracts((prev) =>
        prev.map((c) => ({
          ...c,
          paidAmount: c.totalAmount,
          status: 'completed',
          milestones: c.milestones.map((m) =>
            m._id === milestoneId ? { ...m, status: 'approved' } : m
          ),
        }))
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Simulated Escrow & Deliverable Tracking</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">Active Contracts & Milestones</h1>
        <p className="text-xs text-slate-400 mt-1">
          Review deliverables, release simulated escrow funds, and verify milestone deadlines.
        </p>
      </div>

      <div className="space-y-8">
        {contracts.map((contract) => (
          <div key={contract._id} className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
                  Contract #{contract._id.slice(-6)}
                </span>
                <h2 className="text-lg font-bold text-white mt-0.5">{contract.project?.title}</h2>
                <div className="text-xs text-slate-400 mt-1 flex items-center gap-4">
                  <span>Client: <strong className="text-white">{contract.client?.name}</strong></span>
                  <span>Freelancer: <strong className="text-white">{contract.freelancer?.name}</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-right">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Total Escrow</div>
                  <div className="text-lg font-bold text-emerald-400">${contract.totalAmount}</div>
                </div>
                <div className="h-8 w-px bg-slate-800" />
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Paid Out</div>
                  <div className="text-lg font-bold text-indigo-400">${contract.paidAmount}</div>
                </div>
              </div>
            </div>

            {/* Milestones list */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Milestone Deliverable Timeline
              </h3>

              <div className="space-y-3">
                {contract.milestones?.map((m, idx) => (
                  <div
                    key={m._id}
                    className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
                  >
                    <div className="space-y-1 max-w-xl">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 font-bold flex items-center justify-center text-[10px]">
                          {idx + 1}
                        </span>
                        <h4 className="font-bold text-white text-xs">{m.title}</h4>
                        <span
                          className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                            m.status === 'approved'
                              ? 'bg-emerald-950/70 text-emerald-400 border border-emerald-500/30'
                              : m.status === 'submitted'
                              ? 'bg-cyan-950/70 text-cyan-400 border border-cyan-500/30'
                              : 'bg-amber-950/70 text-amber-400 border border-amber-500/30'
                          }`}
                        >
                          {m.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 pl-7">{m.description}</p>

                      {m.deliverableUrl && (
                        <div className="pl-7 pt-1">
                          <a
                            href={m.deliverableUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[11px] text-indigo-400 hover:underline flex items-center gap-1 font-semibold"
                          >
                            <ExternalLink className="w-3 h-3" />
                            Deliverable: {m.deliverableUrl}
                          </a>
                          {m.submissionNotes && (
                            <p className="text-[10px] text-slate-400 mt-0.5">Note: "{m.submissionNotes}"</p>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-3 self-end md:self-auto shrink-0">
                      <div className="text-right">
                        <div className="font-bold text-white text-xs">${m.amount}</div>
                        <div className="text-[10px] text-slate-500">
                          Due: {new Date(m.dueDate).toLocaleDateString()}
                        </div>
                      </div>

                      {/* Freelancer Action: Submit Work */}
                      {user?.role === 'freelancer' && m.status === 'in-progress' && (
                        <button
                          onClick={() => setActiveMilestoneId(m._id)}
                          className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-[11px] transition-colors"
                        >
                          Submit Work
                        </button>
                      )}

                      {/* Client Action: Approve & Release Payment */}
                      {user?.role === 'client' && m.status === 'submitted' && (
                        <button
                          onClick={() => handleApproveMilestone(m._id)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-[11px] transition-colors shadow-md shadow-emerald-600/30 flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Approve & Pay ${m.amount}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Freelancer Submission Form Modal Inline */}
              {activeMilestoneId && (
                <div className="p-4 rounded-xl glass-card border border-indigo-500/40 space-y-3 mt-4">
                  <h4 className="text-xs font-bold text-indigo-300">Submit Milestone Deliverable</h4>
                  <div>
                    <label className="block text-[11px] text-slate-300 mb-1">
                      Deliverable Link (GitHub PR, Figma, Deployment URL)
                    </label>
                    <input
                      type="text"
                      value={deliverableUrl}
                      onChange={(e) => setDeliverableUrl(e.target.value)}
                      placeholder="https://github.com/..."
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-300 mb-1">Submission Notes</label>
                    <textarea
                      rows={2}
                      value={submissionNotes}
                      onChange={(e) => setSubmissionNotes(e.target.value)}
                      placeholder="Summary of completed items for client review..."
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setActiveMilestoneId(null)}
                      className="px-3 py-1 rounded-lg bg-slate-800 text-slate-400 text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSubmitMilestone(activeMilestoneId)}
                      className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs"
                    >
                      Confirm Submission
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
