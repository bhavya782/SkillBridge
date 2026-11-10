import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, ShieldCheck, CheckCircle2, Github, Linkedin, ExternalLink, Sparkles } from 'lucide-react';

const TOP_FREELANCERS = [
  {
    id: 'f-1',
    name: 'Aria Chen',
    title: 'Senior Full-Stack & AI Systems Architect',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
    skills: ['React', 'Node.js', 'Python', 'Tailwind CSS', 'Docker', 'REST APIs', 'FastAPI'],
    hourlyRate: 65,
    experienceYears: 6,
    trustScore: 94,
    rating: 4.95,
    reviewsCount: 14,
    location: 'Seattle, WA',
    githubUrl: 'https://github.com/ariachen-dev',
    linkedinUrl: 'https://linkedin.com',
  },
  {
    id: 'f-2',
    name: 'Liam Vance',
    title: 'Lead Frontend & Design Systems Specialist',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Figma', 'UI/UX Design'],
    hourlyRate: 50,
    experienceYears: 4,
    trustScore: 88,
    rating: 4.88,
    reviewsCount: 9,
    location: 'Austin, TX',
    githubUrl: 'https://github.com',
    linkedinUrl: 'https://linkedin.com',
  },
  {
    id: 'f-3',
    name: 'Sofia Al-Mansoor',
    title: 'Cloud DevOps & Infrastructure Automation Engineer',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    skills: ['Docker', 'Kubernetes', 'CI/CD Pipelines', 'AWS', 'Terraform', 'PostgreSQL'],
    hourlyRate: 75,
    experienceYears: 7,
    trustScore: 96,
    rating: 5.0,
    reviewsCount: 22,
    location: 'Toronto, Canada',
    githubUrl: 'https://github.com',
    linkedinUrl: 'https://linkedin.com',
  },
];

export default function ExploreFreelancersPage() {
  const [search, setSearch] = useState('');

  const filtered = TOP_FREELANCERS.filter((f) => 
    !search || 
    f.name.toLowerCase().includes(search.toLowerCase()) || 
    f.skills.some(s => s.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-950/60 border border-violet-500/30 text-violet-400 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Verified Talent Directory</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Top Technical Freelancers</h1>
          <p className="text-xs text-slate-400 mt-1">
            Engineers and designers with multi-factor trust scores, verified portfolio evidence, and on-time ratings.
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-sm w-full">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search freelancers by skill or name..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-violet-500"
          />
        </div>
      </div>

      {/* Freelancers List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((freelancer) => (
          <div
            key={freelancer.id}
            className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-violet-500/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={freelancer.avatar}
                    alt={freelancer.name}
                    className="w-12 h-12 rounded-full border border-violet-500/40 object-cover"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                      {freelancer.name}
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                    </h3>
                    <p className="text-[11px] text-slate-400">{freelancer.location}</p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-bold text-white">${freelancer.hourlyRate}/hr</div>
                  <div className="text-[10px] text-slate-400">{freelancer.experienceYears}+ yrs exp</div>
                </div>
              </div>

              <div className="text-xs font-medium text-slate-200 mb-3">{freelancer.title}</div>

              {/* Trust Score & Rating Pill */}
              <div className="grid grid-cols-2 gap-2 p-2.5 bg-slate-900/80 rounded-xl mb-4 border border-slate-800">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <div className="text-[10px] text-slate-400 leading-tight">Trust Score</div>
                    <div className="text-xs font-bold text-emerald-300">{freelancer.trustScore}/100</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" />
                  <div>
                    <div className="text-[10px] text-slate-400 leading-tight">Rating</div>
                    <div className="text-xs font-bold text-white">{freelancer.rating} ({freelancer.reviewsCount})</div>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-1 mb-6">
                {freelancer.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 text-[10px] border border-slate-700/50"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <a
                  href={freelancer.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded-lg bg-slate-800 hover:text-white text-slate-400 transition-colors"
                  title="GitHub Profile"
                >
                  <Github className="w-3.5 h-3.5" />
                </a>
                <a
                  href={freelancer.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded-lg bg-slate-800 hover:text-white text-slate-400 transition-colors"
                  title="LinkedIn"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
              </div>

              <Link
                to="/explore/projects"
                className="px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs transition-colors"
              >
                Invite to Project
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
