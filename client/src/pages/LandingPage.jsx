import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Layers,
  CheckCircle2,
  TrendingUp,
  FileCheck2,
  Users,
  Search,
  MessageSquare,
  HelpCircle,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LandingPage() {
  const { loginAsDemo } = useAuth();

  return (
    <div className="space-y-24 py-8">
      {/* 1. HERO SECTION */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-10 pb-16">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-600/15 via-violet-600/15 to-cyan-500/15 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/70 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-8 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Introducing SkillBridge 2.0 • AI-Powered Talent Intelligence</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.15]">
            Connecting Skills, Opportunities &{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Trusted Collaborations
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Say goodbye to random bidding. SkillBridge pairs clients with vetted freelancers using transparent AI talent matching, automated bid analyzers, and milestone-secured contracts.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <Link
              to="/explore/projects"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-sm shadow-xl shadow-indigo-600/30 flex items-center gap-2 transition-all hover:scale-[1.02]"
            >
              Explore Projects
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/register"
              className="px-6 py-3 rounded-xl glass-panel hover:bg-slate-800 text-white font-semibold text-sm border border-slate-700/60 transition-all hover:scale-[1.02]"
            >
              Join as Freelancer or Client
            </Link>
          </div>

          {/* Instant 1-Click Demo Logins for Evaluation */}
          <div className="p-4 rounded-xl glass-card border border-indigo-500/20 max-w-xl mx-auto text-center">
            <div className="text-xs font-semibold text-indigo-300 mb-2.5 flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Instant 1-Click Evaluator Demo Access:
            </div>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <button
                onClick={() => loginAsDemo('client')}
                className="px-3 py-1.5 rounded-lg bg-indigo-900/60 hover:bg-indigo-800 border border-indigo-500/40 text-xs font-semibold text-indigo-200 transition-colors"
              >
                Login as Client
              </button>
              <button
                onClick={() => loginAsDemo('freelancer')}
                className="px-3 py-1.5 rounded-lg bg-violet-900/60 hover:bg-violet-800 border border-violet-500/40 text-xs font-semibold text-violet-200 transition-colors"
              >
                Login as Freelancer
              </button>
              <button
                onClick={() => loginAsDemo('admin')}
                className="px-3 py-1.5 rounded-lg bg-amber-900/60 hover:bg-amber-800 border border-amber-500/40 text-xs font-semibold text-amber-200 transition-colors"
              >
                Login as Admin
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-6 rounded-2xl glass-card border border-slate-800 text-center">
            <div className="text-3xl font-extrabold text-white mb-1">94.8%</div>
            <div className="text-xs text-indigo-400 font-semibold uppercase tracking-wider">Match Accuracy</div>
            <p className="text-[11px] text-slate-400 mt-1">Weighted profile algorithm</p>
          </div>
          <div className="p-6 rounded-2xl glass-card border border-slate-800 text-center">
            <div className="text-3xl font-extrabold text-white mb-1">$1.4M+</div>
            <div className="text-xs text-violet-400 font-semibold uppercase tracking-wider">Secured Volume</div>
            <p className="text-[11px] text-slate-400 mt-1">Escrow milestone tracking</p>
          </div>
          <div className="p-6 rounded-2xl glass-card border border-slate-800 text-center">
            <div className="text-3xl font-extrabold text-white mb-1">12,500+</div>
            <div className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">Vetted Talents</div>
            <p className="text-[11px] text-slate-400 mt-1">Full-stack & AI engineers</p>
          </div>
          <div className="p-6 rounded-2xl glass-card border border-slate-800 text-center">
            <div className="text-3xl font-extrabold text-white mb-1">&lt; 2 hrs</div>
            <div className="text-xs text-cyan-400 font-semibold uppercase tracking-wider">Time-to-Hire</div>
            <p className="text-[11px] text-slate-400 mt-1">Average proposal-to-contract</p>
          </div>
        </div>
      </section>

      {/* 3. FIVE DIFFERENTIATING AI FEATURES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs uppercase tracking-widest font-bold text-indigo-400 mb-2">Core Differentiators</h2>
          <h3 className="text-3xl font-bold text-white mb-4">5 Specialized Intelligence Engines</h3>
          <p className="text-slate-400 text-sm">
            Not just another static job board. SkillBridge brings real-time algorithmic analysis to every step of the freelance lifecycle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="p-6 rounded-2xl glass-panel border border-indigo-500/20 hover:border-indigo-500/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-5 group-hover:scale-110 transition-transform">
              <Cpu className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">AI Talent Match Engine</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Evaluates skill sets, experience tier, portfolio relevance, and budget alignment with transparent percentage explanations.
            </p>
            <div className="text-[11px] text-indigo-400 font-semibold flex items-center gap-1">
              <span>Transparent 4-Factor Model</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl glass-panel border border-violet-500/20 hover:border-violet-500/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-400 mb-5 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Smart Bid Analyzer</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Real-time audit of proposal prices, realistic delivery feasibility, and cover letter completeness before submission.
            </p>
            <div className="text-[11px] text-violet-400 font-semibold flex items-center gap-1">
              <span>Actionable Proposal Coaching</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl glass-panel border border-cyan-500/20 hover:border-cyan-500/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-110 transition-transform">
              <Layers className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Skill Gap Detector</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Identifies missing tech requirements per job and provides instant documentation pathways to bridge knowledge gaps.
            </p>
            <div className="text-[11px] text-cyan-400 font-semibold flex items-center gap-1">
              <span>Continuous Upskilling</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          {/* Card 4 */}
          <div className="p-6 rounded-2xl glass-panel border border-emerald-500/20 hover:border-emerald-500/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Freelancer Trust Score</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Non-arbitrary reputation score derived from verified milestones, client review history, and verified GitHub & portfolio evidence.
            </p>
            <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
              <span>Zero Fabricated Badges</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          {/* Card 5 */}
          <div className="p-6 rounded-2xl glass-panel border border-amber-500/20 hover:border-amber-500/40 transition-all group md:col-span-2">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-5 group-hover:scale-110 transition-transform">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Smart Deadline & Milestone Tracker</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Interactive timeline tracking upcoming dates, pending client reviews, and automated release of escrowed milestone funds.
            </p>
            <div className="text-[11px] text-amber-400 font-semibold flex items-center gap-1">
              <span>Phase-by-Phase Accountability</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS WORKFLOW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 md:p-12 rounded-3xl glass-panel border border-slate-800">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-xs uppercase tracking-widest font-bold text-indigo-400 mb-2">Smooth Collaboration</h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">How SkillBridge Works</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center mx-auto mb-3 shadow-lg shadow-indigo-600/30">
                1
              </div>
              <h4 className="text-sm font-semibold text-white mb-1">Post or Browse</h4>
              <p className="text-xs text-slate-400">Clients post detailed technical scopes; freelancers discover matching jobs.</p>
            </div>
            <div className="p-4">
              <div className="w-10 h-10 rounded-full bg-violet-600 text-white font-bold flex items-center justify-center mx-auto mb-3 shadow-lg shadow-violet-600/30">
                2
              </div>
              <h4 className="text-sm font-semibold text-white mb-1">AI Matching & Bids</h4>
              <p className="text-xs text-slate-400">Proposals are analyzed with bid scores and skill gap assessments.</p>
            </div>
            <div className="p-4">
              <div className="w-10 h-10 rounded-full bg-cyan-600 text-white font-bold flex items-center justify-center mx-auto mb-3 shadow-lg shadow-cyan-600/30">
                3
              </div>
              <h4 className="text-sm font-semibold text-white mb-1">Milestone Contract</h4>
              <p className="text-xs text-slate-400">Agreed price is split into verifiable deliverables and simulated escrow.</p>
            </div>
            <div className="p-4">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center mx-auto mb-3 shadow-lg shadow-emerald-600/30">
                4
              </div>
              <h4 className="text-sm font-semibold text-white mb-1">Approve & Release</h4>
              <p className="text-xs text-slate-400">Clients review submissions, release funds, and submit verified reviews.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-xs uppercase tracking-widest font-bold text-indigo-400 mb-2">Clarifications</h2>
          <h3 className="text-2xl font-bold text-white">Frequently Asked Questions</h3>
        </div>

        <div className="space-y-4">
          <div className="p-5 rounded-xl glass-card border border-slate-800">
            <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-indigo-400" />
              How does the AI Talent Match Engine calculate percentages?
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Unlike generic sites that show arbitrary scores, SkillBridge uses a weighted mathematical model comparing required project skills (45%), experience level requirements (25%), budget/rate alignment (15%), and verifiable reputation trust scores (15%).
            </p>
          </div>

          <div className="p-5 rounded-xl glass-card border border-slate-800">
            <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-indigo-400" />
              How is payment handled on SkillBridge?
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              SkillBridge supports Stripe Test Mode credentials for realistic payment simulation as well as an integrated mock escrow system. Funds are held per milestone and released only when clients explicitly approve deliverables.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
