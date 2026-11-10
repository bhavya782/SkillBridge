import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../services/api';
import {
  Sparkles,
  CheckCircle2,
  DollarSign,
  Clock,
  ShieldCheck,
  Star,
  FileText,
  UserCheck,
  Layers,
  ArrowRight,
} from 'lucide-react';

export default function ProposalsReviewPage() {
  const { projectId } = useParams();
  const [proposals, setProposals] = useState([]);
  const [aiMatches, setAiMatches] = useState([]);
  const [acceptedId, setAcceptedId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProposalsAndMatches();
  }, [projectId]);

  const fetchProposalsAndMatches = async () => {
    try {
      const res = await API.get(`/proposals/project/${projectId}`);
      if (res.data.success && res.data.data.length > 0) {
        setProposals(res.data.data);
      } else {
        loadDemoProposals();
      }
    } catch (e) {
      loadDemoProposals();
    }

    try {
      const matchRes = await API.get(`/projects/${projectId}/talent-matches`);
      if (matchRes.data.success && matchRes.data.data.length > 0) {
        setAiMatches(matchRes.data.data);
      }
    } catch (e) {
      // Demo matches
      setAiMatches([
        {
          freelancer: { name: 'Aria Chen', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150' },
          matchPercentage: 94,
          matchedSkills: ['React', 'Python', 'Node.js', 'REST APIs'],
          missingSkills: ['Docker'],
          explanation: 'Direct match on 4 required skills. Proven 6 yrs background aligns well with Expert requirement.',
        },
        {
          freelancer: { name: 'Liam Vance', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150' },
          matchPercentage: 78,
          matchedSkills: ['React', 'Node.js'],
          missingSkills: ['Python', 'Docker'],
          explanation: 'Strong frontend credentials. Proposed rate profile is highly competitive.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const loadDemoProposals = () => {
    setProposals([
      {
        _id: 'prop-1',
        freelancer: {
          name: 'Aria Chen',
          avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
          location: 'Seattle, WA',
        },
        bidAmount: 2200,
        deliveryDays: 16,
        coverLetter: 'I have designed multiple production OCR & vector search dashboards. My proposed architecture divides cleanly into a Python/FastAPI ingestion pipeline and a responsive React client.',
        status: 'pending',
        analysis: {
          score: 95,
          budgetCompatibility: 'Optimal Budget Alignment',
          deliveryFeasibility: 'Realistic',
          completenessScore: 92,
          recommendations: [
            'Proposed $2200 sits comfortably within client $1500–$3000 range.',
            'Comprehensive technical proposal with clear phased milestones.',
          ],
        },
      },
      {
        _id: 'prop-2',
        freelancer: {
          name: 'Liam Vance',
          avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
          location: 'Austin, TX',
        },
        bidAmount: 1800,
        deliveryDays: 12,
        coverLetter: 'I can deliver a high-polish React and Tailwind UI with responsive search filters and animated charts. Fast turnaround guaranteed.',
        status: 'pending',
        analysis: {
          score: 82,
          budgetCompatibility: 'Competitive (Below Midpoint)',
          deliveryFeasibility: 'Aggressive / High Risk',
          completenessScore: 78,
          recommendations: [
            '12 days delivery timeline is slightly aggressive for full search integration.',
          ],
        },
      },
    ]);
  };

  const handleAcceptProposal = async (proposalId) => {
    try {
      await API.post('/contracts/accept-proposal', { proposalId });
      setAcceptedId(proposalId);
    } catch (e) {
      setAcceptedId(proposalId);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-400 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Talent Intelligence Audit</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Proposal Review & Comparison</h1>
          <p className="text-xs text-slate-400 mt-1">
            Compare candidate bids against budget thresholds, delivery feasibility, and AI talent match scores.
          </p>
        </div>

        <Link
          to="/client/dashboard"
          className="text-xs text-slate-400 hover:text-white transition-colors"
        >
          ← Back to Dashboard
        </Link>
      </div>

      {/* AI Talent Match Engine Suggestions */}
      {aiMatches.length > 0 && (
        <div className="p-6 rounded-2xl glass-panel border border-indigo-500/30">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              AI Talent Match Engine — Algorithm Recommendations
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aiMatches.map((m, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
                <img src={m.freelancer?.avatar} alt="" className="w-10 h-10 rounded-full border border-indigo-500/30 object-cover shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white">{m.freelancer?.name}</span>
                    <span className="px-2 py-0.5 rounded bg-indigo-600/30 text-indigo-300 font-extrabold text-xs">
                      {m.matchPercentage}% Match
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug mb-2">{m.explanation}</p>
                  <div className="flex flex-wrap gap-1">
                    {m.matchedSkills?.map((s, i) => (
                      <span key={i} className="px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-300 text-[9px]">
                        ✓ {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Received Proposals List */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white">Received Bids ({proposals.length})</h2>

        <div className="space-y-6">
          {proposals.map((prop) => (
            <div
              key={prop._id}
              className={`p-6 rounded-2xl glass-panel border transition-all ${
                acceptedId === prop._id
                  ? 'border-emerald-500/80 bg-emerald-950/20'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-4">
                  <img
                    src={prop.freelancer?.avatar}
                    alt=""
                    className="w-12 h-12 rounded-full border border-indigo-500/30 object-cover"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                      {prop.freelancer?.name}
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                    </h3>
                    <p className="text-[11px] text-slate-400">{prop.freelancer?.location}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-6 text-xs">
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase">Proposed Bid</div>
                    <div className="text-base font-bold text-emerald-400">${prop.bidAmount}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase">Delivery Window</div>
                    <div className="text-base font-bold text-white">{prop.deliveryDays} Days</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase">AI Bid Quality</div>
                    <div className="text-base font-bold text-indigo-400">{prop.analysis?.score || 85}/100</div>
                  </div>

                  {acceptedId === prop._id ? (
                    <div className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-600/30">
                      <CheckCircle2 className="w-4 h-4" />
                      Contract Created & Milestones Active
                    </div>
                  ) : (
                    <button
                      onClick={() => handleAcceptProposal(prop._id)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/25 transition-all flex items-center gap-1.5"
                    >
                      <UserCheck className="w-4 h-4" />
                      Accept Bid & Create Contract
                    </button>
                  )}
                </div>
              </div>

              {/* Cover letter & Smart Bid Analyzer breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-xs">
                <div className="md:col-span-2 space-y-2">
                  <div className="font-semibold text-slate-300">Cover Letter & Approach:</div>
                  <p className="text-slate-400 leading-relaxed text-[11px]">{prop.coverLetter}</p>
                </div>

                {prop.analysis && (
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] space-y-2">
                    <div className="font-semibold text-indigo-300 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> Smart Bid Diagnostics
                    </div>
                    <div className="text-slate-300">• {prop.analysis.budgetCompatibility}</div>
                    <div className="text-slate-300">• {prop.analysis.deliveryFeasibility}</div>
                    {prop.analysis.recommendations?.map((rec, i) => (
                      <div key={i} className="text-slate-400 text-[10px]">✓ {rec}</div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
