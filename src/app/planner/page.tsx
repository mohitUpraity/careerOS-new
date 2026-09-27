'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Clock,
  Plus,
  Target,
  Flame,
  Check,
  Timer,
  MoreHorizontal,
  Briefcase,
  Layers,
  ArrowRight,
} from 'lucide-react';

export default function PlannerPage() {
  const [viewMode, setViewMode] = useState<'Day' | 'Week' | 'Month'>('Day');
  const [activeTab, setActiveTab] = useState('Overview');
  const [toast, setToast] = useState<string | null>(null);

  const [tasks, setTasks] = useState([
    {
      id: 't_1',
      title: 'Read RAG Evaluation Techniques',
      subtitle: 'Complete Chapter 3: Evaluation Metrics',
      tag: 'Learning',
      duration: '45 min',
      completedAt: '10:15 AM',
      status: 'completed',
    },
    {
      id: 't_2',
      title: 'Update CareerOS README & Architecture',
      subtitle: 'Add new RAG module and architecture diagram',
      tag: 'Project',
      duration: '30 min',
      completedAt: '12:00 PM',
      status: 'completed',
    },
    {
      id: 't_3',
      title: 'Apply to Google AI Intern Role',
      subtitle: 'Tailor resume for Distributed Systems and submit application',
      tag: 'Application',
      duration: '40 min',
      completedAt: null,
      status: 'in_progress',
    },
    {
      id: 't_4',
      title: 'Practice 2 LeetCode Hard Flow Problems',
      subtitle: 'Dinic Algorithm & Bipartite Matching benchmarks',
      tag: 'Algorithms',
      duration: '60 min',
      completedAt: null,
      status: 'pending',
    },
    {
      id: 't_5',
      title: 'Draft LinkedIn Post on eBPF Kernel Filtering',
      subtitle: 'Share benchmark results of 4.8M pps throughput',
      tag: 'Presence',
      duration: '25 min',
      completedAt: null,
      status: 'pending',
    },
  ]);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const isDone = t.status === 'completed';
          return {
            ...t,
            status: isDone ? 'pending' : 'completed',
            completedAt: isDone ? null : 'Just now',
          };
        }
        return t;
      })
    );
    triggerToast('Task state updated!');
  };

  const completedCount = tasks.filter((t) => t.status === 'completed').length;

  const scheduleEvents = [
    { time: '09:00 AM', title: 'Deep Work: eBPF Filtering Pipeline', dur: '1h 30m', color: 'border-l-primary bg-blue-50/50' },
    { time: '11:00 AM', title: 'RAG Context Precision Optimization', dur: '45m', color: 'border-l-emerald-500 bg-emerald-50/50' },
    { time: '02:00 PM', title: 'Mock Interview Simulation (Arena)', dur: '1h 00m', color: 'border-l-purple-500 bg-purple-50/50' },
    { time: '04:30 PM', title: 'Application Dossier Submission', dur: '30m', color: 'border-l-amber-500 bg-amber-50/50' },
  ];

  return (
    <div className="space-y-6 pb-16">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-xl border border-slate-700 animate-in fade-in slide-in-from-bottom-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toast}</span>
        </div>
      )}

      {/* Top Header & Controller */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <span className="font-mono text-xs text-slate-400 uppercase tracking-wider font-semibold">
            EXECUTION TIMELINE &amp; AGENDAS
          </span>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5">Planner</h1>
          <p className="text-sm text-slate-500">Plan your career growth with daily tasks, goals and deadlines.</p>
        </div>

        {/* Date Navigation & View Segmented Switcher */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center bg-white border border-slate-200 rounded-lg shadow-2xs p-1">
            <button
              type="button"
              onClick={() => triggerToast('Previous day selected.')}
              className="w-8 h-8 flex items-center justify-center rounded text-slate-500 hover:bg-slate-100"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1.5 px-3 text-xs font-semibold text-slate-900">
              <span>Sun, 27 Sept 2026</span>
              <Calendar className="w-4 h-4 text-slate-400" />
            </div>
            <button
              type="button"
              onClick={() => triggerToast('Next day selected.')}
              className="w-8 h-8 flex items-center justify-center rounded text-slate-500 hover:bg-slate-100"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => triggerToast('Jumped to today.')}
            className="px-3.5 h-9 rounded-lg bg-white border border-slate-200 text-slate-700 font-semibold text-xs shadow-2xs hover:bg-slate-50"
          >
            Today
          </button>

          <div className="flex items-center bg-slate-100 p-1 rounded-lg">
            {(['Day', 'Week', 'Month'] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                  viewMode === mode
                    ? 'bg-primary text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sub-navigation Tabs */}
      <div className="flex items-center gap-4 overflow-x-auto border-b border-slate-200 pb-2 text-xs">
        {['Overview', 'Calendar', 'Tasks', 'Goals', 'Habits', 'Notes'].map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`pb-1 font-semibold transition-all relative ${
              activeTab === tab
                ? 'text-primary border-b-2 border-primary'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Top Metrics Row (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Today's Progress */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-card flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-4 h-4 text-primary" />
            <span className="font-bold text-xs text-slate-900">Today's Progress</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <div className="relative w-16 h-16 shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <circle className="stroke-slate-100" cx="18" cy="18" fill="none" r="14.5" strokeWidth="3" />
                <circle
                  className="stroke-primary"
                  cx="18"
                  cy="18"
                  fill="none"
                  r="14.5"
                  strokeDasharray={`${(completedCount / tasks.length) * 91.1} 91.1`}
                  strokeLinecap="round"
                  strokeWidth="3.5"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center font-bold text-xs text-slate-900">
                {completedCount}/{tasks.length}
              </div>
            </div>
            <div className="space-y-1 text-[11px] flex-1">
              <div className="flex items-center gap-1.5 text-emerald-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>{completedCount} completed</span>
              </div>
              <div className="flex items-center gap-1.5 text-blue-700">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                <span>1 in progress</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400">
                <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                <span>{tasks.length - completedCount - 1} pending</span>
              </div>
            </div>
          </div>
        </div>

        {/* Focus Areas */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-card flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-1">
            <Target className="w-4 h-4 text-primary" />
            <span className="font-bold text-xs text-slate-900">Focus Areas</span>
          </div>
          <p className="text-[11px] text-slate-400 mb-2">Key technical initiatives for Q3</p>
          <div className="flex flex-wrap gap-1.5">
            <span className="px-2.5 py-0.5 rounded bg-blue-50 text-primary text-xs font-semibold">RAG Pipeline</span>
            <span className="px-2.5 py-0.5 rounded bg-slate-100 text-slate-800 text-xs font-medium">CareerOS</span>
            <span className="px-2.5 py-0.5 rounded bg-amber-50 text-amber-800 text-xs font-medium">Google Intern</span>
          </div>
        </div>

        {/* Productivity */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-card flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs text-slate-900">Productivity</span>
            <Timer className="w-4 h-4 text-slate-400" />
          </div>
          <div className="flex items-end justify-between mt-2">
            <div>
              <span className="text-xl font-bold font-mono text-slate-900">4h 20m</span>
              <p className="text-[11px] text-slate-400">Total focus time today</p>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-mono text-[10px] font-bold">
              +12% vs yesterday
            </span>
          </div>
        </div>

        {/* Streaks */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-card flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-xs text-slate-900">Streaks</span>
            <Flame className="w-4 h-4 text-amber-500" />
          </div>
          <div className="grid grid-cols-3 gap-2 text-center pt-1">
            <div className="bg-slate-50 p-2 rounded-lg">
              <span className="font-bold font-mono text-base text-slate-900 block">12</span>
              <span className="text-[10px] text-slate-400">Learning</span>
            </div>
            <div className="bg-slate-50 p-2 rounded-lg">
              <span className="font-bold font-mono text-base text-slate-900 block">8</span>
              <span className="text-[10px] text-slate-400">Tasks</span>
            </div>
            <div className="bg-slate-50 p-2 rounded-lg">
              <span className="font-bold font-mono text-base text-slate-900 block">6</span>
              <span className="text-[10px] text-slate-400">Posts</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Middle Section (Tasks vs Daily Schedule) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Today's Tasks (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 shadow-card p-6 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-base text-slate-900">Today's Tasks</h2>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-mono text-[11px] font-bold">
                {completedCount} of {tasks.length} completed
              </span>
            </div>
            <button
              type="button"
              onClick={() => triggerToast('Task creation modal opened.')}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs font-semibold shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Task</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {tasks.map((task) => {
              const isCompleted = task.status === 'completed';
              const isInProgress = task.status === 'in_progress';
              return (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`flex items-center justify-between p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isCompleted
                      ? 'bg-slate-50 border-slate-100 opacity-75'
                      : isInProgress
                      ? 'bg-blue-50/60 border-blue-200/80'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div
                      className={`w-5 h-5 mt-0.5 rounded flex items-center justify-center transition-colors shrink-0 ${
                        isCompleted
                          ? 'bg-emerald-500 text-white'
                          : isInProgress
                          ? 'border-2 border-primary'
                          : 'border border-slate-300'
                      }`}
                    >
                      {isCompleted && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <div className="min-w-0">
                      <h3
                        className={`text-xs font-semibold leading-tight ${
                          isCompleted ? 'line-through text-slate-500' : 'text-slate-900'
                        }`}
                      >
                        {task.title}
                      </h3>
                      <p className="text-[11px] text-slate-400 mt-0.5 truncate">{task.subtitle}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 text-xs">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[10px]">
                      {task.tag}
                    </span>
                    <span className="font-mono text-[11px] text-slate-400">{task.duration}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Daily Schedule / Time Blocks (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 shadow-card p-6 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h2 className="font-bold text-base text-slate-900">Today's Timeline Blocks</h2>
            <span className="font-mono text-[11px] text-slate-400">4 Events Scheduled</span>
          </div>

          <div className="space-y-3">
            {scheduleEvents.map((evt, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-xl border border-l-4 ${evt.color} space-y-1`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-slate-800">{evt.time}</span>
                  <span className="font-mono text-[11px] text-slate-500">{evt.dur}</span>
                </div>
                <h4 className="font-bold text-xs text-slate-900">{evt.title}</h4>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Link
              href="/interview-arena"
              className="w-full py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-primary font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Launch Live Interview Arena</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
