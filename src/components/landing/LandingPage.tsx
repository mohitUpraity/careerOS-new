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
  Lock,
  UserCheck,
  LogIn,
} from "lucide-react";
import { AuthModal } from "@/components/auth/AuthModal";

export default function LandingPage() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"ast" | "jd" | "arena" | "telemetry">("ast");

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* 1. DEDICATED PUBLIC TOP NAVBAR */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#07090e]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/30">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base tracking-tight text-white leading-none">
                Career<span className="text-indigo-400">OS</span>
              </span>
              <span className="text-[10px] font-mono text-slate-500 font-medium tracking-wider">
                PERSONAL CAREER OS
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-400">
            <a href="#features" className="hover:text-white transition">Architecture</a>
            <a href="#ast-vault" className="hover:text-white transition">AST Verification</a>
            <a href="#arena" className="hover:text-white transition">Interview Arena</a>
            <a href="#stack" className="hover:text-white transition">Stack &amp; DB</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsAuthOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/25 transition active:scale-95"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In / Join</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <main className="max-w-7xl mx-auto px-6 py-16 lg:py-24 space-y-24">
        <section className="relative text-center max-w-4xl mx-auto space-y-8">
          {/* Background Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-mono font-semibold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            CAREEROS v4.2 • SYSTEMS-GRADE CAREER ENGINE
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
            Deterministic Career Infrastructure for{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
              High-Output Engineers
            </span>
            .
          </h1>

          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Stop firing resumes into recruiter black holes. CareerOS continuously harvests your 
            code ASTs, quantifies verified capabilities in a Supabase PostgreSQL ledger, reverse-engineers 
            enterprise JDs with Gemini AI, and simulates rigorous L6 staff-level technical debriefs.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setIsAuthOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 h-12 px-8 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-xl shadow-indigo-600/30 active:scale-95"
            >
              <span>Initialize CareerOS Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="pt-10 border-t border-slate-800/60 grid grid-cols-2 sm:grid-cols-4 gap-6 text-left sm:text-center">
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
              <p className="font-mono text-2xl font-bold text-white">0% Buzzwords</p>
              <p className="text-xs text-slate-400 mt-1">Pure AST Code Proofs</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
              <p className="font-mono text-2xl font-bold text-indigo-400">Sub-200ms</p>
              <p className="text-xs text-slate-400 mt-1">AI JD Match Engine</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
              <p className="font-mono text-2xl font-bold text-emerald-400">Staff L6</p>
              <p className="text-xs text-slate-400 mt-1">Synthetic Arena Standard</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
              <p className="font-mono text-2xl font-bold text-purple-400">PostgreSQL</p>
              <p className="text-xs text-slate-400 mt-1">Single Source of Truth</p>
            </div>
          </div>
        </section>

        {/* 3. ARCHITECTURE SUBSYSTEMS DEEP DIVE */}
        <section id="features" className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-400">
              CORE SUBSYSTEMS
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
              Engineered like an operating system, not a resume tool.
            </h2>
            <p className="text-sm text-slate-400">
              Four tightly coupled intelligence layers turning raw code into undeniable career leverage.
            </p>
          </div>

          {/* Interactive Subsystem Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pillar 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/50 transition-all space-y-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">AST Evidence Ledger</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Indexes code commits, PRs, kernel patches, and benchmark metrics. Stores cryptographic AST proofs in Supabase PostgreSQL.
              </p>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-[11px] text-indigo-300">
                DRDO NGFW: 2.4M PPS • Zero-Copy Verified
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-blue-500/50 transition-all space-y-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Zero-Hallucination JD Match</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Computes exact skill deltas against enterprise JDs with Gemini AI without fabricating fake experience.
              </p>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-[11px] text-blue-300">
                Anthropic AI Infra: 94% Fit • 0 Missing Core
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-purple-500/50 transition-all space-y-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Radio className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Staff L6 Interview Arena</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Interactive Principal Engineer AI simulation evaluating concurrency, KV-caching, and SLO trade-offs.
              </p>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-[11px] text-purple-300">
                Synthetic Evaluator: Dr. Sarah Lin (Staff L6)
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-emerald-500/50 transition-all space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Live Comp &amp; Telemetry</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Market value estimation, competing offer leverage factors (1.28x), and dynamic negotiation scripts.
              </p>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-[11px] text-emerald-300">
                Market TC: $480k - $520k • Active Offer Anchor
              </div>
            </div>
          </div>
        </section>

        {/* 4. TECH STACK PROOF */}
        <section id="stack" className="p-8 lg:p-12 rounded-3xl bg-slate-900/40 border border-slate-800/80 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider">
                PRODUCTION STACK
              </span>
              <h3 className="text-2xl font-bold text-white">Built on Rock-Solid Modern Infrastructure</h3>
            </div>
            <button
              type="button"
              onClick={() => setIsAuthOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-slate-900 font-semibold text-xs hover:bg-slate-100 transition"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <p className="text-slate-400">Identity Layer</p>
              <p className="text-white font-bold text-sm mt-1">Firebase Auth</p>
              <p className="text-slate-500 text-[11px] mt-0.5">Google 1-Click + Email</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <p className="text-slate-400">Single Source of Truth</p>
              <p className="text-white font-bold text-sm mt-1">Supabase PostgreSQL</p>
              <p className="text-slate-500 text-[11px] mt-0.5">pgvector + Storage</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <p className="text-slate-400">Intelligence Engine</p>
              <p className="text-white font-bold text-sm mt-1">FastAPI + Gemini AI</p>
              <p className="text-slate-500 text-[11px] mt-0.5">Async SQLAlchemy</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <p className="text-slate-400">Client Engine</p>
              <p className="text-white font-bold text-sm mt-1">Next.js 14</p>
              <p className="text-slate-500 text-[11px] mt-0.5">Turbopack App Router</p>
            </div>
          </div>
        </section>

        {/* 5. FOOTER */}
        <footer className="pt-12 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 CareerOS. Personal Career Operating System for Systems Engineers.</p>
          <div className="flex items-center gap-6">
            <button type="button" onClick={() => setIsAuthOpen(true)} className="hover:text-white transition">Sign In</button>
            <a href="https://github.com/mohitUpraity/careerOS-new" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">GitHub Repo</a>
          </div>
        </footer>
      </main>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
}
