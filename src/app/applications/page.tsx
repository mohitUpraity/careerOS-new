'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  Plus,
  Clock,
  ExternalLink,
  ChevronRight,
  MoreHorizontal,
  CheckCircle2,
  AlertCircle,
  FileText,
  Building,
  Search,
  ChevronDown,
  Bookmark,
  Kanban,
  List,
  Calendar,
  BarChart3,
  SlidersHorizontal,
  X,
  Sparkles,
  MapPin,
  DollarSign
} from 'lucide-react';

interface KanbanApp {
  id: string;
  company: string;
  role: string;
  stage: 'SAVED' | 'APPLIED' | 'SCREENING' | 'INTERVIEW' | 'OFFER' | 'ARCHIVED';
  matchScore: number;
  savedDate?: string;
  appliedDate?: string;
  tags: string[];
  resumeVersion?: string;
  salary?: string;
  location?: string;
  logoBg: string;
  logoText: string;
}

const initialApps: KanbanApp[] = [
  // Saved
  {
    id: 'app_1',
    company: 'OpenAI',
    role: 'Research Systems Intern',
    stage: 'SAVED',
    matchScore: 92,
    savedDate: '2 days ago',
    tags: ['AI', 'Research', 'LLM'],
    salary: '$14k / mo',
    location: 'San Francisco, CA',
    logoBg: 'bg-emerald-50 text-emerald-700',
    logoText: 'OA',
  },
  {
    id: 'app_2',
    company: 'Together AI',
    role: 'Inference Infrastructure Engineer',
    stage: 'SAVED',
    matchScore: 89,
    savedDate: 'Yesterday',
    tags: ['vLLM', 'CUDA', 'Serving'],
    salary: '$190k - $240k',
    location: 'San Francisco, CA / Remote',
    logoBg: 'bg-blue-50 text-blue-700',
    logoText: 'T',
  },
  {
    id: 'app_3',
    company: 'Cloudflare',
    role: 'Systems Engineer - Workers / eBPF',
    stage: 'SAVED',
    matchScore: 94,
    savedDate: '3 days ago',
    tags: ['Rust', 'eBPF', 'Wasm'],
    salary: '$175k - $220k',
    location: 'Austin, TX / Remote',
    logoBg: 'bg-amber-50 text-amber-700',
    logoText: 'CF',
  },

  // Applied
  {
    id: 'app_4',
    company: 'NVIDIA',
    role: 'GPU Systems Software Engineer',
    stage: 'APPLIED',
    matchScore: 91,
    appliedDate: 'Sep 18, 2026',
    tags: ['CUDA', 'Driver', 'C++'],
    resumeVersion: 'v4',
    salary: '$180k - $230k',
    location: 'Santa Clara, CA',
    logoBg: 'bg-green-50 text-green-700',
    logoText: 'NV',
  },
  {
    id: 'app_5',
    company: 'Meta',
    role: 'Production Engineer, AI Infrastructure',
    stage: 'APPLIED',
    matchScore: 88,
    appliedDate: 'Sep 15, 2026',
    tags: ['PyTorch', 'Linux', 'Distributed'],
    resumeVersion: 'v3',
    salary: '$185k Base',
    location: 'Menlo Park, CA',
    logoBg: 'bg-blue-50 text-blue-600',
    logoText: 'M',
  },
  {
    id: 'app_6',
    company: 'Jane Street',
    role: 'Systems Software Engineer',
    stage: 'APPLIED',
    matchScore: 90,
    appliedDate: 'Sep 14, 2026',
    tags: ['OCaml', 'Low Latency', 'Linux'],
    resumeVersion: 'v4',
    salary: '$300k+ Total',
    location: 'New York, NY',
    logoBg: 'bg-slate-100 text-slate-800',
    logoText: 'JS',
  },

  // Screening
  {
    id: 'app_7',
    company: 'Google DeepMind',
    role: 'AI Systems Research Intern',
    stage: 'SCREENING',
    matchScore: 96,
    appliedDate: 'Sep 08, 2026',
    tags: ['JAX', 'Distributed', 'TPU'],
    resumeVersion: 'v4',
    salary: '$15k / mo',
    location: 'London, UK / Mountain View',
    logoBg: 'bg-blue-50 text-primary',
    logoText: 'DM',
  },
  {
    id: 'app_8',
    company: 'Scale AI',
    role: 'AI Platform Systems Engineer',
    stage: 'SCREENING',
    matchScore: 93,
    appliedDate: 'Sep 10, 2026',
    tags: ['K8s', 'vLLM', 'Infra'],
    resumeVersion: 'v4',
    salary: '$200k - $250k',
    location: 'San Francisco, CA',
    logoBg: 'bg-purple-50 text-purple-700',
    logoText: 'S',
  },

  // Interview
  {
    id: 'app_9',
    company: 'Databricks',
    role: 'Spark & Ray Engine Developer',
    stage: 'INTERVIEW',
    matchScore: 95,
    appliedDate: 'Sep 12, 2026',
    tags: ['Ray', 'C++', 'Cluster'],
    resumeVersion: 'v4',
    salary: '$260k + Equity',
    location: 'San Francisco, CA',
    logoBg: 'bg-rose-50 text-rose-600',
    logoText: 'DB',
  },

  // Offer
  {
    id: 'app_10',
    company: 'Google Cloud',
    role: 'Senior AI Infrastructure Engineer (L6)',
    stage: 'OFFER',
    matchScore: 94,
    appliedDate: 'Sep 10, 2026',
    tags: ['Cloud', 'L6 Offer', '$519k TC'],
    resumeVersion: 'v4',
    salary: '$250k Base + $680k RSU',
    location: 'Mountain View, CA',
    logoBg: 'bg-emerald-50 text-emerald-700',
    logoText: 'G',
  },
  {
    id: 'app_11',
    company: 'Anthropic',
    role: 'ML Platform & Serving Engineer',
    stage: 'OFFER',
    matchScore: 91,
    appliedDate: 'Sep 12, 2026',
    tags: ['Claude', 'vLLM', 'Inference'],
    resumeVersion: 'v4',
    salary: '$275k Base + Equity',
    location: 'San Francisco, CA',
    logoBg: 'bg-purple-50 text-purple-700',
    logoText: 'ANT',
  },
];

