import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Github, Twitter, Linkedin, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-[#0a0d14]/90 backdrop-blur-md pt-12 pb-8 mt-20 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand info */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white text-base">SkillBridge.ai</span>
            </Link>
            <p className="text-slate-400 leading-relaxed mb-4">
              AI-Powered Freelance Marketplace & Talent Intelligence Platform connecting skills, transparent trust scores, and milestone contracts.
            </p>
            <div className="flex items-center gap-3 text-slate-400">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-semibold text-white mb-3 text-sm">Platform</h4>
            <ul className="space-y-2">
              <li><Link to="/explore/projects" className="hover:text-indigo-400 transition-colors">Explore Projects</Link></li>
              <li><Link to="/explore/freelancers" className="hover:text-indigo-400 transition-colors">Top Freelancers</Link></li>
              <li><Link to="/about" className="hover:text-indigo-400 transition-colors">About SkillBridge</Link></li>
              <li><Link to="/contact" className="hover:text-indigo-400 transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          {/* AI Features */}
          <div>
            <h4 className="font-semibold text-white mb-3 text-sm">Intelligence Engines</h4>
            <ul className="space-y-2">
              <li className="text-slate-400">AI Talent Match Engine</li>
              <li className="text-slate-400">Smart Bid Analyzer</li>
              <li className="text-slate-400">Skill Gap Detector</li>
              <li className="text-slate-400">Freelancer Trust Score</li>
              <li className="text-slate-400">Smart Deadline Monitor</li>
            </ul>
          </div>

          {/* Trust & Compliance */}
          <div>
            <h4 className="font-semibold text-white mb-3 text-sm">Security & Contracts</h4>
            <ul className="space-y-2">
              <li className="text-slate-400">Simulated Milestone Escrow</li>
              <li className="text-slate-400">Dispute Resolution Desk</li>
              <li className="text-slate-400">Verified Work History</li>
              <li className="text-slate-400">Socket.IO Encrypted Chat</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} SkillBridge Inc. All rights reserved.</p>
          <p className="flex items-center gap-1.5 text-slate-500">
            Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Next-Gen Talent & Technical Collaboration
          </p>
        </div>
      </div>
    </footer>
  );
}
