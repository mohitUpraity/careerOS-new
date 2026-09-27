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

export default function ApplicationsPage() {
  const [viewMode, setViewMode] = useState<'Board' | 'List' | 'Calendar' | 'Analytics'>('Board');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedApp, setSelectedApp] = useState<KanbanApp | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const [apps, setApps] = useState<KanbanApp[]>([
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
      logoBg: 'bg-[#00A67E]/10 text-[#00A67E]',
      logoText: 'OA',
    },
    {
      id: 'app_2',
      company: 'NVIDIA',
      role: 'ML Systems Engineer Intern',
      stage: 'SAVED',
      matchScore: 94,
      savedDate: '4 days ago',
      tags: ['CUDA', 'Systems', 'ML'],
      salary: '$13.5k / mo',
      location: 'Santa Clara, CA',
      logoBg: 'bg-[#76B900]/15 text-[#4B7500]',
      logoText: 'NV',
    },
    {
      id: 'app_3',
      company: 'Google DeepMind',
      role: 'Gemini Infrastructure Intern',
      stage: 'SAVED',
      matchScore: 96,
      savedDate: '5 days ago',
      tags: ['Research', 'vLLM', 'Distributed'],
      salary: '$15k / mo',
      location: 'London / Remote',
      logoBg: 'bg-[#4285F4]/10 text-[#1A73E8]',
      logoText: 'DM',
    },

    // Applied
    {
      id: 'app_4',
      company: 'Google',
      role: 'AI Infrastructure Engineer Intern',
      stage: 'APPLIED',
      matchScore: 92,
      appliedDate: '3 days ago',
      tags: ['AI/ML', 'Remote'],
      resumeVersion: 'v4',
      salary: '$14k / mo + Relocation',
      location: 'Mountain View, CA / Remote',
      logoBg: 'bg-rose-50 text-rose-600',
      logoText: 'G',
    },
    {
      id: 'app_5',
      company: 'Microsoft',
      role: 'ML Systems & Azure AI Intern',
      stage: 'APPLIED',
      matchScore: 86,
      appliedDate: '5 days ago',
      tags: ['ML', 'Cloud'],
      resumeVersion: 'v3',
      salary: '$12.5k / mo',
      location: 'Redmond, WA',
      logoBg: 'bg-blue-50 text-blue-600',
      logoText: 'MS',
    },
    {
      id: 'app_6',
      company: 'Amazon',
      role: 'Applied Scientist Intern',
      stage: 'APPLIED',
      matchScore: 78,
      appliedDate: '1 week ago',
      tags: ['ML', 'Backend'],
      resumeVersion: 'v3',
      salary: '$11k / mo',
      location: 'Seattle, WA',
      logoBg: 'bg-amber-50 text-amber-700',
      logoText: 'AM',
    },

    // Screening
    {
      id: 'app_7',
      company: 'Meta AI (FAIR)',
      role: 'Research Systems Engineer',
      stage: 'SCREENING',
      matchScore: 88,
      appliedDate: 'Sep 15, 2026',
      tags: ['PyTorch', 'C++', 'Distributed'],
      resumeVersion: 'v4',
      salary: '$240k Base + Equity',
      location: 'Menlo Park, CA',
      logoBg: 'bg-blue-50 text-blue-700',
      logoText: 'META',
    },
    {
      id: 'app_8',
      company: 'Stripe',
      role: 'Distributed Systems Platform Engineer',
      stage: 'SCREENING',
      matchScore: 94,
      appliedDate: 'Sep 18, 2026',
      tags: ['Raft', 'eBPF', 'Go'],
      resumeVersion: 'v4',
      salary: '$230k Base',
      location: 'Remote PST',
      logoBg: 'bg-indigo-50 text-indigo-700',
      logoText: 'ST',
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
  ]);

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
    triggerToast(`Application moved to ${nextStage}!`);
  };

  const filteredApps = apps.filter(
    (a) =>
      a.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
            onClick={() => triggerToast('New application creation form opened.')}
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
          <button
            type="button"
            onClick={() => setViewMode('Board')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all ${
              viewMode === 'Board' ? 'bg-white text-primary shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Kanban className="w-3.5 h-3.5" />
            <span>Board</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('List')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all ${
              viewMode === 'List' ? 'bg-white text-primary shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>List</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('Calendar')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all ${
              viewMode === 'Calendar' ? 'bg-white text-primary shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Calendar</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('Analytics')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all ${
              viewMode === 'Analytics' ? 'bg-white text-primary shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Analytics</span>
          </button>
        </div>

        {/* Filter & Search Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative min-w-[200px] flex-1 sm:flex-initial">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search applications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-8 pl-8 pr-3 text-xs rounded-lg bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-primary transition-colors"
            />
          </div>

          <button
            type="button"
            onClick={() => triggerToast('Filtered by All Roles.')}
            className="flex items-center gap-1 h-8 px-2.5 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-medium"
          >
            <span>All Roles</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>
          <button
            type="button"
            onClick={() => triggerToast('Filtered by Active Status.')}
            className="flex items-center gap-1 h-8 px-2.5 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-medium"
          >
            <span>All Status</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Kanban Board: 6 Stages */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 gap-3.5 items-start">
        {columns.map((col) => {
          const colApps = filteredApps.filter((a) => a.stage === col.id);
          return (
            <div
              key={col.id}
              className="flex flex-col bg-slate-100/70 rounded-xl p-2.5 space-y-2.5 min-h-[500px]"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between px-1 py-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-xs text-slate-900">{col.name}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full font-mono text-[10px] font-semibold ${col.countBadgeColor}`}
                  >
                    {colApps.length}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => triggerToast(`Add new card to ${col.name}`)}
                  className="text-slate-400 hover:text-slate-700"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Cards List */}
              <div className="space-y-2.5">
                {colApps.map((app) => (
                  <div
                    key={app.id}
                    onClick={() => setSelectedApp(app)}
                    className="bg-white rounded-lg p-3 shadow-2xs border border-slate-200/80 hover:shadow-card hover:border-slate-300 transition-all flex flex-col space-y-2 cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${app.logoBg}`}
                        >
                          {app.logoText}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-xs text-slate-900 leading-tight truncate">{app.company}</p>
                          <p className="text-[11px] text-slate-500 truncate">{app.role}</p>
                        </div>
                      </div>

                      <span className="px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono text-[10px] font-bold shrink-0">
                        {app.matchScore}%
                      </span>
                    </div>

                    <p className="font-mono text-[10px] text-slate-400">
                      {app.stage === 'SAVED' ? `Saved ${app.savedDate}` : `Applied ${app.appliedDate}`}
                    </p>

                    <div className="flex items-center justify-between pt-0.5 border-t border-slate-100">
                      <div className="flex flex-wrap gap-1">
                        {app.tags.slice(0, 2).map((t) => (
                          <span
                            key={t}
                            className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-mono text-[9px]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {app.resumeVersion && (
                        <span className="px-1.5 py-0.2 rounded bg-blue-50 text-primary font-mono text-[10px] font-bold">
                          {app.resumeVersion}
                        </span>
                      )}
                    </div>
                  </div>
                ))}

                {colApps.length === 0 && (
                  <div className="p-4 rounded-lg border border-dashed border-slate-200 text-center text-slate-400 text-xs">
                    No items in {col.name}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

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
