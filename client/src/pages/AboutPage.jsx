import React from 'react';
import { Sparkles, ShieldCheck, Cpu, Layers, CheckCircle2, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-400 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>About SkillBridge.ai</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
          Redefining Freelance Work with Talent Intelligence
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          SkillBridge was engineered to replace guesswork and random bidding with transparent algorithms, verifiable trust metrics, and milestone security.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
          <Cpu className="w-6 h-6 text-indigo-400" />
          <h2 className="text-base font-bold text-white">The Problem with Traditional Freelance Sites</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Freelance marketplaces are flooded with spam proposals, arbitrary reputation badges, and asymmetric information. Clients spend hours sorting through unvetted bids, while skilled developers struggle to showcase real technical compatibility.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
          <ShieldCheck className="w-6 h-6 text-emerald-400" />
          <h2 className="text-base font-bold text-white">The SkillBridge Solution</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Our platform evaluates candidate profiles across 4 transparent dimensions: direct skill intersection, verified project deliverables, budget feasibility, and objective reputation scores. Contracts are guarded by phased milestones and simulated escrow.
          </p>
        </div>
      </div>
    </div>
  );
}
