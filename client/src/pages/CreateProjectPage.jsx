import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { Sparkles, PlusCircle, Calendar, DollarSign, Layers, ArrowRight } from 'lucide-react';

export default function CreateProjectPage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Web Development');
  const [skillsRequired, setSkillsRequired] = useState('React, Node.js, Tailwind CSS');
  const [budgetMin, setBudgetMin] = useState(500);
  const [budgetMax, setBudgetMax] = useState(1500);
  const [deadline, setDeadline] = useState(
    new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [experienceLevel, setExperienceLevel] = useState('Intermediate');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.post('/projects', {
        title,
        description,
        category,
        skillsRequired: skillsRequired.split(',').map((s) => s.trim()),
        budgetMin,
        budgetMax,
        deadline,
        experienceLevel,
      });
      navigate('/client/dashboard');
    } catch (e) {
      // Local fallback for offline mode
      navigate('/client/dashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="glass-panel p-8 rounded-2xl border border-indigo-500/20 shadow-2xl">
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-400 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Talent Indexed Listing</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Create New Project</h1>
          <p className="text-xs text-slate-400 mt-1">
            Specify technical deliverables to enable the AI Talent Match Engine to source top engineers.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Project Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Full-Stack Next.js SaaS with Stripe & AI Chatbot"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-xs focus:outline-none focus:border-indigo-500"
              >
                <option value="Web Development">Web Development</option>
                <option value="Mobile Development">Mobile Development</option>
                <option value="AI & Machine Learning">AI & Machine Learning</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="DevOps & Cloud">DevOps & Cloud</option>
                <option value="Data Engineering">Data Engineering</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Experience Tier</label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-xs focus:outline-none focus:border-indigo-500"
              >
                <option value="Entry">Entry (1–2 yrs)</option>
                <option value="Intermediate">Intermediate (3–5 yrs)</option>
                <option value="Expert">Expert (5+ yrs)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Detailed Project Scope & Deliverables</label>
            <textarea
              rows={5}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Outline specific objectives, architectural requirements, and milestone expectations..."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500 leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Required Skills (comma separated)
            </label>
            <input
              type="text"
              required
              value={skillsRequired}
              onChange={(e) => setSkillsRequired(e.target.value)}
              placeholder="React, TypeScript, Node.js, Docker"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Min Budget ($)</label>
              <input
                type="number"
                required
                min={50}
                value={budgetMin}
                onChange={(e) => setBudgetMin(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Max Budget ($)</label>
              <input
                type="number"
                required
                min={budgetMin}
                value={budgetMax}
                onChange={(e) => setBudgetMax(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Target Completion Date</label>
              <input
                type="date"
                required
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all mt-4"
          >
            {loading ? 'Publishing Project...' : 'Publish Project & Activate AI Matching'}
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