export default function ApplicationsPage() {
  const [viewMode, setViewMode] = useState<'Board' | 'List' | 'Calendar' | 'Analytics'>('Board');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState('All');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('All');
  const [selectedApp, setSelectedApp] = useState<KanbanApp | null>(null);
  const [apps, setApps] = useState<KanbanApp[]>(initialApps);

  // Add modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCompany, setNewCompany] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newStage, setNewStage] = useState<KanbanApp['stage']>('APPLIED');
  const [newSalary, setNewSalary] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newMatchScore, setNewMatchScore] = useState(90);

  const [toast, setToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const columns: { id: KanbanApp['stage']; name: string; countBadgeColor: string }[] = [
    { id: 'SAVED', name: 'Saved', countBadgeColor: 'bg-slate-100 text-slate-700' },
    { id: 'APPLIED', name: 'Applied', countBadgeColor: 'bg-blue-100 text-primary' },
    { id: 'SCREENING', name: 'Screening', countBadgeColor: 'bg-purple-100 text-purple-700' },
    { id: 'INTERVIEW', name: 'Interview', countBadgeColor: 'bg-amber-100 text-amber-800' },
    { id: 'OFFER', name: 'Offer', countBadgeColor: 'bg-emerald-100 text-emerald-800 font-bold' },
    { id: 'ARCHIVED', name: 'Archived', countBadgeColor: 'bg-slate-100 text-slate-500' },
  ];

  const moveAppStage = (appId: string, nextStage: KanbanApp['stage']) => {
    setApps((prev) =>
      prev.map((a) => (a.id === appId ? { ...a, stage: nextStage } : a))
    );
    if (selectedApp && selectedApp.id === appId) {
      setSelectedApp({ ...selectedApp, stage: nextStage });
    }
    triggerToast(`Application moved to ${nextStage}!`);
  };

  const handleCreateApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompany.trim() || !newRole.trim()) return;

    const initials = newCompany.slice(0, 2).toUpperCase();
    const newApp: KanbanApp = {
      id: `app_${Date.now()}`,
      company: newCompany,
      role: newRole,
      stage: newStage,
      matchScore: newMatchScore || 88,
      appliedDate: 'Just Now',
      tags: ['Engineering', 'Target Role'],
      resumeVersion: 'v4',
      salary: newSalary || '$200k+ package',
      location: newLocation || 'San Francisco, CA',
      logoBg: 'bg-blue-50 text-primary',
      logoText: initials,
    };

    setApps([newApp, ...apps]);
    setIsAddModalOpen(false);
    setNewCompany('');
    setNewRole('');
    setNewSalary('');
    setNewLocation('');
    triggerToast(`Created application for ${newCompany}!`);
  };

  const filteredApps = apps.filter((a) => {
    const matchesSearch =
      a.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesRole = selectedRoleFilter === 'All' || a.role.toLowerCase().includes(selectedRoleFilter.toLowerCase());
    const matchesStatus = selectedStatusFilter === 'All' || a.stage === selectedStatusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="space-y-6 pb-16">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-xl border border-slate-700 animate-in fade-in slide-in-from-bottom-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toast}</span>
        </div>
      )}

      {/* Title & Action Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="font-mono text-xs text-slate-400 uppercase tracking-wider font-semibold">
            APPLICATION PIPELINE &amp; INTERVIEW CRM
          </span>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
            Applications Pipeline
          </h1>
          <p className="text-sm text-slate-500">
            Track, manage and get automated telemetry insights on all your active opportunities and offer matrices.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-xs font-semibold shadow-2xs transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Application</span>
          </button>
        </div>
      </div>

      {/* Sub-header: View Switcher and Filters Bar */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3 bg-white p-2 rounded-xl border border-slate-200 shadow-card">
        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
          {(['Board', 'List', 'Calendar', 'Analytics'] as const).map((mode) => {
            const Icon = mode === 'Board' ? Kanban : mode === 'List' ? List : mode === 'Calendar' ? Calendar : BarChart3;
            return (
              <button
                key={mode}
                type="button"
                onClick={() => setViewMode(mode)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                  viewMode === mode ? 'bg-white text-primary shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{mode}</span>
              </button>
            );
          })}
        </div>

        {/* Search and Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative min-w-[200px] flex-1 sm:flex-initial">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search companies, roles, tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-8 pl-8 pr-3 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:bg-white focus:border-primary"
            />
          </div>

          <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs">
            <SlidersHorizontal className="w-3 h-3 text-slate-400" />
            <select
              value={selectedRoleFilter}
              onChange={(e) => setSelectedRoleFilter(e.target.value)}
              className="bg-transparent text-xs text-slate-700 font-medium focus:outline-none"
            >
              <option value="All">All Roles</option>
              <option value="Systems">Systems</option>
              <option value="AI">AI &amp; ML</option>
              <option value="Research">Research</option>
            </select>
          </div>

          <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs">
            <select
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
              className="bg-transparent text-xs text-slate-700 font-medium focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="SAVED">Saved</option>
              <option value="APPLIED">Applied</option>
              <option value="SCREENING">Screening</option>
              <option value="INTERVIEW">Interview</option>
              <option value="OFFER">Offer</option>
            </select>
          </div>
        </div>
      </div>

      {/* VIEW 1: BOARD (KANBAN) */}
      {viewMode === 'Board' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 items-start overflow-x-auto pb-4">
          {columns.map((col) => {
            const colApps = filteredApps.filter((a) => a.stage === col.id);
            return (
              <div
                key={col.id}
                className="flex flex-col gap-3 bg-slate-50/70 rounded-xl p-3 border border-slate-200 min-w-[240px]"
              >
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-xs text-slate-800 tracking-tight">{col.name}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-mono font-bold ${col.countBadgeColor}`}>
                      {colApps.length}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5">
                  {colApps.map((app) => (
                    <div
                      key={app.id}
                      onClick={() => setSelectedApp(app)}
                      className="group bg-white rounded-xl p-3.5 border border-slate-200 shadow-card hover:border-slate-300 hover:shadow-card-hover transition-all cursor-pointer space-y-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${app.logoBg}`}>
                            {app.logoText}
                          </div>
                          <div>
                            <h4 className="font-bold text-xs text-slate-900 leading-tight group-hover:text-primary transition-colors">
                              {app.company}
                            </h4>
                            <p className="text-[11px] text-slate-500 font-medium truncate max-w-[140px]">
                              {app.role}
                            </p>
                          </div>
                        </div>

                        <span className="px-1.5 py-0.5 rounded font-mono text-[10px] font-bold bg-emerald-50 text-emerald-700">
                          {app.matchScore}%
                        </span>
                      </div>

                      {app.salary && (
                        <div className="flex items-center gap-1 text-[11px] text-slate-600 font-mono">
                          <DollarSign className="w-3 h-3 text-slate-400 shrink-0" />
                          <span>{app.salary}</span>
                        </div>
                      )}

                      <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-100">
                        <span>{app.appliedDate || app.savedDate || 'Active'}</span>
                        <span className="text-primary font-semibold group-hover:underline">Inspect →</span>
                      </div>
                    </div>
                  ))}

                  {colApps.length === 0 && (
                    <div className="py-8 text-center text-xs text-slate-400 font-medium border border-dashed border-slate-200 rounded-lg">
                      No applications
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW 2: LIST (TABLE) */}
      {viewMode === 'List' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-mono uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-4">Company</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Stage</th>
                  <th className="py-3 px-4">Match Score</th>
                  <th className="py-3 px-4">Compensation</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredApps.map((app) => (
                  <tr
                    key={app.id}
                    onClick={() => setSelectedApp(app)}
                    className="hover:bg-slate-50/80 cursor-pointer transition-colors"
                  >
                    <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-2">
                      <div className={`w-6 h-6 rounded flex items-center justify-center font-bold text-[10px] ${app.logoBg}`}>
                        {app.logoText}
                      </div>
                      <span>{app.company}</span>
                    </td>
                    <td className="py-3 px-4 text-slate-700 font-medium">{app.role}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-blue-50 text-primary">
                        {app.stage}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-emerald-600">{app.matchScore}%</td>
                    <td className="py-3 px-4 font-mono text-slate-600">{app.salary || '—'}</td>
                    <td className="py-3 px-4 text-slate-500">{app.location || '—'}</td>
                    <td className="py-3 px-4 text-right">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedApp(app);
                        }}
                        className="text-primary hover:underline font-semibold"
                      >
                        Inspect →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 3: CALENDAR */}
      {viewMode === 'Calendar' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-sm text-slate-900">Application Deadlines &amp; Interview Schedule</h3>
            <span className="font-mono text-xs text-primary font-bold">Q3 2026</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-900">Tomorrow • 10:00 AM</span>
                <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-mono text-[10px] font-bold">INTERVIEW</span>
              </div>
              <h4 className="font-bold text-slate-900">Scale AI — Distributed Systems Technical Round 2</h4>
              <p className="text-[11px] text-slate-600 font-mono">Arena Simulation completed (95% readiness)</p>
            </div>
            <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-blue-900">Sep 30 • 11:59 PM</span>
                <span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 font-mono text-[10px] font-bold">DEADLINE</span>
              </div>
              <h4 className="font-bold text-slate-900">Google DeepMind — Research Intern Deadline</h4>
              <p className="text-[11px] text-slate-600 font-mono">Tailored Resume v4 generated</p>
            </div>
            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-900">Oct 05 • 05:00 PM</span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono text-[10px] font-bold">OFFER EXPIRY</span>
              </div>
              <h4 className="font-bold text-slate-900">Anthropic — Offer Decision Milestone</h4>
              <p className="text-[11px] text-slate-600 font-mono">$275k package review in Offer Matrix</p>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 4: ANALYTICS */}
      {viewMode === 'Analytics' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-card space-y-3">
            <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wider font-mono">Conversion Funnel</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between"><span>Applications Submitted</span><strong className="font-mono">11 (100%)</strong></div>
              <div className="flex justify-between text-blue-700"><span>Screening Passed</span><strong className="font-mono">8 (72%)</strong></div>
              <div className="flex justify-between text-purple-700"><span>Technical Interviews</span><strong className="font-mono">4 (36%)</strong></div>
              <div className="flex justify-between text-emerald-700"><span>Offers Extended</span><strong className="font-mono">2 (18%)</strong></div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-card space-y-3">
            <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wider font-mono">Average Response Time</h4>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold font-mono text-slate-900">4.2</span>
              <span className="text-xs text-slate-500 font-medium">Days (Top 5% speed)</span>
            </div>
            <p className="text-[11px] text-slate-500">Verified Evidence Proofs boost recruiter response velocity by 3.1x.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-card space-y-3">
            <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wider font-mono">Top Performing Resume</h4>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-blue-50 text-primary font-mono font-bold text-xs">Resume v4</span>
              <span className="text-xs font-bold text-emerald-600">84% Interview Rate</span>
            </div>
            <p className="text-[11px] text-slate-500">Targeted for Distributed Inference &amp; Kernel Architecture.</p>
          </div>
        </div>
      )}

      {/* Add Application Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-modal w-full max-w-md p-6 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">Add New Application</h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateApplication} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Company Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Anthropic, Google DeepMind"
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Role Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AI Systems Engineer"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Pipeline Stage</label>
                  <select
                    value={newStage}
                    onChange={(e) => setNewStage(e.target.value as KanbanApp['stage'])}
                    className="w-full h-9 px-3 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-primary"
                  >
                    <option value="SAVED">Saved</option>
                    <option value="APPLIED">Applied</option>
                    <option value="SCREENING">Screening</option>
                    <option value="INTERVIEW">Interview</option>
                    <option value="OFFER">Offer</option>
                    <option value="ARCHIVED">Archived</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Match Score (%)</label>
                  <input
                    type="number"
                    min="50"
                    max="100"
                    value={newMatchScore}
                    onChange={(e) => setNewMatchScore(Number(e.target.value))}
                    className="w-full h-9 px-3 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Compensation</label>
                  <input
                    type="text"
                    placeholder="e.g. $220k Base"
                    value={newSalary}
                    onChange={(e) => setNewSalary(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    placeholder="e.g. SF / Remote"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white font-semibold shadow-2xs"
                >
                  Create Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Detail Inspector Drawer */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-end">
          <div className="bg-white w-full max-w-lg h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm ${selectedApp.logoBg}`}>
                    {selectedApp.logoText}
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900">{selectedApp.company}</h3>
                    <p className="text-xs text-slate-500">{selectedApp.role}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedApp(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Pipeline Stage</span>
                    <span className="font-mono font-bold text-primary">{selectedApp.stage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Deterministic Match Score</span>
                    <span className="font-mono font-bold text-emerald-600">{selectedApp.matchScore}% Match</span>
                  </div>
                  {selectedApp.salary && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">Compensation Package</span>
                      <span className="font-mono font-bold text-slate-900">{selectedApp.salary}</span>
                    </div>
                  )}
                  {selectedApp.location && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">Location</span>
                      <span className="text-slate-800">{selectedApp.location}</span>
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 mb-2">Move Pipeline Stage</h4>
                  <div className="grid grid-cols-3 gap-1.5">
                    {columns.map((col) => (
                      <button
                        key={col.id}
                        type="button"
                        onClick={() => moveAppStage(selectedApp.id, col.id)}
                        className={`px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                          selectedApp.stage === col.id
                            ? 'bg-primary text-white border-primary shadow-xs'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {col.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/resume"
                    className="w-full py-2.5 rounded-lg bg-blue-50 text-primary border border-blue-200/80 font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-blue-100 transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Tailored Resume ({selectedApp.resumeVersion || 'v1'})</span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setSelectedApp(null)}
                className="px-4 py-2 rounded-lg border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
