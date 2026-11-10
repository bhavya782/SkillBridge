import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import { Search, Filter, Briefcase, Calendar, DollarSign, Sparkles, ArrowRight } from 'lucide-react';

// Fallback high-quality project fixtures if backend DB connection is not initialized
const DEMO_PROJECTS = [
  {
    _id: 'p-demo-1',
    title: 'Real-time AI Document Processing & Search Dashboard',
    description: 'We need an enterprise-grade web application to upload PDFs, extract text with OCR/LLMs, and provide semantic instant search with high responsiveness.',
    category: 'AI & Machine Learning',
    skillsRequired: ['React', 'Python', 'Node.js', 'Docker', 'REST APIs'],
    budgetMin: 1500,
    budgetMax: 3000,
    deadline: '2026-12-15T00:00:00.000Z',
    experienceLevel: 'Expert',
    proposalsCount: 3,
    client: { name: 'Marcus Sterling', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
  },
  {
    _id: 'p-demo-2',
    title: 'Fintech Micro-investing SaaS Design & UI Architecture',
    description: 'Seeking a seasoned UI engineer to craft a dark-mode, animated analytics portal with interactive charts and clean accessible components.',
    category: 'UI/UX Design',
    skillsRequired: ['React', 'Tailwind CSS', 'Framer Motion', 'Figma'],
    budgetMin: 800,
    budgetMax: 1800,
    deadline: '2026-11-28T00:00:00.000Z',
    experienceLevel: 'Intermediate',
    proposalsCount: 1,
    client: { name: 'Elena Rostova', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' },
  },
  {
    _id: 'p-demo-3',
    title: 'Cloud DevOps CI/CD Pipeline Automation with Docker',
    description: 'Setup continuous deployment across staging and production clusters with automated linting, security scans, and database migrations.',
    category: 'DevOps & Cloud',
    skillsRequired: ['Docker', 'Kubernetes', 'CI/CD Pipelines', 'AWS'],
    budgetMin: 1000,
    budgetMax: 2200,
    deadline: '2026-12-05T00:00:00.000Z',
    experienceLevel: 'Intermediate',
    proposalsCount: 0,
    client: { name: 'David Chen', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' },
  },
];

export default function ExploreProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [level, setLevel] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, [category, level]);

  const fetchProjects = async () => {
    try {
      const res = await API.get('/projects', {
        params: {
          category: category !== 'All' ? category : undefined,
          experienceLevel: level !== 'All' ? level : undefined,
          search: search || undefined,
        },
      });
      if (res.data.success && res.data.data.length > 0) {
        setProjects(res.data.data);
      } else {
        setProjects(DEMO_PROJECTS);
      }
    } catch (e) {
      setProjects(DEMO_PROJECTS);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchProjects();
  };

  const filtered = projects.filter((p) => {
    const matchesSearch = !search || 
      p.title.toLowerCase().includes(search.toLowerCase()) || 
      p.skillsRequired?.some(s => s.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = category === 'All' || p.category === category;
    const matchesLevel = level === 'All' || p.experienceLevel === level;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-400 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI-Indexed Technical Opportunities</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Explore Projects</h1>
          <p className="text-xs text-slate-400 mt-1">
            Discover verified freelance contracts with transparent budgets and automated AI skill-matching.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 max-w-md w-full">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by keywords, skills (e.g. React, Docker)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {/* Filter Row */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Filter className="w-3.5 h-3.5" />
          <span>Category:</span>
        </div>
        {['All', 'Web Development', 'AI & Machine Learning', 'UI/UX Design', 'DevOps & Cloud'].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              category === cat
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}

        <div className="h-4 w-px bg-slate-800 mx-2 hidden sm:block" />

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>Tier:</span>
        </div>
        {['All', 'Entry', 'Intermediate', 'Expert'].map((lvl) => (
          <button
            key={lvl}
            onClick={() => setLevel(lvl)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              level === lvl
                ? 'bg-violet-600 text-white'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {lvl}
          </button>
        ))}
      </div>

      {/* Projects List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((project) => (
          <div
            key={project._id}
            className="glass-panel p-6 rounded-2xl border border-slate-800/80 hover:border-indigo-500/40 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-1 rounded-md bg-indigo-950/60 text-indigo-400 border border-indigo-500/20 text-[10px] font-bold uppercase tracking-wider">
                  {project.category}
                </span>
                <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5 -mr-0.5" />
                  {project.budgetMin} – ${project.budgetMax}
                </span>
              </div>

              <h3 className="text-base font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors line-clamp-2">
                {project.title}
              </h3>

              <p className="text-xs text-slate-400 line-clamp-3 mb-4 leading-relaxed">
                {project.description}
              </p>

              {/* Skills required badges */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.skillsRequired?.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-slate-800/90 text-slate-300 text-[11px] border border-slate-700/60"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-300">
                  {project.client?.name ? project.client.name.charAt(0) : 'C'}
                </div>
                <span className="text-slate-400 text-[11px]">{project.client?.name || 'Verified Client'}</span>
              </div>

              <Link
                to={`/projects/${project._id}`}
                className="px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white font-semibold text-xs transition-all flex items-center gap-1"
              >
                View & Bid
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
