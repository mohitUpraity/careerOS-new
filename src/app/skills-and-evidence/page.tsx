'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Network,
  ShieldCheck,
  Plus,
  ExternalLink,
  ChevronRight,
  GitPullRequest,
  FileCode2,
  CheckCircle2,
  Sparkles,
  Search,
  Filter,
  Layers,
  ArrowUpRight,
  PlugZap,
  TrendingUp,
  AlertTriangle,
  Code2,
  Check,
  X,
  Lock,
} from 'lucide-react';
import { mockSkillsGraph, SkillNode } from '@/data/mock/skillsData';

export default function SkillsAndEvidencePage() {
  const [skills, setSkills] = useState<SkillNode[]>(mockSkillsGraph);
  const [selectedSubTab, setSelectedSubTab] = useState<'Skills' | 'Evidence' | 'Role Fit' | 'Insights'>('Skills');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newProvenance, setNewProvenance] = useState('');
  const [newMetric, setNewMetric] = useState('');
  const [toast, setToast] = useState<string | null>(null);

  const categories = [
    'All',
    'Distributed Systems',
    'Low-Level & Hardware',
    'AI & ML Infra',
    'Networking & Security',
  ];

  const quickSkillsList = [
    { name: 'Python', score: 90, color: 'bg-emerald-500' },
    { name: 'PyTorch', score: 88, color: 'bg-emerald-500' },
    { name: 'C/C++', score: 94, color: 'bg-emerald-500' },
    { name: 'eBPF / XDP', score: 96, color: 'bg-emerald-500' },
    { name: 'vLLM', score: 85, color: 'bg-blue-500' },
    { name: 'CUDA / Triton', score: 78, color: 'bg-amber-500' },
    { name: 'Raft Consensus', score: 82, color: 'bg-blue-500' },
  ];

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleAddEvidence = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newEvidence = {
      id: `ev_${Date.now()}`,
      title: newTitle,
      type: 'GITHUB_PR' as const,
      provenance: newProvenance || 'Verified Repository Commit',
      verifiedDate: 'Just Now',
      metric: newMetric || 'Production Verified Proof',
    };

    setSkills(
      skills.map((s, idx) =>
        idx === 0
          ? {
              ...s,
              evidenceCount: s.evidenceCount + 1,
              evidenceItems: [newEvidence, ...s.evidenceItems],
            }
          : s
      )
    );

    setIsAddModalOpen(false);
    setNewTitle('');
    setNewProvenance('');
    setNewMetric('');
    triggerToast('New evidence item added and verified into your Evidence Graph!');
  };

  const filteredSkills = skills.filter(
    (s) => selectedCategory === 'All' || s.category === selectedCategory
  );

  return (
    <div className="space-y-6 pb-16">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-xl border border-slate-700 animate-in fade-in slide-in-from-bottom-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toast}</span>
        </div>
      )}

      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="font-mono text-xs text-slate-400 uppercase tracking-wider font-semibold">
            PROVENANCE &amp; FACTUAL EVIDENCE GRAPH
          </span>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
            Skills &amp; Evidence Repository
          </h1>
          <p className="text-sm text-slate-500">
            Track your skills, see real evidence, and identify what to improve for your target roles.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Link
            href="/connectors"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 text-xs font-semibold shadow-2xs transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>6 Connectors Live (Sync)</span>
          </Link>

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs font-semibold shadow-2xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Evidence</span>
          </button>
        </div>
      </div>

      {/* Primary Sub-Tabs */}
      <div className="flex items-center gap-6 border-b border-slate-200 pb-2 text-xs">
        {(['Skills', 'Evidence', 'Role Fit', 'Insights'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setSelectedSubTab(tab)}
            className={`pb-1 font-semibold transition-all relative ${
              selectedSubTab === tab
                ? 'text-primary border-b-2 border-primary'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Top 3 Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Readiness */}
        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-card flex flex-col justify-between">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400 font-bold">
              Overall Skill Readiness
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold font-mono text-slate-900">72%</span>
              <span className="inline-flex items-center text-emerald-600 text-xs font-bold">
                <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> +6%
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Based on target role: <strong className="text-slate-800">AI Engineer</strong>
            </p>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 mt-4 overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: '72%' }}></div>
          </div>
        </div>

        {/* Card 2: Overview Counters */}
        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-card flex flex-col justify-between">
          <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400 font-bold">
            Skills Overview
          </span>
          <div className="grid grid-cols-3 gap-2 mt-1">
            <div>
              <span className="text-2xl font-bold font-mono text-slate-900">18</span>
              <p className="text-[11px] text-slate-500">Core Skills</p>
            </div>
            <div>
              <span className="text-2xl font-bold font-mono text-emerald-600">14</span>
              <p className="text-[11px] text-slate-500">With Evidence</p>
            </div>
            <div>
              <span className="text-2xl font-bold font-mono text-amber-600">4</span>
              <p className="text-[11px] text-slate-500">Gaps Identified</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-3 text-[11px] font-mono text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> 78% total taxonomy coverage
          </div>
        </div>

        {/* Card 3: Target Role Alignment */}
        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                Target Alignment
              </span>
              <span className="text-xs font-bold font-mono text-slate-900">78% Match</span>
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-base font-bold text-slate-900">AI Infrastructure Engineer</span>
            </div>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 mt-2 overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: '78%' }}></div>
          </div>
          <div className="flex items-center gap-1.5 mt-3 flex-wrap text-[10px]">
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold">
              ✓ Strong Match
            </span>
            <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-semibold">
              ! 3 Gaps
            </span>
            <span className="px-2 py-0.5 rounded-full bg-blue-50 text-primary font-semibold">
              ↑ Top 5% Applicant
            </span>
          </div>
        </div>
      </div>

      {/* Your Skills Strip */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-base text-slate-900">Your Core Skills</h2>
          <div className="flex items-center gap-2">
            <Link
              href="/connectors"
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
            >
              <span>Sync from Repos</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
          {quickSkillsList.map((sk) => (
            <div
              key={sk.name}
              className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs hover:shadow-card transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-900">{sk.name}</span>
                <span className="font-mono text-[10px] text-slate-500">{sk.score}%</span>
              </div>
              <div className="w-full h-1 bg-slate-100 rounded-full mt-3 overflow-hidden">
                <div className={`h-full ${sk.color} rounded-full`} style={{ width: `${sk.score}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Category Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-2 shadow-card flex items-center gap-1.5 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 ${
              selectedCategory === cat
                ? 'bg-primary text-white shadow-2xs'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3. Proof Matrix Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredSkills.map((node) => (
          <div
            key={node.id}
            className="bg-white rounded-xl border border-slate-200 p-5 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-blue-50 text-primary font-mono text-[10px] font-bold">
                      {node.category}
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-mono text-[10px] font-bold border border-emerald-200">
                      {node.evidenceCount} Verified Proofs
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-slate-900 mt-1">{node.name}</h3>
                </div>

                <div className="text-right">
                  <span className="text-xl font-bold font-mono text-slate-900">{node.marketDemandScore}%</span>
                  <p className="text-[10px] text-slate-400 font-mono">AST Verified</p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-3">
                <div
                  className="bg-primary h-full rounded-full"
                  style={{ width: `${node.marketDemandScore}%` }}
                ></div>
              </div>

              {/* Evidence Items */}
              <div className="space-y-2 mt-4">
                <p className="font-mono text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                  Verified Proof Artifacts
                </p>
                {node.evidenceItems.map((ev) => (
                  <div
                    key={ev.id}
                    className="p-3 rounded-lg bg-slate-50 border border-slate-100 hover:bg-slate-100/80 transition-colors space-y-1"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-800 flex items-center gap-1.5">
                        <GitPullRequest className="w-3.5 h-3.5 text-primary" />
                        {ev.title}
                      </span>
                      <span className="font-mono text-[10px] text-slate-400">{ev.verifiedDate}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-mono">{ev.provenance}</p>
                    <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-semibold pt-0.5">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{ev.metric}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-mono text-[11px]">Last verified 2 hours ago</span>
              <button
                type="button"
                onClick={() => triggerToast(`Auditing proof graph for ${node.name}...`)}
                className="text-primary hover:underline font-semibold flex items-center gap-1"
              >
                <span>Audit AST Proof</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Evidence Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-modal w-full max-w-md p-6 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-primary flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-base text-slate-900">Add Verified Evidence</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddEvidence} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Evidence Title / Artifact Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. IntelliGuard NGFW eBPF Packet Filter"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg border border-slate-200 text-slate-900 focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Provenance Source / Commit Hash / URL
                </label>
                <input
                  type="text"
                  placeholder="e.g. github.com/user/repo commit #9f84bc12"
                  value={newProvenance}
                  onChange={(e) => setNewProvenance(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg border border-slate-200 text-slate-900 font-mono focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Verified Metric / Performance Proof
                </label>
                <input
                  type="text"
                  placeholder="e.g. 4.8M packets/sec at 120ns latency"
                  value={newMetric}
                  onChange={(e) => setNewMetric(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg border border-slate-200 text-slate-900 focus:outline-none focus:border-primary"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-slate-600 font-medium hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-primary hover:bg-primary-hover text-white font-semibold shadow-2xs"
                >
                  Inject into Graph
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
