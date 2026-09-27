'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  User,
  ShieldCheck,
  Camera,
  MapPin,
  Mail,
  Link2,
  Terminal,
  Globe,
  Edit,
  Eye,
  Target,
  School,
  Briefcase,
  FolderGit2,
  CheckCircle2,
  Plus,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Award,
  Sparkles,
} from 'lucide-react';
import { mockUserProfile } from '@/data/mock/dashboardData';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const [name, setName] = useState('Mohit Upraity');
  const [headline, setHeadline] = useState('AI Engineer | Full-Stack Developer | DRDO Intern');
  const [location, setLocation] = useState('Agra, India');
  const [email, setEmail] = useState('mohitupraity@email.com');
  const [bio, setBio] = useState(
    'Computer Science student passionate about AI, ML, cybersecurity and building real-world products. Currently exploring LLMs, RAG and AI agents while developing full-stack applications.'
  );

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = () => {
    setIsEditing(false);
    triggerToast('Profile & Career Targets updated successfully!');
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-xl border border-slate-700 animate-in fade-in slide-in-from-bottom-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toast}</span>
        </div>
      )}

      {/* Top Header Banner & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="font-mono text-xs text-slate-400 uppercase tracking-wider font-semibold">
            CAREER IDENTITY &amp; GOAL SPECIFICATION
          </span>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
            Profile &amp; Career Goal
          </h1>
          <p className="text-sm text-slate-500">
            Manage your verified identity, career trajectories, and telemetry constraints.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => triggerToast('Public profile preview link copied to clipboard!')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs font-semibold text-xs"
          >
            <Eye className="w-3.5 h-3.5 text-slate-400" />
            <span>Preview Public Profile</span>
          </button>

          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white transition-colors shadow-2xs font-semibold text-xs"
          >
            <Edit className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Close Editor' : 'Edit Profile'}</span>
          </button>
        </div>
      </div>

      {/* Master 2-Column Split (8 cols Left / 4 cols Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT / MAIN WORKSPACE (8 Columns) */}
        <div className="lg:col-span-8 flex flex-col space-y-6">
          {/* Profile Header Summary Card */}
          <div className="rounded-xl bg-white border border-slate-200 p-6 shadow-card flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 flex-1 min-w-0">
              {/* Avatar with Camera Badge */}
              <div className="relative shrink-0">
                <img
                  className="w-20 h-20 rounded-full object-cover shadow-xs border-2 border-white"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
                  alt="Mohit Upraity"
                />
                <button
                  type="button"
                  onClick={() => triggerToast('Avatar change dialog opened.')}
                  className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center shadow-md hover:bg-primary-hover transition-colors"
                  title="Change photo"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Metadata Info */}
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-slate-900 truncate">{name}</h2>
                  <span title="Verified Profile"><ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" /></span>
                </div>
                <p className="text-xs font-medium text-slate-600 truncate">{headline}</p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 pt-0.5">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{location}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 font-mono text-[11px]">
                    <Mail className="w-3.5 h-3.5" />
                    <span>{email}</span>
                  </span>
                </div>

                {/* Social Micro Links */}
                <div className="flex items-center gap-4 pt-2 text-xs">
                  <a
                    href="https://linkedin.com/in/mohitupraity"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-primary hover:underline font-medium"
                  >
                    <Link2 className="w-3.5 h-3.5" />
                    <span>linkedin.com/in/mohitupraity</span>
                  </a>
                  <a
                    href="https://github.com/mohitupraity"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-900 font-medium"
                  >
                    <Terminal className="w-3.5 h-3.5" />
                    <span>github.com/mohitupraity</span>
                  </a>
                  <a
                    href="https://mohitupraity.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-emerald-600 hover:underline font-medium"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>Portfolio</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Mini Bio Box */}
            <div className="w-full md:w-64 bg-slate-50 border border-slate-100 p-4 rounded-xl flex flex-col justify-between shrink-0 space-y-2">
              <p className="text-xs text-slate-600 leading-relaxed line-clamp-4">
                {bio}
              </p>
              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center gap-1 text-[11px] text-primary hover:underline font-semibold"
                >
                  <Edit className="w-3 h-3" />
                  <span>Edit Bio</span>
                </button>
              </div>
            </div>
          </div>

          {/* Edit Form Drawer if active */}
          {isEditing && (
            <div className="bg-white rounded-xl border border-primary/40 p-6 shadow-card space-y-4 animate-in fade-in">
              <h3 className="text-sm font-bold text-slate-900">Edit Profile &amp; Objective</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg border border-slate-200"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Headline</label>
                  <input
                    type="text"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg border border-slate-200"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="font-semibold text-slate-700 block mb-1">Bio</label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={2}
                    className="w-full p-2 rounded-lg border border-slate-200"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-4 py-1.5 rounded-lg bg-primary text-white text-xs font-semibold shadow-xs"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Card: Career Goal & Strategic Trajectory */}
          <div className="rounded-xl bg-white border border-slate-200 p-6 shadow-card space-y-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-primary flex items-center justify-center shrink-0">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">Career Goal &amp; Target Trajectory</h3>
                  <p className="text-xs text-slate-500">
                    Set your target roles, industries, and preferences to drive algorithmic matchmaking.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => triggerToast('Opening target parameter editor...')}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs border border-slate-200 transition-colors"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 pt-1">
              {/* Featured Target Role Blue Badge */}
              <div className="md:col-span-5 rounded-xl bg-blue-50/70 border border-blue-200/80 p-5 flex flex-col justify-between space-y-4">
                <div>
                  <div className="inline-flex items-center gap-1 font-mono text-[11px] text-primary font-bold uppercase tracking-wider">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Target Role</span>
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mt-1">AI Engineer</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Build expertise in AI/ML, LLMs, fine-tuning, and real-world enterprise agent architectures.
                  </p>
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <span className="px-2.5 py-0.5 rounded bg-primary text-white font-mono text-[10px] font-bold">
                    Primary Track
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-white text-slate-700 border border-slate-200 font-mono text-[10px] font-semibold">
                    Full-time Ready
                  </span>
                </div>
              </div>

              {/* Parameter Chips Grid */}
              <div className="md:col-span-7 space-y-3.5 text-xs">
                <div>
                  <span className="font-semibold uppercase tracking-wider text-slate-400 text-[10px] block mb-1.5">
                    Preferred Verticals
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {['AI/ML Systems', 'Software Engineering', 'Cybersecurity', 'R&D Lab'].map((v) => (
                      <span key={v} className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 font-medium">
                        {v}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-semibold uppercase tracking-wider text-slate-400 text-[10px] block mb-1.5">
                    Target Hubs
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {['India (HQ)', 'Remote / Global PST', 'Bengaluru', 'Hyderabad', 'Pune'].map((loc) => (
                      <span key={loc} className="px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200 text-slate-700 font-medium">
                        {loc}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-1 border-t border-slate-100">
                  <div>
                    <span className="font-semibold uppercase tracking-wider text-slate-400 text-[10px] block mb-1">
                      Target Compensation
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono font-bold text-xs">
                      ₹15L – ₹30L <span className="text-[10px] font-normal text-emerald-600">(Full-time)</span>
                    </span>
                  </div>

                  <div>
                    <span className="font-semibold uppercase tracking-wider text-slate-400 text-[10px] block mb-1">
                      Opportunity Types
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {['Jobs', 'Internships', 'Research', 'Hackathons'].map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono text-[10px]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Two-Column Subgrid: Education & Experience */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Education Card */}
            <div className="rounded-xl bg-white border border-slate-200 p-6 shadow-card space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-primary flex items-center justify-center">
                    <School className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-sm text-slate-900">Education</h3>
                </div>
                <button
                  type="button"
                  onClick={() => triggerToast('Education editor opened.')}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-50 hover:bg-slate-100 text-slate-600 text-[11px] font-semibold border border-slate-200"
                >
                  <Edit className="w-3 h-3" />
                  <span>Edit</span>
                </button>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100 flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center shadow-2xs shrink-0 text-primary font-bold">
                  <School className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <h4 className="font-bold text-xs text-slate-900 truncate">B.E. Computer Science</h4>
                    <span className="px-2 py-0.5 rounded bg-white border border-slate-200 font-mono text-[10px] text-slate-600 shrink-0">
                      2023 – 2027
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">Anand Engineering College, Agra</p>
                  <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-600">
                    <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> CGPA: 8.6 / 10.0
                    </span>
                    <span>·</span>
                    <span>AI &amp; Data Track</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Experience Card */}
            <div className="rounded-xl bg-white border border-slate-200 p-6 shadow-card space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-primary flex items-center justify-center">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-sm text-slate-900">Experience</h3>
                </div>
                <button
                  type="button"
                  onClick={() => triggerToast('Experience editor opened.')}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-50 hover:bg-slate-100 text-slate-600 text-[11px] font-semibold border border-slate-200"
                >
                  <Edit className="w-3 h-3" />
                  <span>Edit</span>
                </button>
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 space-y-1.5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-primary text-white flex items-center justify-center font-mono text-[10px] font-bold">
                        DR
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-slate-900">AI / Cybersecurity Intern</h4>
                        <p className="text-[11px] text-slate-500">DRDO – ADRDE, Agra</p>
                      </div>
                    </div>
                    <span className="font-mono text-[10px] text-slate-400">Feb 2026 – Jun 2026</span>
                  </div>
                  <ul className="text-[11px] text-slate-600 pl-6 space-y-0.5 list-disc font-normal">
                    <li>Developed IntelliGuard NGFW zero-copy packet filtering pipeline.</li>
                    <li>Built real-time telemetry dashboards and AST verification bridges.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT STICKY RAIL (4 Columns) */}
        <div className="lg:col-span-4 flex flex-col space-y-6">
          {/* Signal Completeness Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900">Profile Completeness</h3>
              <span className="font-mono font-bold text-emerald-600 text-sm">94%</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full transition-all duration-700" style={{ width: '94%' }}></div>
            </div>
            <p className="text-xs text-slate-500">
              Your profile is verified. Connect your LeetCode handle in <Link href="/connectors" className="text-primary font-semibold hover:underline">Connectors</Link> to achieve 100% indexing.
            </p>
          </div>

          {/* Role Fit Breakdown */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <h3 className="font-bold text-sm text-slate-900">AI Role Readiness</h3>
              </div>
              <span className="px-2 py-0.5 rounded bg-blue-50 text-primary font-mono text-xs font-bold">
                91% FIT
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div>
                <div className="flex items-center justify-between text-slate-700 mb-1">
                  <span>Systems Architecture &amp; C++</span>
                  <span className="font-mono font-semibold">96%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: '96%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-slate-700 mb-1">
                  <span>LLM Serving &amp; vLLM</span>
                  <span className="font-mono font-semibold">92%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-slate-700 mb-1">
                  <span>Full-Stack &amp; Distributed Backend</span>
                  <span className="font-mono font-semibold">88%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-purple-500 h-full rounded-full" style={{ width: '88%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-card space-y-3 text-xs font-semibold">
            <h3 className="text-sm font-bold text-slate-900 mb-2">Quick Navigation</h3>
            <Link
              href="/resume"
              className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-100 text-slate-700 transition-colors"
            >
              <span>Tailor Resume for AI Roles</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              href="/connectors"
              className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-100 text-slate-700 transition-colors"
            >
              <span>Manage Evidence Connectors</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              href="/opportunities"
              className="flex items-center justify-between p-3 rounded-lg bg-blue-50/70 hover:bg-blue-50 border border-blue-200/60 text-primary transition-colors"
            >
              <span>Explore High-Match Jobs (24)</span>
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
