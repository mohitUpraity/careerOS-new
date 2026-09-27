"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Terminal,
  Cpu,
  ShieldCheck,
  Radio,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Briefcase,
  GitBranch,
  Layers,
  Code2,
  CheckCircle2,
  Zap,
  Target,
  BarChart3,
  Flame,
  ChevronRight,
  FileText,
} from "lucide-react";
import { AuthModal } from "@/components/auth/AuthModal";

export default function LandingPage() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"ast" | "jd" | "arena" | "telemetry">("ast");

  return (
    <div className="space-y-16 py-4 animate-in fade-in duration-300">
      {/* 1. HERO COMMAND SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-950 border border-slate-800 text-white p-8 lg:p-14 shadow-2xl">
        {/* Glow & Grid Accents */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-mono font-semibold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            CAREEROS v4.2 • SYSTEMS-GRADE CAREER ENGINE
          </div>

          <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
            Deterministic Career Infrastructure for{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
              High-Output Engineers
            </span>
            .
          </h1>

          <p className="text-base lg:text-lg text-slate-300 max-w-2xl leading-relaxed">
            Stop firing resumes into recruiter black holes. CareerOS continuously harvests your 
            code ASTs, quantifies verified capabilities in a Supabase ledger, reverse-engineers enterprise 
            JDs with Gemini AI, and simulates rigorous L6 staff-level technical debriefs.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
            <button
              type="button"
              onClick={() => setIsAuthOpen(true)}
              className="inline-flex items-center justify-center gap-2.5 h-12 px-7 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-600/30 active:scale-95"
            >
              <span>Initialize CareerOS Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link
              href="/opportunities"
              className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm transition-all"
            >
              <Cpu className="w-4 h-4 text-indigo-400" />
              <span>Explore Live Telemetry Demo</span>
            </Link>
          </div>

          {/* Quick Metrics Bar */}
          <div className="pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <p className="font-mono text-xl font-bold text-white">0% Buzzwords</p>
              <p className="text-xs text-slate-400">Pure AST Code Verification</p>
            </div>
            <div>
              <p className="font-mono text-xl font-bold text-indigo-400">Sub-200ms</p>
              <p className="text-xs text-slate-400">AI JD Match Engine</p>
            </div>
            <div>
              <p className="font-mono text-xl font-bold text-emerald-400">Staff L6</p>
              <p className="text-xs text-slate-400">Synthetic Arena Standard</p>
            </div>
            <div>
              <p className="font-mono text-xl font-bold text-purple-400">100% Truth</p>
              <p className="text-xs text-slate-400">PostgreSQL Vector Vault</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ARCHITECTURE PILLARS (INTERACTIVE DEEP-DIVE) */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-indigo-600">
              <Code2 className="w-4 h-4" /> Core Architecture
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight mt-1">
              Engineered like an operating system, not a resume builder.
            </h2>
          </div>
          <p className="text-sm text-slate-500 max-w-md">
            Four tightly coupled subsystems that turn raw engineering work into undeniable career leverage.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-xl max-w-fit overflow-x-auto">
          {[
            { id: "ast", label: "AST Evidence Vault", icon: ShieldCheck },
            { id: "jd", label: "Zero-Hallucination JD Match", icon: Target },
            { id: "arena", label: "Staff L6 Interview Arena", icon: Radio },
            { id: "telemetry", label: "Career Telemetry & Comp", icon: TrendingUp },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                  active
                    ? "bg-white text-slate-900 shadow-sm border border-slate-200/80"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? "text-indigo-600" : "text-slate-400"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Pillar Card Display */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 lg:p-8 shadow-card grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {activeTab === "ast" && (
            <>
              <div className="lg:col-span-6 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                  Cryptographic Proof-of-Work vs Recruiter Fluff
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  CareerOS indexes your PRs, kernel commits, and architecture docs. It generates verified AST proofs 
                  showing exact lines of code, memory footprint optimizations, and benchmark throughput.
                </p>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li className="flex items-center gap-2 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Automated GitHub AST indexing (eBPF, CUDA, Distributed Consensus)
                  </li>
                  <li className="flex items-center gap-2 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Direct SHA-256 verifiable links to pull requests and benchmark suites
                  </li>
                  <li className="flex items-center gap-2 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Supabase Vector embeddings for instant proof matching against any JD
                  </li>
                </ul>
                <div className="pt-2">
                  <Link
                    href="/skills-and-evidence"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700"
                  >
                    <span>View Evidence Graph Specification</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
              <div className="lg:col-span-6 bg-slate-950 rounded-xl p-5 border border-slate-800 font-mono text-xs text-slate-300 space-y-2.5 shadow-inner">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[11px] text-slate-500">
                  <span>proof_ledger_ast.json</span>
                  <span className="text-emerald-400">VERIFIED • 100% LOC MATCH</span>
                </div>
                <pre className="text-[11px] text-indigo-300 leading-relaxed overflow-x-auto">
{`{
  "artifact_type": "KERNEL_ENGINE",
  "project": "DRDO NGFW Packet Engine",
  "verified_loc": 14200,
  "telemetry": {
    "pps_throughput": "2.4M PPS",
    "zero_copy_buffer": true,
    "lock_free_queues": "RingBuffer<Packet, 65536>"
  },
  "alignment_vector": [0.942, 0.881, 0.993, 0.912]
}`}
                </pre>
              </div>
            </>
          )}

          {activeTab === "jd" && (
            <>
              <div className="lg:col-span-6 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                  Zero-Hallucination Job Matching &amp; ATS Tailoring
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Upload or paste any job description. CareerOS computes your exact skill delta matrix, 
                  pinpoints missing system requirements, and synthesizes an ATS-compliant resume with Gemini AI 
                  without fabricating fake experience.
                </p>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li className="flex items-center gap-2 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Reverse-engineered hiring manager rubric &amp; ATS score breakdown
                  </li>
                  <li className="flex items-center gap-2 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Strict factual grounding—tailors framing without inventing skills
                  </li>
                  <li className="flex items-center gap-2 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    One-click diff preview between original and optimized resume
                  </li>
                </ul>
                <div className="pt-2">
                  <Link
                    href="/resume"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700"
                  >
                    <span>Inspect Resume Tailor Suite</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
              <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="font-bold text-xs text-slate-900">Anthropic AI Infra Role Match</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono text-[10px] font-bold">
                    94% High Fit
                  </span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Distributed Serving &amp; KV Cache</span>
                    <span className="text-emerald-600 font-bold font-mono">100% Match</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: "100%" }} />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">CUDA / Triton Custom Kernels</span>
                    <span className="text-blue-600 font-bold font-mono">92% Match</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: "92%" }} />
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === "arena" && (
            <>
              <div className="lg:col-span-6 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 font-bold">
                  <Radio className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                  Synthetic Staff L6 Interview Arena
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Practice complex system designs under pressure with Gemini AI playing the role of a Principal Engineer. 
                  Get graded on distributed trade-offs, SLO violations, and back-of-the-envelope calculations.
                </p>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li className="flex items-center gap-2 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Multi-turn voice and text debriefs with strict FAANG rubrics
                  </li>
                  <li className="flex items-center gap-2 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Comprehensive scorecards: Technical Depth, Architecture, Communication
                  </li>
                </ul>
                <div className="pt-2">
                  <Link
                    href="/interview-arena"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 hover:text-purple-700"
                  >
                    <span>Launch Interview Arena Simulator</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
              <div className="lg:col-span-6 bg-slate-900 rounded-xl p-5 border border-slate-800 text-white space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[11px] text-slate-400">
                  <span>Interviewer: Dr. Sarah Lin (Staff L6 Infra Agent)</span>
                  <span className="text-emerald-400 animate-pulse">● LIVE</span>
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  &ldquo;Your proposal uses PagedAttention for KV cache management. How do you handle cache eviction 
                  when GPU memory exceeds 95% under spike traffic while maintaining SLA under 15ms?&rdquo;
                </p>
                <div className="p-2.5 rounded bg-slate-800 border border-slate-700 text-[11px] text-indigo-300">
                  Candidate response evaluated: +24 Technical Depth, -4 Failover Redundancy. Score: 91/100.
                </div>
              </div>
            </>
          )}

          {activeTab === "telemetry" && (
            <>
              <div className="lg:col-span-6 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                  Real-time Career Telemetry &amp; Offer Leverage
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Track your overall market readiness score across 14 dimensions. Benchmark your compensation against verified 
                  peer offers and run real-time negotiation simulations.
                </p>
                <div className="pt-2">
                  <Link
                    href="/compensation"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700"
                  >
                    <span>Inspect Compensation Intelligence</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
              <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900">Calculated Market Value</span>
                  <span className="font-mono font-extrabold text-emerald-600 text-sm">$480k - $520k TC</span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs space-y-1">
                  <p className="font-semibold text-slate-800">Competing Offer Leverage Factor: 1.28x</p>
                  <p className="text-slate-500 text-[11px]">
                    2 parallel tier-1 interviews ongoing. High negotiation leverage detected.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* 3. BOTTOM CALL TO ACTION */}
      <section className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 lg:p-12 text-center text-white border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <h3 className="text-3xl font-extrabold tracking-tight text-white">
            Take Control of Your Engineering Career
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Create your account in 1 click with Google or Email. Your profile, code proofs, and applications are 
            stored securely in Supabase PostgreSQL.
          </p>
          <div className="pt-3 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setIsAuthOpen(true)}
              className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-white text-slate-950 font-semibold text-sm hover:bg-slate-100 transition shadow-lg active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Sign In / Create Account</span>
            </button>
          </div>
        </div>
      </section>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
}
