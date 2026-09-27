'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Zap,
  TrendingUp,
  Clock,
  ArrowRight,
  Rocket,
  Terminal,
  CheckCircle2,
  Play,
  RotateCw,
  Briefcase,
  ShieldCheck,
  Radio,
  FileText,
  Calendar,
  Layers,
  ChevronRight,
  Target,
  BarChart2,
} from 'lucide-react';
import {
  mockUserProfile,
  mockNextBestAction,
  mockTodayTimeline,
  mockRadarOpportunities,
  mockQuickStats,
} from '@/data/mock/dashboardData';

export default function DashboardPage() {
  const [activeStep, setActiveStep] = useState(2);
  const [tasks, setTasks] = useState(mockTodayTimeline);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleTaskAction = (taskId: string, title: string) => {
    triggerToast(`Action initiated for: "${title}"`);
  };

  return (
    <div className="space-y-6">
      {/* 1. Top Executive Mission & Context Header */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-card flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono text-[11px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Autopilot Active
            </span>
            <span className="font-mono text-[11px] text-slate-400">
              Sun, 27 Sep 2026 • 21:30 IST
            </span>
            <span className="px-2 py-0.5 rounded bg-blue-50 border border-blue-100 text-primary font-mono text-[11px] font-semibold">
              Track: {mockUserProfile.targetRole} ({mockUserProfile.targetTrack})
            </span>
          </div>

          <div className="flex items-center gap-3 mt-1">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Good evening, {mockUserProfile.name.split(' ')[0]}
            </h1>
            <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-primary font-mono text-xs font-semibold border border-blue-200/80">
              {mockUserProfile.phase}
            </span>
          </div>

          <p className="text-sm text-slate-500">
            Milestone Target: Complete containerized serving stack &amp; 3 enterprise AI applications by Friday.
          </p>
        </div>

        {/* Career Readiness Telemetry Widget */}
        <div className="flex items-center gap-4 bg-slate-50 border border-slate-200/80 p-4 rounded-xl shrink-0">
          <div className="flex flex-col">
            <div className="flex items-center justify-between gap-4">
              <span className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Profile &amp; Evidence Readiness
              </span>
              <span className="inline-flex items-center gap-1 text-emerald-600 font-mono text-[11px] font-bold">
                <TrendingUp className="w-3.5 h-3.5" />
                {mockUserProfile.readinessGrowthThisWeek}
              </span>
            </div>

            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {mockUserProfile.readinessScore}%
              </span>
              <span className="font-mono text-xs text-slate-400">
                / {mockUserProfile.readinessTarget}% Target Threshold
              </span>
            </div>

            {/* 4-Segment Telemetry Bar */}
            <div className="w-56 h-2.5 bg-slate-200 rounded-full overflow-hidden flex gap-0.5 mt-2 p-0.5">
              <div className="h-full bg-primary rounded-full" style={{ width: '45%' }} title="Core Qualifications" />
              <div className="h-full bg-primary rounded-full" style={{ width: '27%' }} title="Verified Evidence" />
              <div className="h-full bg-blue-300 rounded-full" style={{ width: '18%' }} title="Target Alignment" />
              <div className="h-full bg-slate-300 rounded-full" style={{ width: '10%' }} title="Pending Audits" />
            </div>
          </div>

          <Link
            href="/skills-and-evidence"
            className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-primary flex items-center justify-center transition-colors shadow-2xs"
            title="View Evidence Breakdown"
          >
            <BarChart2 className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 2. Next Best Action: Command Hero Section */}
      <section className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white p-6 lg:p-8 shadow-card">
        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-6">
          <div className="flex flex-col gap-3 max-w-3xl">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-blue-500 text-white font-mono text-[11px] font-bold uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5 fill-white" /> NEXT BEST ACTION
              </span>
              <span className="font-mono text-xs text-blue-200 font-semibold">
                {mockNextBestAction.impactTag}
              </span>
              <span className="text-blue-400 text-xs">•</span>
              <span className="font-mono text-xs text-blue-300 flex items-center gap-1">
                <Clock className="w-3 h-3" /> {mockNextBestAction.estimatedTime}
              </span>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-white">
              {mockNextBestAction.title}
            </h2>

            <p className="text-sm text-blue-100/90 leading-relaxed">
              {mockNextBestAction.description}
            </p>

            {/* Stepper Pipeline */}
            <div className="flex items-center gap-2 mt-2 flex-wrap text-xs font-mono">
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-white/10 text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>1. Containerize FastAPI App</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-blue-300/60" />
              <div className="flex items-center gap-1.5 bg-white text-blue-900 px-3 py-1.5 rounded-lg font-bold shadow-xs">
                <RotateCw className="w-4 h-4 text-blue-600 animate-spin" />
                <span>2. Multi-stage Dockerfile Setup</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-blue-300/60" />
              <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 text-blue-300">
                <Clock className="w-4 h-4 text-blue-400" />
                <span>3. Cloud Run Smoke Test</span>
              </div>
            </div>
          </div>

          {/* Action Button Cluster */}
          <div className="flex flex-col sm:flex-row xl:flex-col gap-2.5 shrink-0">
            <Link
              href="/skills-and-evidence"
              className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-lg bg-white text-blue-900 font-semibold text-sm hover:bg-blue-50 shadow-md transition-all active:scale-95"
            >
              <span>{mockNextBestAction.primaryActionLabel}</span>
              <Rocket className="w-4 h-4 text-blue-700" />
            </Link>
            <button
              type="button"
              onClick={() => triggerToast('Opening step instructions drawer')}
              className="inline-flex items-center justify-center gap-2 h-9 px-4 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-xs border border-white/10 transition-colors"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>View Terminal Breakdown</span>
            </button>
          </div>
        </div>

        {/* Decorative Grid Light Pattern */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial-gradient from-blue-400/20 to-transparent pointer-events-none" />
      </section>

      {/* 3. Quick Metrics Overview Strip */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {mockQuickStats.map((stat, idx) => (
          <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-card flex flex-col justify-between">
            <span className="font-mono text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              {stat.label}
            </span>
            <div className="flex items-baseline gap-2 my-1">
              <span className="text-2xl font-bold text-slate-900">{stat.value}</span>
              <span className="text-xs text-slate-500 font-medium">{stat.subtext}</span>
            </div>
            <span className="text-[11px] font-mono text-emerald-600 font-semibold">
              {stat.change}
            </span>
          </div>
        ))}
      </section>

      {/* 4. Master 3-Column Command Grid (Left 7 Cols / Right 5 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT 7 COLUMNS: Today's Execution Plan & Opportunity Radar */}
        <div className="lg:col-span-7 space-y-6">
          {/* Today's Execution Timeline */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-card">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                <h3 className="font-bold text-base text-slate-900">Today&apos;s Execution Plan</h3>
                <span className="font-mono text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold">
                  {tasks.length} priority tasks
                </span>
              </div>
              <span className="font-mono text-xs text-slate-400">Target Est: 2h 50m</span>
            </div>

            <div className="divide-y divide-slate-100">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="py-3.5 flex items-start justify-between gap-4 group hover:bg-slate-50/80 rounded-lg px-2 -mx-2 transition-colors"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <span className="font-mono text-xs text-primary font-bold pt-0.5 w-16 shrink-0">
                      {task.time}
                    </span>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-semibold text-slate-900 group-hover:text-primary transition-colors truncate">
                          {task.title}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${task.categoryColor}`}>
                          {task.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-xs text-slate-400 font-medium">
                        <span>{task.goalReference}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {task.duration}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleTaskAction(task.id, task.title)}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-primary hover:bg-primary-hover text-white text-xs font-semibold shrink-0 shadow-2xs transition-colors active:scale-95"
                  >
                    <Play className="w-3 h-3 fill-white" />
                    <span className="capitalize">{task.actionType}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* High-Match Opportunity Radar */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-card">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <Briefcase className="w-4 h-4 text-primary" />
                <h3 className="font-bold text-base text-slate-900">High-Match Opportunity Radar</h3>
                <span className="font-mono text-[11px] px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-semibold">
                  3 verified fits
                </span>
              </div>
              <Link
                href="/opportunities"
                className="text-xs font-semibold text-primary hover:text-primary-hover flex items-center gap-1"
              >
                <span>View All (24)</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {mockRadarOpportunities.map((opp) => (
                <div key={opp.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
                  <div className="flex flex-col gap-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-sm text-slate-900 group-hover:text-primary transition-colors">
                        {opp.title}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono text-[11px] font-bold">
                        {opp.matchScore}% Match
                      </span>
                      {opp.isVerified && (
                        <span className="inline-flex items-center gap-1 text-[11px] text-blue-600 font-mono" title="Verified against evidence graph">
                          <ShieldCheck className="w-3.5 h-3.5" /> Verified Fit
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                      <span className="font-semibold text-slate-700">{opp.company}</span>
                      <span>•</span>
                      <span>{opp.location}</span>
                      <span>•</span>
                      <span className="font-mono font-semibold text-slate-900">{opp.salaryOrStipend}</span>
                    </div>

                    {/* Skill Tags */}
                    <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                      {opp.tags.map((tag, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono text-[10px]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      href="/resume"
                      className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors"
                    >
                      Tailor Resume
                    </Link>
                    <Link
                      href="/opportunities"
                      className="px-3 py-1.5 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs font-semibold shadow-2xs transition-colors"
                    >
                      Inspect
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT 5 COLUMNS: Offer Intelligence, Interview Countdown & Evidence */}
        <div className="lg:col-span-5 space-y-6">
          {/* Active Offer Leverage Banner */}
          <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 rounded-xl p-5 text-white shadow-card border border-emerald-700/50">
            <div className="flex items-center justify-between mb-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500 text-slate-900 font-mono text-[10px] font-bold uppercase">
                Active Offer Leverage
              </span>
              <span className="font-mono text-xs text-emerald-300">4 Days Remaining</span>
            </div>
            <h4 className="text-base font-bold text-white">Google AI Infra: $519,400 Year 1 TC</h4>
            <p className="text-xs text-emerald-100/80 mt-1">
              Anthropic competing offer provides +$15k base salary anchor. AI negotiation copilot is ready.
            </p>
            <Link
              href="/compensation"
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-300 hover:text-white transition-colors"
            >
              <span>Open Offer Matrix &amp; Scripts</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Upcoming Interview Simulation Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-purple-600 animate-pulse" />
                <h4 className="font-bold text-sm text-slate-900">Next Live Simulation Round</h4>
              </div>
              <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-700 font-mono text-[10px] font-bold">
                Staff L6 Standard
              </span>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80 space-y-2">
              <p className="text-xs font-bold text-slate-900">
                Distributed Inference &amp; KV Cache Architecture
              </p>
              <p className="text-xs text-slate-500">
                Synthetic Evaluator: Dr. Sarah Lin (Google Cloud Infrastructure Agent)
              </p>
              <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                <span>SLO: 200ms</span>
                <span>•</span>
                <span>8x H100 Mesh</span>
                <span>•</span>
                <span className="text-emerald-600 font-semibold">Target: 92%+</span>
              </div>
            </div>

            <Link
              href="/interview-arena"
              className="w-full flex items-center justify-center gap-2 h-9 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs transition-colors shadow-2xs"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Enter AI Interview Arena</span>
            </Link>
          </div>

          {/* Verified Evidence Graph Widget */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-card space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <h4 className="font-bold text-sm text-slate-900">Verified Evidence Highlights</h4>
              </div>
              <Link href="/skills-and-evidence" className="text-xs text-primary font-semibold hover:underline">
                View Graph
              </Link>
            </div>

            <div className="space-y-2.5">
              <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/50 flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-slate-900">DRDO NGFW Packet Engine</p>
                  <p className="text-[11px] font-mono text-slate-500">C++ • 2.4M PPS benchmark</p>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono text-[10px] font-bold">
                  Verified
                </span>
              </div>

              <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/50 flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-slate-900">vLLM PagedAttention Kernel PR</p>
                  <p className="text-[11px] font-mono text-slate-500">CUDA / Triton • 94% locality</p>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono text-[10px] font-bold">
                  Verified
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Toast Feedback */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-lg shadow-modal text-xs font-mono border border-slate-700 animate-in fade-in slide-in-from-bottom-2">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
