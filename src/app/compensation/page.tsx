'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  DollarSign,
  TrendingUp,
  ShieldCheck,
  Copy,
  CheckCircle2,
  Clock,
  ArrowRight,
  Download,
  AlertTriangle,
  FileCode2,
  BarChart3,
  Scale,
} from 'lucide-react';
import { mockOffers, mockNegotiationCopilot } from '@/data/mock/compensationData';

export default function CompensationPage() {
  const [growthScenario, setGrowthScenario] = useState<'conservative' | 'base' | 'bull'>('bull');
  const [toast, setToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const copyScript = () => {
    navigator.clipboard?.writeText(mockNegotiationCopilot.counterScriptEmail);
    triggerToast('Counter-offer pitch script copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      {/* 1. Executive Header */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-slate-400 uppercase tracking-wider font-semibold">
                OFFER INTELLIGENCE &amp; NEGOTIATION • v4.2 TELEMETRY
              </span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
              Compensation Intelligence &amp; Offer Strategy
            </h1>
            <p className="text-sm text-slate-500">
              Multi-offer financial modeling, 4-year equity vesting curves, and tactical AI counter-offer copilot.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => triggerToast('Generating Tax & 83(b) Liquidity Simulation...')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-2xs transition-colors"
            >
              <span>Simulate Tax &amp; Liquidity (83b)</span>
            </button>
            <button
              type="button"
              onClick={() => triggerToast('Exporting Negotiation Brief PDF...')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs font-semibold shadow-2xs transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Negotiation Brief</span>
            </button>
          </div>
        </div>

        {/* Urgent Negotiation Alert Banner */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-xl p-5 text-white shadow-card border border-blue-700/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-blue-500 text-white font-mono text-[10px] font-bold uppercase">
                ⚡ Negotiation Window Active
              </span>
              <span className="font-mono text-xs text-blue-200">
                4 Days Remaining on Lead Offer (Google)
              </span>
            </div>
            <h3 className="text-base font-bold text-white">
              Strategic Objective: Maximize L6 Target Equity with Counter-Offer Leverage from Anthropic
            </h3>
            <p className="text-xs text-blue-100/80">
              Anthropic’s higher base salary ($260k vs $245k) provides concrete market leverage to negotiate an additional +$45k equity grant or sign-on boost from Google.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 bg-white/10 p-3 rounded-lg border border-white/10 font-mono text-xs text-center">
            <div>
              <span className="text-[10px] text-blue-300 uppercase block">Top Y1 Value</span>
              <span className="text-xl font-extrabold text-white">$519,400</span>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div>
              <span className="text-[10px] text-blue-300 uppercase block">Leverage Score</span>
              <span className="text-xl font-extrabold text-emerald-400">94/100</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main 3-Column Split Workspace (Left 7 Cols Offers & Charts / Right 5 Cols Copilot) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT 7 COLUMNS: Side-by-Side Offer Cards & Vesting Schedule */}
        <div className="lg:col-span-7 space-y-6">
          {/* Side-by-Side Offer Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockOffers.map((off) => (
              <div
                key={off.id}
                className={`bg-white rounded-xl border p-5 shadow-card space-y-4 ${
                  off.status === 'LEADING'
                    ? 'border-primary ring-2 ring-primary/10'
                    : 'border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                      off.status === 'LEADING'
                        ? 'bg-blue-50 text-primary border border-blue-200'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {off.status === 'LEADING' ? '⭐ Leading Offer (In Hand)' : 'Verbal Confirmed'}
                  </span>
                  <span className="font-mono text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {off.decisionDeadline}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-base text-slate-900">{off.company}</h3>
                  <p className="text-xs text-slate-500 font-medium">{off.role}</p>
                </div>

                {/* Financial Breakdown Grid */}
                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80 space-y-2 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Base Salary:</span>
                    <span className="font-bold text-slate-900">${off.baseSalary.toLocaleString()} / yr</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Equity Total:</span>
                    <span className="font-bold text-emerald-700">${off.equityTotal.toLocaleString()} (4-yr)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Sign-on Bonus:</span>
                    <span className="font-bold text-slate-900">${off.signOnBonus.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Annual Bonus:</span>
                    <span className="font-bold text-slate-900">${off.annualBonusAmount.toLocaleString()} ({off.annualBonusPercent}%)</span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
                    <span className="font-bold text-slate-900 text-xs">Year 1 Total Comp:</span>
                    <span className="text-base font-extrabold text-primary">
                      ${off.year1TotalComp.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="text-[11px] font-mono text-slate-500 flex justify-between">
                  <span>Schedule: {off.equityVestingSchedule}</span>
                  <span className="text-emerald-700 font-bold">{off.percentileRank}th %ile</span>
                </div>
              </div>
            ))}
          </div>

          {/* Delta Spread Highlights */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-emerald-900">
            <span className="font-bold">✓ +$69,400 Y1 Cash &amp; Equity Spread (Google Leads Year 1)</span>
            <span className="font-bold">✓ Anthropic Base provides +$15k leverage anchor</span>
            <span>Google 4-yr NPV leads by +11.4%</span>
          </div>

          {/* 4-Year Total Compensation & Vesting Curve */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-card space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900">4-Year Total Comp &amp; Vesting Schedule</h3>
                <p className="text-xs text-slate-500">Comparative breakdown by year factoring equity vesting frontload.</p>
              </div>

              {/* Scenario Toggle */}
              <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setGrowthScenario('conservative')}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    growthScenario === 'conservative' ? 'bg-white text-slate-900 font-bold shadow-2xs' : 'text-slate-600'
                  }`}
                >
                  Bear (-5%)
                </button>
                <button
                  type="button"
                  onClick={() => setGrowthScenario('base')}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    growthScenario === 'base' ? 'bg-white text-slate-900 font-bold shadow-2xs' : 'text-slate-600'
                  }`}
                >
                  Base (0%)
                </button>
                <button
                  type="button"
                  onClick={() => setGrowthScenario('bull')}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    growthScenario === 'bull' ? 'bg-white text-slate-900 font-bold shadow-2xs' : 'text-slate-600'
                  }`}
                >
                  Bull (+15% YoY)
                </button>
              </div>
            </div>

            {/* Stacked Chart Simulation */}
            <div className="space-y-4 text-xs font-mono">
              <div className="space-y-1">
                <div className="flex justify-between font-semibold">
                  <span>Year 1 Total Comp</span>
                  <span>Google: <strong className="text-primary">$519,400</strong> vs Anthropic: <strong className="text-slate-700">$450,000</strong></span>
                </div>
                <div className="w-full h-4 bg-slate-100 rounded-lg overflow-hidden flex gap-1">
                  <div className="bg-primary h-full" style={{ width: '55%' }} title="Google Y1" />
                  <div className="bg-slate-400 h-full" style={{ width: '45%' }} title="Anthropic Y1" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between font-semibold">
                  <span>Year 2 Total Comp</span>
                  <span>Google: <strong className="text-primary">$492,000</strong> vs Anthropic: <strong className="text-slate-700">$410,000</strong></span>
                </div>
                <div className="w-full h-4 bg-slate-100 rounded-lg overflow-hidden flex gap-1">
                  <div className="bg-primary h-full" style={{ width: '54%' }} title="Google Y2" />
                  <div className="bg-slate-400 h-full" style={{ width: '46%' }} title="Anthropic Y2" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between font-semibold">
                  <span>Year 3 Total Comp</span>
                  <span>Google: <strong className="text-primary">$425,000</strong> vs Anthropic: <strong className="text-slate-700">$410,000</strong></span>
                </div>
                <div className="w-full h-4 bg-slate-100 rounded-lg overflow-hidden flex gap-1">
                  <div className="bg-primary h-full" style={{ width: '51%' }} title="Google Y3" />
                  <div className="bg-slate-400 h-full" style={{ width: '49%' }} title="Anthropic Y3" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between font-semibold">
                  <span>Year 4 Total Comp</span>
                  <span>Google: <strong className="text-primary">$355,000</strong> vs Anthropic: <strong className="text-slate-700">$410,000</strong></span>
                </div>
                <div className="w-full h-4 bg-slate-100 rounded-lg overflow-hidden flex gap-1">
                  <div className="bg-primary h-full" style={{ width: '46%' }} title="Google Y4" />
                  <div className="bg-slate-400 h-full" style={{ width: '54%' }} title="Anthropic Y4" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-100">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-primary" /> Google (Frontloaded 33/33/22/12)</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-slate-400" /> Anthropic (Uniform 25/25/25/25)</span>
            </div>
          </div>
        </div>

        {/* RIGHT 5 COLUMNS: AI Negotiation Copilot & Scripts */}
        <div className="lg:col-span-5 space-y-6 sticky top-20">
          {/* Negotiation Leverage Radar */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-card space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <h3 className="font-bold text-sm text-slate-900">Negotiation Leverage Radar</h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono text-xs font-bold">
                {mockNegotiationCopilot.leverageScore}/100
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <h4 className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Primary Leverage Drivers
              </h4>
              {mockNegotiationCopilot.keyLeveragePoints.map((point, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                  <p className="font-semibold text-slate-900 leading-snug">✓ {point}</p>
                </div>
              ))}
            </div>
          </div>

          {/* One-Click Counter-Offer Script Generator */}
          <div className="bg-slate-900 text-white rounded-xl p-6 shadow-card space-y-4 border border-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <FileCode2 className="w-4 h-4 text-emerald-400" />
                <h3 className="font-bold text-sm text-white">Tactical Counter Script</h3>
              </div>
              <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono text-[10px]">
                Target: +$45k Equity
              </span>
            </div>

            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-slate-300 font-mono text-xs leading-relaxed max-h-48 overflow-y-auto whitespace-pre-wrap">
              {mockNegotiationCopilot.counterScriptEmail}
            </div>

            <button
              type="button"
              onClick={copyScript}
              className="w-full h-10 rounded-lg bg-primary hover:bg-primary-hover text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-2xs transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Recruiter Counter Script</span>
            </button>
          </div>

          {/* Recruiter Objection Playbook */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-card space-y-3">
            <h4 className="font-mono text-xs font-bold text-slate-400 uppercase tracking-wider">
              Recruiter Objection Playbooks
            </h4>
            <div className="space-y-2.5 text-xs">
              {mockNegotiationCopilot.objectionScenarios.map((sc, i) => (
                <div key={i} className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                  <p className="font-bold text-slate-800">🎯 {sc.trigger}</p>
                  <p className="text-slate-600 font-mono text-[11px] leading-relaxed">↳ {sc.playbook}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-lg shadow-modal text-xs font-mono border border-slate-700 animate-in fade-in">
          {toast}
        </div>
      )}
    </div>
  );
}
