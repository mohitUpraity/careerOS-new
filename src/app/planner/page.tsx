'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Calendar as CalendarIcon,
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
  X,
  Search,
  Filter,
  Trash2,
  Edit2,
  BookOpen,
  Sparkles,
  Zap
} from 'lucide-react';

interface PlannerTask {
  id: string;
  title: string;
  subtitle: string;
  tag: 'Learning' | 'Project' | 'Application' | 'Algorithms' | 'Presence';
  duration: string;
  completedAt: string | null;
  status: 'pending' | 'in_progress' | 'completed';
}

interface GoalItem {
  id: string;
  title: string;
  targetDate: string;
  progress: number;
  category: string;
  keyResults: string[];
}

interface HabitItem {
  id: string;
  name: string;
  streak: number;
  days: boolean[]; // Mon - Sun
}

const initialTasks: PlannerTask[] = [
  {
    id: 't_1',
    title: 'Read RAG Evaluation Techniques',
    subtitle: 'Complete Chapter 3: Evaluation Metrics & TruLens',
    tag: 'Learning',
    duration: '45 min',
    completedAt: '10:15 AM',
    status: 'completed',
  },
  {
    id: 't_2',
    title: 'Update CareerOS Architecture Spec',
    subtitle: 'Finalize RAG module and provenance graph design',
    tag: 'Project',
    duration: '30 min',
    completedAt: '12:00 PM',
    status: 'completed',
  },
  {
    id: 't_3',
    title: 'Apply to Google AI Systems Role',
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
];

const initialGoals: GoalItem[] = [
  {
    id: 'g_1',
    title: 'Land High-Performance Systems Engineer Offer',
    targetDate: 'Oct 31, 2026',
    progress: 80,
    category: 'Career Target',
    keyResults: [
      'Submit 15 top-tier tailored applications (12 done)',
      'Pass 4 technical rounds with >90% Arena score (3 done)',
      'Publish 2 verified OSS benchmarks (2 done)',
    ],
  },
  {
    id: 'g_2',
    title: 'Master CUDA & GPU Kernel Architecture',
    targetDate: 'Nov 15, 2026',
    progress: 65,
    category: 'Skill Mastery',
    keyResults: [
      'Write Triton Flash-Attention kernel (Done)',
      'Profile CUDA memory coalescing and warp divergence (In Progress)',
      'Complete 5 custom GPU kernel assignments (3 done)',
    ],
  },
];

const initialHabits: HabitItem[] = [
  { id: 'h_1', name: 'LeetCode 1 Hard / 2 Mediums', streak: 14, days: [true, true, true, true, true, true, true] },
  { id: 'h_2', name: '45m Deep Technical Reading', streak: 8, days: [true, true, true, true, true, false, true] },
  { id: 'h_3', name: 'GitHub Commit / Proof Push', streak: 21, days: [true, true, true, true, true, true, true] },
  { id: 'h_4', name: 'LinkedIn Engineering Post / Check-in', streak: 6, days: [true, true, true, true, false, true, false] },
];

export default function PlannerPage() {
  const [viewMode, setViewMode] = useState<'Day' | 'Week' | 'Month'>('Day');
  const [activeTab, setActiveTab] = useState<'Overview' | 'Calendar' | 'Tasks' | 'Goals' | 'Habits' | 'Notes'>('Overview');
  const [selectedDayOffset, setSelectedDayOffset] = useState(0);
  const [toast, setToast] = useState<string | null>(null);

  // Tasks State
  const [tasks, setTasks] = useState<PlannerTask[]>(initialTasks);
  const [taskFilter, setTaskFilter] = useState<string>('ALL');
  const [taskSearch, setTaskSearch] = useState<string>('');

  // Habits State
  const [habits, setHabits] = useState<HabitItem[]>(initialHabits);

  // Notes State
  const [notes, setNotes] = useState<string>(
    '# Q3 Career Engineering Roadmap\n\n- Focus: Low latency distributed inference & eBPF networking\n- Scale AI Round 2: Revisit Raft election timeouts and log compaction\n- Anthropic Offer Review: Package comparison against $275k baseline'
  );

  // Add Task Modal
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newTag, setNewTag] = useState<PlannerTask['tag']>('Project');
  const [newDuration, setNewDuration] = useState('30 min');

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

  const deleteTask = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setTasks((prev) => prev.filter((t) => t.id !== id));
    triggerToast('Task removed.');
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTask: PlannerTask = {
      id: `t_${Date.now()}`,
      title: newTitle,
      subtitle: newSubtitle || 'Custom scheduled task',
      tag: newTag,
      duration: newDuration,
      completedAt: null,
      status: 'pending',
    };

    setTasks([newTask, ...tasks]);
    setIsAddTaskModalOpen(false);
    setNewTitle('');
    setNewSubtitle('');
    triggerToast('New task added to your daily agenda!');
  };

  const toggleHabitDay = (habitId: string, dayIndex: number) => {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id === habitId) {
          const newDays = [...h.days];
          newDays[dayIndex] = !newDays[dayIndex];
          return { ...h, days: newDays };
        }
        return h;
      })
    );
    triggerToast('Habit entry toggled!');
  };

  const completedCount = tasks.filter((t) => t.status === 'completed').length;

  const scheduleEvents = [
    { time: '09:00 AM', title: 'Deep Work: eBPF Filtering Pipeline', dur: '1h 30m', color: 'border-l-primary bg-blue-50/50' },
    { time: '11:00 AM', title: 'RAG Context Precision Optimization', dur: '45m', color: 'border-l-emerald-500 bg-emerald-50/50' },
    { time: '02:00 PM', title: 'Mock Interview Simulation (Arena)', dur: '1h 00m', color: 'border-l-purple-500 bg-purple-50/50' },
    { time: '04:30 PM', title: 'Application Dossier Submission', dur: '30m', color: 'border-l-amber-500 bg-amber-50/50' },
  ];

  const filteredTasks = tasks.filter((t) => {
    const matchesFilter =
      taskFilter === 'ALL' ||
      (taskFilter === 'COMPLETED' && t.status === 'completed') ||
      (taskFilter === 'PENDING' && t.status === 'pending') ||
      (taskFilter === 'IN_PROGRESS' && t.status === 'in_progress') ||
      t.tag.toUpperCase() === taskFilter;
    const matchesSearch =
      t.title.toLowerCase().includes(taskSearch.toLowerCase()) ||
      t.subtitle.toLowerCase().includes(taskSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getDisplayDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + selectedDayOffset);
    return d.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
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
              onClick={() => setSelectedDayOffset((prev) => prev - 1)}
              className="w-8 h-8 flex items-center justify-center rounded text-slate-500 hover:bg-slate-100"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1.5 px-3 text-xs font-semibold text-slate-900">
              <span>{getDisplayDate()}</span>
              <CalendarIcon className="w-4 h-4 text-slate-400" />
            </div>
            <button
              type="button"
              onClick={() => setSelectedDayOffset((prev) => prev + 1)}
              className="w-8 h-8 flex items-center justify-center rounded text-slate-500 hover:bg-slate-100"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              setSelectedDayOffset(0);
              triggerToast('Jumped to today.');
            }}
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

          <button
            type="button"
            onClick={() => setIsAddTaskModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 h-9 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs font-semibold shadow-2xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Task</span>
          </button>
        </div>
      </div>

      {/* Sub-navigation Tabs */}
      <div className="flex items-center gap-4 overflow-x-auto border-b border-slate-200 pb-2 text-xs">
        {(['Overview', 'Calendar', 'Tasks', 'Goals', 'Habits', 'Notes'] as const).map((tab) => (
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

      {/* VIEW 1: OVERVIEW TAB */}
      {activeTab === 'Overview' && (
        <div className="space-y-6">
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
                      strokeDasharray={`${tasks.length > 0 ? (completedCount / tasks.length) * 91.1 : 0} 91.1`}
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
                    <span>{Math.max(0, tasks.length - completedCount - 1)} pending</span>
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
                  onClick={() => setIsAddTaskModalOpen(true)}
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
                        <button
                          type="button"
                          onClick={(e) => deleteTask(task.id, e)}
                          className="p-1 rounded text-slate-400 hover:text-red-500"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
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
      )}

      {/* VIEW 2: CALENDAR TAB (Respects Day / Week / Month mode) */}
      {activeTab === 'Calendar' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-card space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-base text-slate-900">
              {viewMode === 'Day' && 'Day Schedule & Time Blocks'}
              {viewMode === 'Week' && 'Weekly Planner Matrix'}
              {viewMode === 'Month' && 'Month Overview (Q3 2026)'}
            </h3>
            <span className="font-mono text-xs text-primary font-bold">{getDisplayDate()}</span>
          </div>

          {viewMode === 'Day' && (
            <div className="space-y-3">
              {scheduleEvents.map((evt, idx) => (
                <div key={idx} className={`p-4 rounded-xl border border-l-4 ${evt.color} flex items-center justify-between`}>
                  <div>
                    <span className="font-mono text-xs text-slate-500 font-bold">{evt.time} ({evt.dur})</span>
                    <h4 className="font-bold text-sm text-slate-900 mt-0.5">{evt.title}</h4>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-white text-slate-700 font-mono text-[10px] font-bold border border-slate-200">
                    CALENDAR BLOCK
                  </span>
                </div>
              ))}
            </div>
          )}

          {viewMode === 'Week' && (
            <div className="grid grid-cols-1 md:grid-cols-7 gap-3 text-xs">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
                <div key={day} className={`p-3 rounded-xl border ${idx === 6 ? 'bg-blue-50/50 border-primary' : 'bg-slate-50 border-slate-200'} space-y-2`}>
                  <div className="flex items-center justify-between font-bold">
                    <span>{day}</span>
                    <span className="font-mono text-[10px] text-slate-400">Sept {21 + idx}</span>
                  </div>
                  <div className="p-2 rounded bg-white border border-slate-200 shadow-2xs space-y-1">
                    <span className="text-[10px] font-bold text-slate-800 block">Deep Work</span>
                    <span className="text-[10px] font-mono text-primary block">2h focus</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {viewMode === 'Month' && (
            <div className="grid grid-cols-7 gap-2 text-center text-xs">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                <div key={i} className="font-bold text-slate-400 font-mono py-1">{d}</div>
              ))}
              {Array.from({ length: 30 }).map((_, i) => (
                <div
                  key={i}
                  className={`p-2.5 rounded-lg border text-xs font-semibold ${
                    i === 26
                      ? 'bg-primary text-white border-primary'
                      : i % 4 === 0
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : 'bg-white border-slate-100 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="font-mono">{i + 1}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* VIEW 3: TASKS TAB */}
      {activeTab === 'Tasks' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-card space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={taskSearch}
                onChange={(e) => setTaskSearch(e.target.value)}
                className="w-full h-9 pl-9 pr-3 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-primary"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
              {['ALL', 'PENDING', 'IN_PROGRESS', 'COMPLETED', 'LEARNING', 'PROJECT', 'APPLICATION'].map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setTaskFilter(f)}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all shrink-0 ${
                    taskFilter === f
                      ? 'bg-primary text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {f.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            {filteredTasks.map((t) => (
              <div
                key={t.id}
                onClick={() => toggleTask(t.id)}
                className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded flex items-center justify-center ${
                      t.status === 'completed' ? 'bg-emerald-500 text-white' : 'border border-slate-300'
                    }`}
                  >
                    {t.status === 'completed' && <Check className="w-3.5 h-3.5" />}
                  </div>
                  <div>
                    <h4 className={`text-xs font-semibold ${t.status === 'completed' ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                      {t.title}
                    </h4>
                    <p className="text-[11px] text-slate-500">{t.subtitle}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-slate-100 font-mono text-[10px] text-slate-700">{t.tag}</span>
                  <span className="font-mono text-xs text-slate-400">{t.duration}</span>
                  <button
                    type="button"
                    onClick={(e) => deleteTask(t.id, e)}
                    className="p-1 rounded text-slate-400 hover:text-red-500 ml-2"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 4: GOALS TAB */}
      {activeTab === 'Goals' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {initialGoals.map((g) => (
            <div key={g.id} className="bg-white rounded-xl border border-slate-200 p-6 shadow-card space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="px-2 py-0.5 rounded bg-blue-50 text-primary font-mono text-[10px] font-bold">
                    {g.category}
                  </span>
                  <h3 className="font-bold text-base text-slate-900 mt-1">{g.title}</h3>
                  <p className="text-xs text-slate-400">Target Date: {g.targetDate}</p>
                </div>
                <span className="text-2xl font-bold font-mono text-primary">{g.progress}%</span>
              </div>

              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full transition-all" style={{ width: `${g.progress}%` }}></div>
              </div>

              <div className="space-y-2 pt-2 text-xs">
                <h4 className="font-bold text-slate-800">Key Results Checklist:</h4>
                {g.keyResults.map((kr, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-slate-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{kr}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIEW 5: HABITS TAB */}
      {activeTab === 'Habits' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-base text-slate-900">Daily Execution Streaks &amp; Habits</h3>
            <span className="text-xs text-slate-400 font-mono">Current Week</span>
          </div>

          <div className="space-y-3">
            {habits.map((h) => (
              <div key={h.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold font-mono text-xs">
                    <Flame className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">{h.name}</h4>
                    <span className="text-[11px] font-mono text-emerald-600 font-bold">{h.streak} Day Streak 🔥</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((dayLabel, dIdx) => (
                    <button
                      key={dIdx}
                      type="button"
                      onClick={() => toggleHabitDay(h.id, dIdx)}
                      className={`w-7 h-7 rounded-lg font-mono text-xs font-bold transition-all flex items-center justify-center ${
                        h.days[dIdx]
                          ? 'bg-emerald-500 text-white shadow-2xs'
                          : 'bg-white border border-slate-200 text-slate-400 hover:border-slate-400'
                      }`}
                    >
                      {dayLabel}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 6: NOTES TAB */}
      {activeTab === 'Notes' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-base text-slate-900">Engineering Scratchpad &amp; Retrospectives</h3>
            <button
              type="button"
              onClick={() => triggerToast('Notes auto-saved to workspace ledger.')}
              className="px-3.5 py-1.5 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs font-semibold"
            >
              Save Notes
            </button>
          </div>

          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={12}
            className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-900 leading-relaxed focus:outline-none focus:bg-white focus:border-primary"
          />
        </div>
      )}

      {/* Add Task Modal */}
      {isAddTaskModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-modal w-full max-w-md p-6 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">Add Agenda Task</h3>
              <button
                type="button"
                onClick={() => setIsAddTaskModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Task Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Implement Raft Log Compaction"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Subtitle / Key Deliverable</label>
                <input
                  type="text"
                  placeholder="e.g. Pass snapshot restoration test suite"
                  value={newSubtitle}
                  onChange={(e) => setNewSubtitle(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Tag</label>
                  <select
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value as PlannerTask['tag'])}
                    className="w-full h-9 px-3 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-primary"
                  >
                    <option value="Learning">Learning</option>
                    <option value="Project">Project</option>
                    <option value="Application">Application</option>
                    <option value="Algorithms">Algorithms</option>
                    <option value="Presence">Presence</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Duration</label>
                  <input
                    type="text"
                    placeholder="e.g. 45 min"
                    value={newDuration}
                    onChange={(e) => setNewDuration(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddTaskModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white font-semibold shadow-2xs"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
