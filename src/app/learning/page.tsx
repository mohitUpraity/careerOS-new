'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  CheckCircle2,
  Clock,
  ArrowRight,
  BookOpen,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Play,
  Check,
  Calendar,
  Lightbulb,
  Target,
  Trophy,
  Flame,
  Award,
  Layers,
  BarChart3,
  TrendingUp,
} from 'lucide-react';

export default function LearningPage() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [toast, setToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const stages = [
    { name: 'Foundations', progress: 100, status: 'completed' },
    { name: 'Machine Learning', progress: 100, status: 'completed' },
    { name: 'Deep Learning', progress: 72, status: 'active', step: 3 },
    { name: 'LLM Eng.', progress: 45, status: 'upcoming', step: 4 },
    { name: 'RAG', progress: 30, status: 'upcoming', step: 5 },
    { name: 'Prod AI', progress: 10, status: 'upcoming', step: 6 },
    { name: 'System Design', progress: 0, status: 'upcoming', step: 7 },
  ];

  const subTabs = ['Overview', 'Roadmap', "Today's Plan", 'Resources', 'Projects', 'Certificates'];

  return (
    <div className="space-y-6 pb-16">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-xl border border-slate-700 animate-in fade-in slide-in-from-bottom-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toast}</span>
        </div>
      )}

      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="font-mono text-xs text-slate-400 uppercase tracking-wider font-semibold">
            SKILL GAP ROADMAP &amp; TARGET MASTERY
          </span>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
            Learning &amp; Technical Roadmap
          </h1>
          <p className="text-sm text-slate-500">
            Personalized learning curricula deterministically engineered to close skill gaps for AI roles.
          </p>
        </div>

        {/* Header Right Controls */}
        <div className="flex items-center gap-4 flex-wrap">
          {/* Target Role Dropdown */}
          <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-card">
            <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider font-bold">Target Role</span>
            <span className="text-xs font-bold text-slate-900">AI Engineer</span>
          </div>

          {/* Overall Progress */}
          <div className="flex items-center gap-3 bg-white border border-slate-200 px-4 py-1.5 rounded-lg shadow-card min-w-[210px]">
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1 text-xs">
                <span className="text-slate-600 font-medium">Overall Progress</span>
                <span className="font-mono font-bold text-primary">42%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: '42%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stepper Progression Track: 7 Stages */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-card overflow-x-auto">
        <div className="flex items-center min-w-[860px] justify-between gap-2">
          {stages.map((stage, idx) => {
            const isCompleted = stage.status === 'completed';
            const isActive = stage.status === 'active';
            return (
              <React.Fragment key={stage.name}>
                <div
                  onClick={() => triggerToast(`Navigating to ${stage.name} syllabus...`)}
                  className={`flex-1 flex items-center gap-2.5 p-2 rounded-lg cursor-pointer transition-all ${
                    isActive ? 'bg-blue-50/80 border border-blue-200/60' : 'hover:bg-slate-50'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 font-mono text-xs font-bold ${
                      isCompleted
                        ? 'bg-emerald-500 text-white'
                        : isActive
                        ? 'bg-primary text-white'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {isCompleted ? <Check className="w-4 h-4" /> : stage.step}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between text-xs">
                      <span className={`font-semibold truncate ${isActive ? 'text-primary' : 'text-slate-800'}`}>
                        {stage.name}
                      </span>
                      <span className="font-mono text-[11px] font-bold text-slate-500">{stage.progress}%</span>
                    </div>
                    <div className="w-full h-1 bg-slate-100 rounded-full mt-1.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          isCompleted ? 'bg-emerald-500' : isActive ? 'bg-primary' : 'bg-slate-300'
                        }`}
                        style={{ width: `${stage.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                {idx < stages.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Sub-Navigation Tab Row */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1">
        {subTabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              activeTab === tab
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Primary Multi-Pane Content Canvas (8 cols Left / 4 cols Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN (Main Canvas - 8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6 min-w-0">
          {/* Today's Learning Task (Split Spotlight Card) */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-card space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <Calendar className="w-5 h-5" />
              <h2 className="font-bold text-base text-slate-900">Today's Learning Focus</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch pt-1">
              {/* Left side: Task Core Details */}
              <div className="md:col-span-7 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center shrink-0">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-base text-slate-900 leading-snug">
                        RAG Evaluation &amp; Context Precision Optimization
                      </h3>
                      <div className="flex items-center flex-wrap gap-1.5 mt-1.5 text-xs">
                        <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 font-medium">
                          Intermediate
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 font-mono text-slate-600">
                          <Clock className="w-3 h-3" /> 45 min
                        </span>
                        <span className="px-2 py-0.5 rounded bg-blue-50 text-primary font-semibold">
                          Part of: RAG Module
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                    Master automated benchmark evaluation using Ragas, context precision scoring, and embedding re-ranking (Cohere / BGE reranker).
                  </p>
                </div>

                <div className="flex items-center gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => triggerToast('Launching interactive RAG evaluation lab...')}
                    className="inline-flex items-center justify-center gap-1.5 px-4 h-9 rounded-lg bg-primary text-white font-semibold text-xs shadow-2xs hover:bg-primary-hover transition-all"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Start Learning</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => triggerToast('Task marked as completed! 50 XP awarded.')}
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 h-9 rounded-lg bg-slate-100 text-slate-700 font-semibold text-xs hover:bg-slate-200 transition-colors"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Mark Complete</span>
                  </button>
                </div>
              </div>

              {/* Right side: 'Why this task?' Intelligence Box */}
              <div className="md:col-span-5 bg-slate-50 border border-slate-100 rounded-xl p-4 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center gap-1.5 text-amber-600 mb-2">
                    <Lightbulb className="w-4 h-4" />
                    <span className="font-mono text-[10px] uppercase tracking-wider font-bold">Why this task?</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    RAG is a required qualification in <strong className="text-slate-900 font-bold">68%</strong> of your 24 saved job matches. Completing this unlocks 12 additional high-match opportunities.
                  </p>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-200/60 text-[11px] text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>Required for Google AI &amp; Anthropic JDs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Directly links into Evidence Graph</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Continue Learning Section */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-card space-y-4">
            <h2 className="font-bold text-base text-slate-900">Active Curriculum Modules</h2>
            <div className="space-y-3">
              {[
                {
                  title: 'Distributed KV-Cache & PagedAttention Optimization',
                  category: 'Distributed Systems',
                  status: 'Completed',
                  progress: 100,
                  time: '4h 30m',
                },
                {
                  title: 'FlashDecoding++ & Speculative Verification Latency',
                  category: 'Kernel Programming',
                  status: 'In Progress',
                  progress: 65,
                  time: '3h 15m',
                },
                {
                  title: 'Multi-GPU Straggler Mitigation & NCCL Collectives',
                  category: 'Cluster Engineering',
                  status: 'Upcoming',
                  progress: 0,
                  time: '5h 00m',
                },
              ].map((m, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-slate-100/80 transition-colors flex items-center justify-between gap-4"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-blue-50 text-primary font-mono text-[10px] font-bold">
                        {m.category}
                      </span>
                      <span className="font-mono text-[11px] text-slate-400">{m.time}</span>
                    </div>
                    <h4 className="font-bold text-xs text-slate-900 truncate">{m.title}</h4>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="w-24 hidden sm:block">
                      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-primary h-full rounded-full" style={{ width: `${m.progress}%` }}></div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => triggerToast(`Resumed ${m.title}`)}
                      className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-2xs"
                    >
                      {m.progress === 100 ? 'Review' : 'Resume'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Weekly Streak Widget */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-500" />
                <h3 className="font-bold text-sm text-slate-900">Study Streak</h3>
              </div>
              <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 font-mono text-xs font-bold">
                5 DAYS
              </span>
            </div>

            <div className="flex items-center justify-between gap-1 pt-1">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold ${
                      i < 5 ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {i < 5 ? <Check className="w-3.5 h-3.5" /> : day}
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">{day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Skill Gap Closure Meter */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-card space-y-4">
            <h3 className="font-bold text-sm text-slate-900">Target Gap Closure</h3>
            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between text-slate-700 mb-1">
                  <span>RAG System Architecture</span>
                  <span className="font-mono font-bold text-primary">78% / 100%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-700 mb-1">
                  <span>vLLM Kernel Optimization</span>
                  <span className="font-mono font-bold text-emerald-600">92% / 100%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick RFCs & Library link */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-card space-y-3 text-xs font-semibold">
            <h3 className="text-sm font-bold text-slate-900 mb-2">Curated RFCs &amp; Deep Dives</h3>
            <Link
              href="/resources"
              className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-100 text-slate-700 transition-colors"
            >
              <span>Explore Technical RFCs</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              href="/skills-and-evidence"
              className="flex items-center justify-between p-3 rounded-lg bg-blue-50/70 hover:bg-blue-50 border border-blue-200/60 text-primary transition-colors"
            >
              <span>Verify Skills into Graph</span>
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
