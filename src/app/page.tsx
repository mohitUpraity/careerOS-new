'use client';

import React, { useState, useEffect } from 'react';
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
  PlugZap,
  UploadCloud,
  Plus,
} from 'lucide-react';
import { defaultQuickStats, QuickStat } from '@/data/mock/dashboardData';
import { fetchDashboardOverview, fetchProfile, fetchOpportunities, DashboardOverviewData, UserProfileData, LiveOpportunity } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

export default function DashboardPage() {
  const { firebaseUser, userProfile } = useAuth();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [profileData, setProfileData] = useState<UserProfileData | null>(null);
  const [dashboardData, setDashboardData] = useState<DashboardOverviewData | null>(null);
  const [liveOpportunities, setLiveOpportunities] = useState<LiveOpportunity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [p, d, opps] = await Promise.all([
          fetchProfile(),
          fetchDashboardOverview(),
          fetchOpportunities(),
        ]);
        if (p) setProfileData(p);
        if (d) setDashboardData(d);
        if (opps) setLiveOpportunities(opps);
      } catch (err) {
        console.warn('Dashboard live telemetry fetch warning:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const displayName = userProfile?.name || profileData?.name || firebaseUser?.displayName || firebaseUser?.email?.split('@')[0] || 'Candidate';
  const targetRole = profileData?.target_roles?.[0] || 'AI / Systems Engineer';
  const readiness = userProfile?.overall_readiness || profileData?.overall_readiness || 0;
  const isOnboarded = userProfile?.onboarding_completed || profileData?.onboarding_completed || false;

  const quickStats: QuickStat[] = [
    {
      label: 'Active Applications',
      value: String(dashboardData?.applicationsInFlightCount || 0),
      change: 'In Pipeline',
      subtext: 'Applications',
    },
    {
      label: 'Verified Evidence Proofs',
      value: String(dashboardData?.verifiedProofsCount || 0),
      change: 'AST Graph',
      subtext: 'Knowledge Nodes',
    },
    {
      label: 'Live Opportunities',
      value: String(liveOpportunities.length || dashboardData?.activeOpportunitiesCount || 0),
      change: 'Market Stream',
      subtext: 'Calibrated Fits',
    },
    {
      label: 'Simulation Readiness',
      value: `${readiness}%`,
      change: 'Target 90%',
      subtext: 'Verified Level',
    },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Top Executive Mission & Context Header */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-card flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono text-[11px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Telemetry Active
            </span>
            <span className="px-2 py-0.5 rounded bg-blue-50 border border-blue-100 text-primary font-mono text-[11px] font-semibold">
              Track: {targetRole}
            </span>
            {isOnboarded ? (
              <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono text-[11px] font-semibold">
                Onboarding Verified
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-800 font-mono text-[11px] font-semibold">
                Setup Required
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 mt-1">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Welcome back, {displayName.split(' ')[0]}
            </h1>
          </div>

          <p className="text-sm text-slate-500">
            CareerOS Engine is monitoring verified market telemetry and calibrating live match matrices for your trajectory.
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
                Live Index
              </span>
            </div>

            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {readiness}%
              </span>
              <span className="font-mono text-xs text-slate-400">
                / 90% Target Calibration
              </span>
            </div>

            {/* Dynamic Telemetry Bar */}
            <div className="w-56 h-2.5 bg-slate-200 rounded-full overflow-hidden flex gap-0.5 mt-2 p-0.5">
              <div className="h-full bg-primary rounded-full" style={{ width: `${Math.min(readiness, 100)}%` }} title="Verified Readiness" />
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

      {/* 2. Recommendation Engine & Telemetry Calibration Hero */}
      <section className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 lg:p-8 shadow-card">
        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-6">
          <div className="flex flex-col gap-3 max-w-3xl">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-blue-500 text-white font-mono text-[11px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 fill-white" /> AI RECOMMENDATION ENGINE
              </span>
              <span className="font-mono text-xs text-blue-200 font-semibold">
                {targetRole ? `Active Focus: ${targetRole}` : 'Calibrate Profile for Personalized Job Matching'}
              </span>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-white">
              {readiness > 0 ? 'Verified Candidate Telemetry Active' : 'Calibrate Your Targets & Refine Recommendations'}
            </h2>

            <p className="text-sm text-blue-100/90 leading-relaxed">
              Fine-tune your target tracks, salary boundaries, and technical skill proofs in your profile to optimize AI matching algorithms against live verified roles and hackathons.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row xl:flex-col gap-2.5 shrink-0">
            <Link
              href="/profile"
              className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-lg bg-white text-indigo-900 font-semibold text-sm hover:bg-blue-50 shadow-md transition-all active:scale-95"
            >
              <span>Edit Profile &amp; Targets</span>
              <Rocket className="w-4 h-4 text-indigo-700" />
            </Link>
            <Link
              href="/opportunities"
              className="inline-flex items-center justify-center gap-2 h-9 px-4 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-xs border border-white/10 transition-colors"
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Browse Live Opportunities</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Quick Metrics Overview Strip */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, idx) => (
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

      {/* 4. Master Command Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT 7 COLUMNS: Live Opportunities Radar */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-card">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <Briefcase className="w-4 h-4 text-primary" />
                <h3 className="font-bold text-base text-slate-900">Live Opportunity Radar</h3>
                <span className="font-mono text-[11px] px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-semibold">
                  {liveOpportunities.length} live streams
                </span>
              </div>
              <Link
                href="/opportunities"
                className="text-xs font-semibold text-primary hover:text-primary-hover flex items-center gap-1"
              >
                <span>View All ({liveOpportunities.length})</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {liveOpportunities.length === 0 ? (
              <div className="py-12 text-center flex flex-col items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">No active opportunities in pipeline</h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm">
                    Connect live feeds or complete onboarding to calibrate automated opportunity scraping across LinkedIn, Indeed &amp; Google.
                  </p>
                </div>
                <Link
                  href="/opportunities"
                  className="mt-2 px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs font-semibold shadow-xs"
                >
                  Explore Opportunities
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {liveOpportunities.slice(0, 4).map((opp) => (
                  <div key={opp.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
                    <div className="flex flex-col gap-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-sm text-slate-900 group-hover:text-primary transition-colors">
                          {opp.title}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono text-[11px] font-bold">
                          {opp.match_score}% Match
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                        <span className="font-semibold text-slate-700">{opp.company}</span>
                        <span>•</span>
                        <span>{opp.location}</span>
                        <span>•</span>
                        <span className="font-mono font-semibold text-slate-900">{opp.salary_range || 'Competitive'}</span>
                      </div>

                      {opp.tags && opp.tags.length > 0 && (
                        <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                          {opp.tags.map((tag, i) => (
                            <span key={i} className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono text-[10px]">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
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
            )}
          </div>
        </div>

        {/* RIGHT 5 COLUMNS: Quick Pipelines & Telemetry Connectors */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Action Matrix */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-card space-y-4">
            <h3 className="font-bold text-base text-slate-900">Career Engine Modules</h3>
            <div className="space-y-2.5">
              <Link
                href="/applications"
                className="flex items-center justify-between p-3 rounded-lg border border-slate-200/80 hover:border-blue-300 hover:bg-blue-50/30 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 group-hover:text-blue-600">Application Pipeline</p>
                    <p className="text-[11px] text-slate-500">Track and manage active interviews</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
              </Link>

              <Link
                href="/skills-and-evidence"
                className="flex items-center justify-between p-3 rounded-lg border border-slate-200/80 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 group-hover:text-indigo-600">AST Skills &amp; Evidence Vault</p>
                    <p className="text-[11px] text-slate-500">Verified proof nodes and complexity trees</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" />
              </Link>

              <Link
                href="/interview-arena"
                className="flex items-center justify-between p-3 rounded-lg border border-slate-200/80 hover:border-purple-300 hover:bg-purple-50/30 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                    <Radio className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 group-hover:text-purple-600">AI Interview Simulator</p>
                    <p className="text-[11px] text-slate-500">Benchmark against corporate leveling rubrics</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600" />
              </Link>

              <Link
                href="/connectors"
                className="flex items-center justify-between p-3 rounded-lg border border-slate-200/80 hover:border-emerald-300 hover:bg-emerald-50/30 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <PlugZap className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 group-hover:text-emerald-600">Evidence Connectors</p>
                    <p className="text-[11px] text-slate-500">GitHub, LeetCode, LinkedIn telemetry</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Floating System Toast */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-lg shadow-modal text-xs font-mono border border-slate-700 animate-in fade-in flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-blue-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
