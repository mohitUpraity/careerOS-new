'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  Download,
  Share2,
  ChevronRight,
  Play,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  FileText,
  Clock,
  ArrowRight,
  BookOpen,
} from 'lucide-react';

export default function InterviewDebriefPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrubberPosition, setScrubberPosition] = useState(34);
  const [toast, setToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* 1. Header & Final Outcome */}
      <div className="flex flex-col gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-slate-400 uppercase tracking-wider font-semibold">
              INTERVIEW INTELLIGENCE • L6 EVALUATION REPORT
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
            Interview Debrief &amp; AI Diagnostic Report
          </h1>
          <p className="text-sm text-slate-500">
            Round: Google AI Infrastructure • Distributed Training &amp; Inference (L6 Staff Standard) • Evaluated by Dr. Sarah Lin (Synthetic Principal Infra Evaluator).
          </p>
        </div>

        {/* Final Recommendation Hero Card */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-emerald-600 text-white flex flex-col items-center justify-center font-mono shrink-0 shadow-xs">
              <span className="text-2xl font-black leading-none">91</span>
              <span className="text-[9px] uppercase font-bold text-emerald-200 mt-0.5">Score</span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-700 text-white font-mono text-xs font-bold uppercase">
                  STRONG HIRE
                </span>
                <span className="font-mono text-xs font-bold text-emerald-800">
                  91.4% Confidence • Top 3% Candidate Pool
                </span>
              </div>
              <p className="text-xs text-emerald-900 mt-1">
                Recommendation: Candidate exhibits clear Staff L6 mastery in low-level memory layout, Triton kernel optimization, and distributed serving topologies.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => triggerToast('Exporting comprehensive PDF report...')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs font-semibold shadow-2xs transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF Debrief</span>
            </button>
            <Link
              href="/skills-and-evidence"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white border border-emerald-300 text-emerald-800 text-xs font-semibold hover:bg-emerald-100/50 shadow-2xs transition-colors"
            >
              <span>Sync to Evidence</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. 4-Dimension Competency Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-card space-y-1">
          <span className="font-mono text-[10px] font-bold text-slate-400 uppercase">
            Hardware &amp; Kernel Depth
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900 font-mono">94%</span>
            <span className="text-xs text-emerald-600 font-bold font-mono">Exceptional</span>
          </div>
          <p className="text-[11px] text-slate-500 font-mono">Triton Kernel + KV cache mastery</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-card space-y-1">
          <span className="font-mono text-[10px] font-bold text-slate-400 uppercase">
            Distributed Scalability
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900 font-mono">92%</span>
            <span className="text-xs text-emerald-600 font-bold font-mono">Staff Standard</span>
          </div>
          <p className="text-[11px] text-slate-500 font-mono">Megatron 8-way Tensor Parallelism</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-card space-y-1">
          <span className="font-mono text-[10px] font-bold text-slate-400 uppercase">
            Tradeoff Analysis
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900 font-mono">86%</span>
            <span className="text-xs text-blue-600 font-bold font-mono">Solid L6</span>
          </div>
          <p className="text-[11px] text-slate-500 font-mono">Cost vs Memory Bandwidth</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-card space-y-1">
          <span className="font-mono text-[10px] font-bold text-slate-400 uppercase">
            Communication Clarity
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900 font-mono">89%</span>
            <span className="text-xs text-emerald-600 font-bold font-mono">RFC Style</span>
          </div>
          <p className="text-[11px] text-slate-500 font-mono">Clear structural framing</p>
        </div>
      </div>

      {/* 3. Main Split Body (Left 8 Cols Timeline Scrubber / Right 4 Cols Remediation & HC Packet) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT 8 COLUMNS: Turn-by-Turn Audio & Q&A Breakdown */}
        <div className="lg:col-span-8 space-y-6">
          {/* Interactive Audio Scrubber */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-card space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-primary" />
                <h3 className="font-bold text-sm text-slate-900">Interactive Session Playback &amp; Telemetry</h3>
              </div>
              <span className="font-mono text-xs text-slate-500">Duration: 45:00</span>
            </div>

            {/* Scrubber Bar with Event Markers */}
            <div className="space-y-2">
              <div className="relative h-6 bg-slate-100 rounded-lg flex items-center px-2 cursor-pointer">
                {/* Event Marker Dots */}
                <span className="absolute left-[18%] w-3 h-3 rounded-full bg-emerald-500 border-2 border-white shadow-xs" title="Strong Answer at 08:15" />
                <span className="absolute left-[50%] w-3 h-3 rounded-full bg-emerald-500 border-2 border-white shadow-xs" title="Strong Answer at 22:40" />
                <span className="absolute left-[75%] w-3 h-3 rounded-full bg-amber-500 border-2 border-white shadow-xs" title="Red Flag at 34:10" />

                {/* Progress Fill */}
                <div className="h-2 bg-primary rounded-full" style={{ width: `${scrubberPosition}%` }} />
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>00:00 (Start)</span>
                <span className="text-emerald-600 font-bold">🟢 High Signal Highlights</span>
                <span className="text-amber-600 font-bold">🟡 Identified Gap (34:10)</span>
                <span>45:00 (End)</span>
              </div>
            </div>

            {/* Q&A Cards */}
            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">
                    Question 1 (00:00 – 14:20): System Context &amp; Token Volumetrics
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono font-bold">
                    96/100
                  </span>
                </div>
                <p className="text-slate-600">
                  <strong className="text-slate-800">Candidate Answer:</strong> Calculated KV cache footprint for 10M DAU with 200ms latency bounds across an 8x H100 GPU cluster.
                </p>
                <p className="text-emerald-700 font-mono text-[11px]">
                  💡 Evaluator Note: Exceptional calculation of TTFT and inter-token memory bandwidth.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">
                    Question 2 (14:21 – 29:45): Tensor vs Pipeline Parallelism Tradeoffs
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono font-bold">
                    93/100
                  </span>
                </div>
                <p className="text-slate-600">
                  <strong className="text-slate-800">Candidate Answer:</strong> Detailed Megatron-LM tensor slicing over NVLink 900 GB/s vs InfiniBand interconnects.
                </p>
                <p className="text-emerald-700 font-mono text-[11px]">
                  💡 Evaluator Note: Excellent hardware interconnect awareness.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">
                    Question 3 (29:46 – 44:10): Memory Bandwidth in Speculative Decoding
                  </span>
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-mono font-bold">
                    78/100
                  </span>
                </div>
                <p className="text-slate-600">
                  <strong className="text-slate-800">Candidate Answer:</strong> Outlined PagedAttention verification pass, but initially omitted memory bus stragglers during speculative batch commit.
                </p>
                <p className="text-amber-800 font-mono text-[11px]">
                  ⚠️ Evaluator Note: Target area for review. Recovery was fast after hint.
                </p>
              </div>
            </div>
          </div>

          {/* Architecture Whiteboard Review */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-card space-y-3">
            <h3 className="font-bold text-sm text-slate-900">
              Architecture Whiteboard Diagnostic
            </h3>
            <div className="p-4 rounded-xl bg-slate-900 text-white font-mono text-xs space-y-3">
              <div className="flex items-center justify-between text-slate-400 text-[11px]">
                <span>CANDIDATE TOPOLOGY SCHEMATIC</span>
                <span className="text-emerald-400">✓ Production Validated</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                <div className="p-2 rounded bg-slate-800 border border-emerald-500/50">
                  <span>Token Router (Ingress)</span>
                </div>
                <div className="p-2 rounded bg-slate-800 border border-emerald-500/50">
                  <span>8-GPU Megatron Ring</span>
                </div>
                <div className="p-2 rounded bg-slate-800 border border-emerald-500/50">
                  <span>Paged KV-Cache Pool</span>
                </div>
              </div>
              <div className="text-[11px] text-emerald-300">
                ✓ PagedAttention block allocation complies with Google production cluster standards (+6% score delta).
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT 4 COLUMNS: Targeted Remediation & Hiring Committee Packet */}
        <div className="lg:col-span-4 space-y-6 sticky top-20">
          {/* Remediation Plan */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-card space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-sm text-slate-900">Remediation Action Plan</h3>
              <span className="px-2 py-0.5 rounded bg-blue-50 text-primary font-mono text-[10px] font-bold">
                Reach 98th %ile
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 space-y-1.5">
                <p className="font-bold text-slate-900">
                  1. FlashDecoding++ Kernel Drills
                </p>
                <p className="text-slate-500 text-[11px]">
                  Master long-context prefill latency calculations (Est. 30 mins).
                </p>
                <Link
                  href="/learning"
                  className="inline-flex items-center gap-1 text-primary font-semibold text-[11px] hover:underline"
                >
                  <span>Open Learning Module</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 space-y-1.5">
                <p className="font-bold text-slate-900">
                  2. FlashAttention v3 Memory Calculations
                </p>
                <p className="text-slate-500 text-[11px]">
                  Practice HBM3e bandwidth calculations for draft models.
                </p>
                <Link
                  href="/resources"
                  className="inline-flex items-center gap-1 text-primary font-semibold text-[11px] hover:underline"
                >
                  <span>View Triton Cheatsheet</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Hiring Committee Packet Dossier */}
          <div className="bg-slate-900 text-white rounded-xl p-6 shadow-card space-y-4 border border-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-sm text-white">Hiring Committee Dossier</h3>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold">
                L6 Staff Recommended
              </span>
            </div>

            <div className="space-y-2 text-xs font-mono text-slate-300">
              <p>
                <strong className="text-white">Strengths:</strong> Deep domain mastery in low-level CUDA/Triton memory layouts; pragmatic tradeoff articulation.
              </p>
              <p>
                <strong className="text-white">Growth Area:</strong> Speculative decoding memory bus stragglers.
              </p>
            </div>

            <button
              type="button"
              onClick={() => triggerToast('Hiring committee packet copied to clipboard!')}
              className="w-full h-9 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs font-semibold transition-colors shadow-2xs"
            >
              Copy HC Summary Dossier
            </button>
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
