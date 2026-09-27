"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Radar,
  Terminal,
  PlayCircle,
  ShieldCheck,
  Zap,
  TrendingUp,
  CheckCircle2,
  Lock,
  Code2,
  Sparkles,
  ArrowRight,
  GitCommit,
  GitPullRequest,
  Star,
  Activity,
  Mic,
  Cpu,
  Layers,
  X,
  User,
  Sliders,
} from "lucide-react";
import { AuthModal } from "@/components/auth/AuthModal";

export default function LandingPage() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [emailInput, setEmailInput] = useState("");

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] font-sans antialiased selection:bg-blue-600 selection:text-white">
      {/* -------------------------------------------------------------------------- */}
      {/* 1. TOP UTILITY & BRAND HEADER (Fixed 56px)                                  */}
      {/* -------------------------------------------------------------------------- */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#f8f9ff]/85 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
        <div className="h-14 max-w-7xl mx-auto px-6 flex items-center justify-between gap-4">
          {/* Logo & Category */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#004ac6] flex items-center justify-center shadow-xs">
                <Radar className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight text-[#0b1c30]">CareerOS</span>
            </Link>
            <span className="font-mono text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-100 text-[#004ac6] uppercase tracking-wide">
              PRO / AI Systems
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 text-[13px] font-medium text-slate-600">
            <a href="#pillars" className="px-3 py-1.5 rounded-lg hover:text-[#0b1c30] hover:bg-slate-100 transition">
              Product Architecture
            </a>
            <a href="#arena" className="px-3 py-1.5 rounded-lg hover:text-[#0b1c30] hover:bg-slate-100 transition">
              AI Interview Arena
            </a>
            <a href="#telemetry" className="px-3 py-1.5 rounded-lg hover:text-[#0b1c30] hover:bg-slate-100 transition">
              Telemetry &amp; Radar
            </a>
            <a href="#comparison" className="px-3 py-1.5 rounded-lg hover:text-[#0b1c30] hover:bg-slate-100 transition">
              Live Benchmarks
            </a>
            <a href="#testimonials" className="px-3 py-1.5 rounded-lg hover:text-[#0b1c30] hover:bg-slate-100 transition">
              Case Studies
            </a>
            <a href="#deploy" className="px-3 py-1.5 rounded-lg hover:text-[#0b1c30] hover:bg-slate-100 transition">
              Changelog
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100/60 text-emerald-800 font-mono text-[11px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              <span>Live Telemetry: Active (99.8% Signal)</span>
            </div>

            <button
              type="button"
              onClick={() => setIsAuthOpen(true)}
              className="hidden sm:inline-flex text-[13px] font-medium text-slate-700 hover:text-slate-900 transition"
            >
              Sign In
            </button>

            <button
              type="button"
              onClick={() => setIsAuthOpen(true)}
              className="inline-flex items-center justify-center px-4 py-1.5 rounded-lg bg-[#2563eb] text-white font-medium text-[13px] shadow-sm hover:bg-[#004ac6] transition shadow-blue-500/20 active:scale-95"
            >
              Launch CareerOS Free →
            </button>

            <button
              type="button"
              onClick={() => setIsAuthOpen(true)}
              className="w-8 h-8 rounded-full bg-[#004ac6] flex items-center justify-center text-white shrink-0 shadow-xs"
            >
              <User className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* -------------------------------------------------------------------------- */}
      {/* 2. HERO & LIVE COCKPIT PREVIEW (SECTION 1)                                   */}
      {/* -------------------------------------------------------------------------- */}
      <main className="w-full pt-14">
        <section className="relative w-full pt-12 pb-20 px-6 overflow-hidden bg-gradient-to-b from-[#f8f9ff] via-blue-50/30 to-[#f8f9ff]">
          {/* Ambient Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[980px] h-[440px] bg-gradient-to-tr from-blue-200/30 via-indigo-100/40 to-emerald-100/30 blur-3xl -z-10 pointer-events-none rounded-full" />

          <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/80 shadow-xs mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="font-mono text-[11px] text-[#004ac6] font-semibold tracking-wider uppercase">
                V4.2 SYNTHETIC CAREER INTELLIGENCE ENGINE • POWERED BY VERIFIED REPO TELEMETRY
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.12] tracking-tight text-slate-900 max-w-4xl font-bold mb-4">
              The Autonomous Career Operating System for{" "}
              <span className="text-[#2563eb]">AI Engineers</span> &amp; High-Leverage Talent.
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mb-8 leading-relaxed">
              Stop applying blindly. CareerOS syncs with your GitHub commits, verifies code artifacts, runs simulated
              Staff-level technical debriefs, and engineers counter-offers with mathematical precision.
            </p>

            {/* CTA Cluster */}
            <div className="flex flex-col sm:flex-row items-center gap-3.5 mb-5 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setIsAuthOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#2563eb] text-white font-medium text-sm shadow-md hover:bg-[#004ac6] transition shadow-blue-600/20 active:scale-95"
              >
                <Terminal className="w-4 h-4" />
                <span>Launch CareerOS Copilot Free →</span>
              </button>

              <button
                type="button"
                onClick={() => setIsDemoModalOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-white border border-slate-200 text-slate-800 font-medium text-sm shadow-xs hover:bg-slate-50 transition"
              >
                <PlayCircle className="w-4 h-4 text-[#2563eb]" />
                <span>Explore Live Interactive Demo</span>
              </button>
            </div>

            {/* Micro Verification Trust Tagline */}
            <div className="flex items-center gap-1.5 font-mono text-xs text-slate-500 mb-10">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Instant repo AST indexing • No credit card required • Read-only OAuth scope</span>
            </div>

            {/* Micro Social Proof Strip */}
            <div className="w-full max-w-4xl py-2.5 px-4 rounded-xl bg-white/90 border border-slate-200/80 backdrop-blur-sm shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 mb-16">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2 overflow-hidden">
                  <div className="inline-block h-7 w-7 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                    JD
                  </div>
                  <div className="inline-block h-7 w-7 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                    AK
                  </div>
                  <div className="inline-block h-7 w-7 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                    TV
                  </div>
                  <div className="inline-block h-7 w-7 rounded-full bg-amber-600 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                    SR
                  </div>
                </div>
                <span className="text-xs text-slate-600 font-medium ml-1">
                  Trusted by <strong className="text-slate-900 font-semibold">14,000+ AI practitioners</strong> targeting:
                </span>
              </div>
              <div className="flex items-center gap-4 text-slate-500 font-mono text-xs font-semibold tracking-tight">
                <span className="hover:text-blue-600 transition">DEEPMIND</span>
                <span>•</span>
                <span className="hover:text-blue-600 transition">OPENAI</span>
                <span>•</span>
                <span className="hover:text-blue-600 transition">META FAIR</span>
                <span>•</span>
                <span className="hover:text-blue-600 transition">ANTHROPIC</span>
              </div>
            </div>

            {/* -------------------------------------------------------------------------- */}
            {/* FLOATING INTERACTIVE HERO CANVAS (CAREEROS COCKPIT)                         */}
            {/* -------------------------------------------------------------------------- */}
            <div className="relative w-full max-w-6xl text-left">
              {/* Floating Pill 1 */}
              <div
                className="hidden lg:flex absolute -top-5 -left-6 z-20 items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-md text-slate-800 font-mono text-[11px] animate-bounce"
                style={{ animationDuration: "4s" }}
              >
                <GitCommit className="w-3.5 h-3.5 text-blue-600" />
                <span>Real-time GitHub Evidence AST Sync</span>
              </div>

              {/* Floating Pill 2 */}
              <div className="hidden lg:flex absolute -bottom-4 left-1/4 z-20 items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-md text-slate-800 font-mono text-[11px]">
                <Activity className="w-3.5 h-3.5 text-emerald-600" />
                <span>38ms Voice &amp; Architecture Sim</span>
              </div>

              {/* Floating Pill 3 */}
              <div className="hidden lg:flex absolute -top-6 -right-4 z-20 items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-md text-slate-800 font-mono text-[11px]">
                <TrendingUp className="w-3.5 h-3.5 text-amber-600" />
                <span>83b Tax &amp; Equity Vesting Engine</span>
              </div>

              {/* Main Window Container */}
              <div className="w-full rounded-2xl bg-white border border-slate-200 shadow-xl overflow-hidden">
                {/* Window Header */}
                <div className="h-11 bg-slate-100/90 border-b border-slate-200 px-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block" />
                    <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block" />
                    <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block" />
                    <span className="ml-2 font-mono text-xs text-slate-600 font-medium flex items-center gap-1">
                      <Sliders className="w-3.5 h-3.5" />
                      careeros://workspace/production-telemetry-v4
                    </span>
                  </div>
                  <div className="hidden sm:flex items-center gap-4 font-mono text-xs">
                    <span className="text-slate-800 font-semibold">Mohit Upraity • AI Systems Track</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Match Velocity 94%
                    </span>
                    <span className="text-slate-400">Session #SYS-88219-L6</span>
                  </div>
                </div>

                {/* Inside Cockpit: 3-Column Bento Grid */}
                <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-50/60">
                  {/* Left Column: Guided Next Best Action (4 Cols) */}
                  <div className="lg:col-span-4 flex flex-col gap-4">
                    <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-xs text-[#004ac6] uppercase tracking-wider flex items-center gap-1">
                            <Zap className="w-3.5 h-3.5" /> Next Best Action
                          </span>
                          <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-mono text-[10px] font-bold">
                            +14% Impact
                          </span>
                        </div>
                        <h4 className="font-bold text-sm text-slate-900 mb-1">
                          Deploy CareerOS with Docker &amp; Vector DB
                        </h4>
                        <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                          Target roles at Anthropic &amp; OpenAI heavily penalize profiles lacking production RAG orchestration
                          evidence. AST detected zero vector store abstractions in your pinned repos.
                        </p>
                      </div>

                      <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 mb-4">
                        <div className="flex items-center justify-between font-mono text-[11px] mb-1">
                          <span className="text-slate-500">Target Artifact:</span>
                          <span className="text-blue-600 font-bold">src/vector_retrieval.cu</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-1.5">
                          <div className="bg-[#2563eb] h-1.5 rounded-full" style={{ width: "72%" }} />
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setIsAuthOpen(true)}
                        className="w-full py-2 px-3 rounded-lg bg-[#2563eb] text-white text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-blue-700 transition"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Synthesize Vector Kernel Evidence</span>
                      </button>
                    </div>

                    {/* Pinned Signal Monitor */}
                    <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-[11px] text-slate-400 uppercase font-semibold">
                          AST Ingestion Status
                        </span>
                        <span className="font-mono text-xs text-emerald-600 font-bold">PASS (100%)</span>
                      </div>
                      <div className="space-y-2 font-mono text-xs">
                        <div className="flex items-center justify-between text-slate-600 py-1 border-b border-slate-100">
                          <span className="truncate">github.com/mohit/kv-cache-cuda</span>
                          <span className="text-slate-900 font-semibold">41 Commits</span>
                        </div>
                        <div className="flex items-center justify-between text-slate-600 py-1 border-b border-slate-100">
                          <span className="truncate">github.com/mohit/tensor-pipe-orch</span>
                          <span className="text-slate-900 font-semibold">12 Issues Clsd</span>
                        </div>
                        <div className="flex items-center justify-between text-slate-600 py-1">
                          <span className="truncate">github.com/mohit/distributed-flash-attn</span>
                          <span className="text-emerald-600 font-semibold">Verified L6</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Center Column: Live Interview Arena (5 Cols) */}
                  <div className="lg:col-span-5 p-5 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="font-mono text-xs uppercase tracking-wider text-slate-800 font-bold">
                            Live Interview Arena Session
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-blue-50 border border-blue-200 text-blue-700 font-mono text-[10px] font-semibold">
                          Google L6 Rubric
                        </span>
                      </div>

                      <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 mb-3.5">
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <span className="font-bold text-sm text-slate-900">Speculative KV Cache Architecture</span>
                          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono text-[10px] font-bold">
                            Signal: 94/100 (Strong Hire)
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          Principal Evaluator AI probed distributed tensor partitioning &amp; memory fragmentation during
                          token pre-fill.
                        </p>
                      </div>

                      {/* Simulation Audio Spectrum Box */}
                      <div className="p-3.5 rounded-lg bg-slate-950 text-white mb-3.5">
                        <div className="flex items-center justify-between font-mono text-[11px] text-slate-400 mb-2">
                          <span className="flex items-center gap-1.5 text-emerald-400">
                            <Mic className="w-3.5 h-3.5" /> Voice Stream Latency: 32ms
                          </span>
                          <span className="text-slate-400">00:34:12 / 00:45:00</span>
                        </div>

                        <div className="h-8 flex items-center justify-between gap-1 px-1">
                          <span className="w-1 bg-emerald-400 rounded-full h-3" />
                          <span className="w-1 bg-emerald-400 rounded-full h-6" />
                          <span className="w-1 bg-blue-500 rounded-full h-7" />
                          <span className="w-1 bg-blue-500 rounded-full h-4" />
                          <span className="w-1 bg-emerald-400 rounded-full h-8" />
                          <span className="w-1 bg-emerald-400 rounded-full h-5" />
                          <span className="w-1 bg-blue-500 rounded-full h-6" />
                          <span className="w-1 bg-emerald-400 rounded-full h-7" />
                          <span className="w-1 bg-emerald-400 rounded-full h-3" />
                          <span className="w-1 bg-blue-500 rounded-full h-5" />
                          <span className="w-1 bg-blue-500 rounded-full h-8" />
                          <span className="w-1 bg-emerald-400 rounded-full h-4" />
                          <span className="w-1 bg-emerald-400 rounded-full h-6" />
                          <span className="w-1 bg-emerald-400 rounded-full h-8" />
                          <span className="w-1 bg-blue-500 rounded-full h-4" />
                          <span className="w-1 bg-emerald-400 rounded-full h-2" />
                        </div>

                        <div className="mt-2 text-[10px] font-mono text-slate-300 line-clamp-1">
                          Evaluator: &ldquo;Explain how you eliminate CPU-GPU pipeline stalls when swap buffers deplete
                          under load.&rdquo;
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-500 font-medium">Distributed Systems Mastery</span>
                          <span className="font-bold text-slate-900 font-mono">98% (Exceeds L6)</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-1.5">
                          <div className="bg-[#2563eb] h-1.5 rounded-full" style={{ width: "98%" }} />
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-500">Live transcript critique generated</span>
                      <button
                        type="button"
                        onClick={() => setIsAuthOpen(true)}
                        className="font-mono text-xs text-blue-600 font-semibold flex items-center gap-0.5 hover:underline"
                      >
                        View Full Debrief →
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Offer Matrix & Compensation Engine (3 Cols) */}
                  <div className="lg:col-span-3 p-5 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-[11px] text-slate-400 uppercase font-semibold">
                          Offer Negotiation Matrix
                        </span>
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      </div>

                      <div className="mb-3.5">
                        <span className="text-xs text-slate-500 block mb-0.5">Max Projected Total Comp</span>
                        <div className="text-3xl font-extrabold text-slate-900 tracking-tight">$519,400</div>
                        <div className="flex items-center gap-1 font-mono text-xs text-emerald-600 mt-1 font-semibold">
                          <TrendingUp className="w-3.5 h-3.5" />
                          <span>+11.4% 4-Yr NPV vs. Anthropic Base</span>
                        </div>
                      </div>

                      {/* Comp Bars */}
                      <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 mb-3.5 space-y-2">
                        <div>
                          <div className="flex justify-between font-mono text-[11px] text-slate-800 mb-0.5">
                            <span>Base Salary</span>
                            <span className="font-semibold">$240,000</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-1">
                            <div className="bg-[#004ac6] h-1 rounded-full" style={{ width: "48%" }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between font-mono text-[11px] text-slate-800 mb-0.5">
                            <span>Equity (Annualized)</span>
                            <span className="font-semibold">$210,000</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-1">
                            <div className="bg-emerald-600 h-1 rounded-full" style={{ width: "65%" }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between font-mono text-[11px] text-slate-800 mb-0.5">
                            <span>Performance Bonus</span>
                            <span className="font-semibold">$69,400</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-1">
                            <div className="bg-amber-600 h-1 rounded-full" style={{ width: "25%" }} />
                          </div>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200/80">
                        <div className="flex items-center gap-1 font-mono text-xs text-emerald-800 font-bold mb-1">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Stage 2 Counter-Script Ready</span>
                        </div>
                        <p className="text-[11px] text-slate-600 leading-relaxed">
                          Uses DeepMind L6 equity ladder data to justify non-standard sign-on acceleration.
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsAuthOpen(true)}
                      className="mt-3 w-full py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-900 font-semibold text-xs transition"
                    >
                      Run Game Theory Sim
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------------------- */}
        {/* 3. REAL-TIME TELEMETRY METRICS BAND (SECTION 2)                             */}
        {/* -------------------------------------------------------------------------- */}
        <section id="telemetry" className="w-full bg-slate-100/70 py-12 px-6 border-y border-slate-200">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Metric 1 */}
            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-xs text-slate-500 uppercase tracking-wider">Average Comp Lift</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono text-xs font-bold">
                    +28.4%
                  </span>
                </div>
                <div className="text-3xl font-bold text-slate-900 tracking-tight my-1">$124,000+</div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Average negotiation delta achieved via algorithmic multi-offer counter-playbooks.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-slate-100 font-mono text-xs text-blue-600 flex items-center gap-1 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified via W2/Offer Letters</span>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-xs text-slate-500 uppercase tracking-wider">Screening Yield</span>
                  <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-mono text-xs font-bold">
                    Top Decile
                  </span>
                </div>
                <div className="text-3xl font-bold text-slate-900 tracking-tight my-1">3.8x</div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Interview conversion lift when presenting verified repo telemetry vs. traditional PDF resumes.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-slate-100 font-mono text-xs text-blue-600 flex items-center gap-1 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>AST Signal Validation</span>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-xs text-slate-500 uppercase tracking-wider">Interview Sim Scale</span>
                  <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-mono text-xs font-bold">
                    L6-L8 Loops
                  </span>
                </div>
                <div className="text-3xl font-bold text-slate-900 tracking-tight my-1">45,000+</div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Mock sessions executed covering vLLM kernel optimization, PyTorch internals, and Megatron.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-slate-100 font-mono text-xs text-emerald-600 flex items-center gap-1 font-semibold">
                <Zap className="w-3.5 h-3.5" />
                <span>Real-time WebRTC low latency</span>
              </div>
            </div>

            {/* Metric 4 */}
            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-xs text-slate-500 uppercase tracking-wider">
                    Market Benchmark
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono text-xs font-bold">
                    High Precision
                  </span>
                </div>
                <div className="text-3xl font-bold text-slate-900 tracking-tight my-1">99.4%</div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Salary distribution accuracy benchmarked across Bay Area &amp; Remote senior engineering bands.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-slate-100 font-mono text-xs text-slate-500 flex items-center gap-1">
                <Activity className="w-3.5 h-3.5" />
                <span>Dynamic Market Telemetry</span>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------------------- */}
        {/* 4. THE THREE PILLARS (SECTION 3)                                            */}
        {/* -------------------------------------------------------------------------- */}
        <section id="pillars" className="w-full py-24 px-6 bg-[#f8f9ff]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="font-mono text-xs text-[#004ac6] font-bold uppercase tracking-wider mb-2 block">
                ENGINEERED FOR PRINCIPAL AND STAFF CANDIDATES
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
                Three Architectural Systems Built for Extreme Career Leverage.
              </h2>
              <p className="text-sm text-slate-600">
                Generalist job platforms fail AI engineers because they can&apos;t interpret CUDA kernels, distributed
                batching patterns, or equity tax strategies. CareerOS was built from the compiler up.
              </p>
            </div>

            {/* Pillar 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-24">
              <div className="lg:col-span-6 space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-blue-100 text-blue-900 font-mono text-xs font-bold">
                  PILLAR 01 • REPO VERIFICATION
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">The Verifiable Evidence Graph</h3>
                <p className="text-base font-semibold text-[#004ac6]">
                  Turn raw Git commits and Dockerfiles into unassailable engineering proof.
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Hiring managers are exhausted by fabricated LLM buzzwords. CareerOS inspects your actual codebases,
                  extracts AST structures, maps your CUDA kernels, and binds them to verifiable engineering competencies.
                </p>
                <ul className="space-y-3 pt-2">
                  <li className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Automatic AST Repository Parsing:</strong> Quantifies distributed systems design, memory
                      alignment, and concurrency primitives directly from source.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>RAG Pipeline Evaluation Metrics:</strong> Generates automated RAGAS signal benchmarks proving
                      your retrieval systems beat baseline latency.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Synthetic HC Dossiers:</strong> Formatted specifically for Staff and Principal hiring
                      committees with citations to specific commits and PRs.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Pillar 1 Visual */}
              <div className="lg:col-span-6 p-6 rounded-2xl bg-slate-100 border border-slate-200 shadow-sm">
                <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-[#004ac6]" />
                      <span className="font-mono text-xs font-bold text-slate-900">EVIDENCE_GRAPH :: NODE #882</span>
                    </div>
                    <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                      VERIFIED
                    </span>
                  </div>
                  <div className="p-3 bg-slate-900 text-slate-200 rounded-lg font-mono text-xs mb-4 overflow-x-auto">
                    <div className="text-emerald-400">// PagedAttention GPU Buffer Allocation</div>
                    <div>cudaMallocPitch(&amp;devPtr, &amp;pitch, width * sizeof(float), height);</div>
                    <div className="text-blue-400 font-semibold">// AST validated: Sub-millisecond KV swap pipeline</div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                      <span className="font-mono text-[10px] text-slate-500 uppercase block">Target Skill Matched</span>
                      <span className="font-semibold text-xs text-slate-900">LLM Inference Systems</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                      <span className="font-mono text-[10px] text-slate-500 uppercase block">
                        Hiring Committee Confidence
                      </span>
                      <span className="font-semibold text-xs text-emerald-600">99.1% High Proof</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-600 px-2 font-mono">
                  <span className="flex items-center gap-1">
                    <GitCommit className="w-4 h-4 text-emerald-600" /> 4 Pinned Repositories Analyzed
                  </span>
                  <span className="text-blue-600 font-semibold">14 Artifacts Verified</span>
                </div>
              </div>
            </div>

            {/* Pillar 2 */}
            <div id="arena" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-24">
              <div className="lg:col-span-6 order-2 lg:order-1 p-6 rounded-2xl bg-slate-100 border border-slate-200 shadow-sm">
                <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs text-slate-900 font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-500" /> ARENA RECORDING • 00:41:19
                    </span>
                    <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold">
                      Meta FAIR Staff Sim
                    </span>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                      <span className="font-mono text-[10px] text-blue-600 font-bold block mb-1">
                        SYNTHETIC EVALUATOR (L7 INFRA):
                      </span>
                      <p className="text-xs text-slate-800 leading-relaxed">
                        &ldquo;If your Megatron tensor parallelism pipeline is ring-allreducing across 8 nodes over 800Gbps
                        RoCE, how do you mitigate NVLink NUMA imbalance during the backward pass?&rdquo;
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                      <span className="font-mono text-[10px] text-emerald-700 font-bold block mb-1">
                        CANDIDATE RESPONSE CRITIQUE:
                      </span>
                      <p className="text-xs text-slate-800 leading-relaxed">
                        Excellent identification of interleaved 1F1B schedule. Score increased +8 pts for referencing
                        overlapping compute with DP communication.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center font-mono text-xs">
                    <div className="p-2 rounded bg-slate-50 border border-slate-200">
                      <span className="block text-slate-400 text-[10px]">Latency</span>
                      <span className="font-bold text-slate-900">34ms</span>
                    </div>
                    <div className="p-2 rounded bg-slate-50 border border-slate-200">
                      <span className="block text-slate-400 text-[10px]">Arch Rubric</span>
                      <span className="font-bold text-emerald-600">96 / 100</span>
                    </div>
                    <div className="p-2 rounded bg-slate-50 border border-slate-200">
                      <span className="block text-slate-400 text-[10px]">Staff Signal</span>
                      <span className="font-bold text-blue-600">Confirmed</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-600 px-2 font-mono">
                  <span>Calibrated to OpenAI &amp; Meta FAIR Rubrics</span>
                  <span className="text-emerald-600 font-semibold">WebRTC Audio Engine Active</span>
                </div>
              </div>

              <div className="lg:col-span-6 order-1 lg:order-2 space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-100 text-emerald-900 font-mono text-xs font-bold">
                  PILLAR 02 • HIGH-STAKES SIMULATION
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">Synthetic AI Interview Arena</h3>
                <p className="text-base font-semibold text-emerald-700">
                  Simulate ruthless Staff and Principal technical loops before stepping into the room.
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Don&apos;t burn dream offers on practice interviews. CareerOS features low-latency voice-enabled synthetic
                  interviewers trained on real questions, counter-probes, and grading criteria used by hiring managers at
                  top AI labs.
                </p>
                <ul className="space-y-3 pt-2">
                  <li className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Sub-38ms Voice Interactions:</strong> Zero awkward pause delays. Evaluators interrupt
                      realistically when technical depth falls below L6 standards.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Architecture Whiteboard Diagnostics:</strong> Solve actual high-throughput distributed memory
                      bottlenecks (vLLM Megatron tensor parallelisms).
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Exhaustive Debrief Dossiers:</strong> Minute-by-minute transcripts pinpointing technical
                      inaccuracies, filler language, and weak justifications.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-amber-100 text-amber-900 font-mono text-xs font-bold">
                  PILLAR 03 • GAME-THEORY LEVERAGE
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  Compensation Intelligence &amp; Offer Matrix
                </h3>
                <p className="text-base font-semibold text-amber-700">
                  Never negotiate in the dark. Maximize equity with game-theory precision.
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Engineers leave six figures on the table simply because recruiters hold an asymmetric information
                  advantage. CareerOS balances the scales with real-time offer matrices, automated counter-scripts, and tax
                  optimization simulations.
                </p>
                <ul className="space-y-3 pt-2">
                  <li className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Front-Loaded vs. Linear Vesting Models:</strong> Compare 4-year Net Present Value (NPV)
                      across competing offers with dynamic tax assumptions.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Recruiter Objection Counter-Playbooks:</strong> Battle-tested scripts engineered specifically to
                      neutralize &ldquo;exploding deadlines&rdquo; and standard equity bands.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>83(b) Election &amp; QSBS Tax Simulators:</strong> Maximize long-term capital retention when
                      dealing with early-stage unicorn RSUs or exercise options.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Pillar 3 Visual */}
              <div className="lg:col-span-6 p-6 rounded-2xl bg-slate-100 border border-slate-200 shadow-sm">
                <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-slate-900">
                      OFFER COMPARISON DELTA (4-YR NPV)
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono text-[10px] font-bold">
                      +$184K Optimal Lead
                    </span>
                  </div>

                  <div className="space-y-3 my-4">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium text-slate-900">Offer A: OpenAI (Research Engineer L6)</span>
                        <span className="font-bold text-slate-900 font-mono">$580,000 / yr</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-3">
                        <div className="bg-[#2563eb] h-3 rounded-full" style={{ width: "92%" }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium text-slate-600">Offer B: Anthropic (Systems Lead)</span>
                        <span className="font-bold text-slate-600 font-mono">$510,000 / yr</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-3">
                        <div className="bg-slate-400 h-3 rounded-full" style={{ width: "78%" }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium text-slate-500">Initial Unnegotiated Meta Baseline</span>
                        <span className="font-bold text-slate-500 font-mono">$425,000 / yr</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-3">
                        <div className="bg-slate-300 h-3 rounded-full" style={{ width: "60%" }} />
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between font-mono text-xs">
                    <span className="text-slate-500">Optimal Counter Target:</span>
                    <span className="text-emerald-700 font-bold">$610,000 + Accelerated 1-Yr Vest</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-600 px-2 font-mono">
                  <span>Verified against 2,400+ Bay Area H1 2026 filings</span>
                  <span className="text-blue-600 font-semibold">Recruiter Script Ready</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------------------- */}
        {/* 5. COMPARISON MATRIX (SECTION 4)                                            */}
        {/* -------------------------------------------------------------------------- */}
        <section id="comparison" className="w-full py-20 px-6 bg-slate-100/70 border-t border-slate-200">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <span className="font-mono text-xs text-[#004ac6] font-bold uppercase tracking-wider mb-2 block">
                STRUCTURAL ADVANTAGE
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
                How CareerOS Replaces the Legacy Job Hunt
              </h2>
              <p className="text-sm text-slate-600">
                Legacy resume builders were designed in 1999 for static paper files. CareerOS is built for
                high-performance engineers in the modern AI era.
              </p>
            </div>

            <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
              <div className="grid grid-cols-12 bg-slate-100 p-4 font-mono text-xs text-slate-600 font-bold border-b border-slate-200">
                <div className="col-span-4 uppercase tracking-wider">Dimension</div>
                <div className="col-span-4 uppercase tracking-wider">Legacy Resume Stack</div>
                <div className="col-span-4 text-[#004ac6] font-bold uppercase tracking-wider flex items-center gap-1">
                  <Zap className="w-4 h-4" /> CareerOS Engine
                </div>
              </div>

              {/* Row 1 */}
              <div className="grid grid-cols-12 p-4 items-center border-b border-slate-100 text-xs">
                <div className="col-span-4 font-semibold text-slate-900">Candidate Evidence</div>
                <div className="col-span-4 text-slate-500">Generic static PDF keywords prone to ATS rejection</div>
                <div className="col-span-4 text-emerald-700 font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>AST-verified GitHub commits &amp; architecture graphs</span>
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-12 p-4 items-center border-b border-slate-100 text-xs bg-slate-50/50">
                <div className="col-span-4 font-semibold text-slate-900">Technical Preparation</div>
                <div className="col-span-4 text-slate-500">Isolated LeetCode grinding with zero systems depth</div>
                <div className="col-span-4 text-emerald-700 font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Synthetic voice-enabled Staff evaluator debriefs</span>
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-12 p-4 items-center border-b border-slate-100 text-xs">
                <div className="col-span-4 font-semibold text-slate-900">Compensation Leverage</div>
                <div className="col-span-4 text-slate-500">Blind guessing, anecdotal forum threads, recruiter pressure</div>
                <div className="col-span-4 text-emerald-700 font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Algorithmic game-theory multi-offer counter playbooks</span>
                </div>
              </div>

              {/* Row 4 */}
              <div className="grid grid-cols-12 p-4 items-center border-b border-slate-100 text-xs bg-slate-50/50">
                <div className="col-span-4 font-semibold text-slate-900">Role Discovery</div>
                <div className="col-span-4 text-slate-500">Cold applying to 200+ public postings with 2% yield</div>
                <div className="col-span-4 text-emerald-700 font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Direct pipeline routing based on code artifact fit</span>
                </div>
              </div>

              {/* Row 5 */}
              <div className="grid grid-cols-12 p-4 items-center text-xs">
                <div className="col-span-4 font-semibold text-slate-900">Outcome Certainty</div>
                <div className="col-span-4 text-slate-500">Months of anxiety and arbitrary rejections</div>
                <div className="col-span-4 text-emerald-700 font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Quantified readiness score before applying</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------------------- */}
        {/* 6. REAL TESTIMONIALS (SECTION 5)                                            */}
        {/* -------------------------------------------------------------------------- */}
        <section id="testimonials" className="w-full py-24 px-6 bg-[#f8f9ff]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="font-mono text-xs text-[#004ac6] font-bold uppercase tracking-wider mb-2 block">
                PROVEN WITH PRINCIPAL TALENT
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
                Validated by Senior AI Practitioners Worldwide
              </h2>
              <p className="text-sm text-slate-600">
                See how engineers use our telemetry to bypass recruiters and unlock top-tier compensation bands.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Testimonial 1 */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-800 leading-relaxed mb-6">
                    &ldquo;CareerOS helped me systematically turn my DRDO kernel experiments into a compelling L6 Staff
                    Infra case at Google. The Offer Matrix secured an extra $65k in upfront sign-on.&rdquo;
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold font-mono text-xs">
                    SJ
                  </div>
                  <div>
                    <span className="font-bold text-sm text-slate-900 block">S. Jenkins</span>
                    <span className="text-xs text-slate-500">Senior AI Infra Lead • Mountain View</span>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-800 leading-relaxed mb-6">
                    &ldquo;The AI Interview Arena&apos;s deep-dive into PagedAttention and speculative decoding is tougher
                    than the actual Meta loops. You walk in knowing you&apos;ve already won.&rdquo;
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold font-mono text-xs">
                    AK
                  </div>
                  <div>
                    <span className="font-bold text-sm text-slate-900 block">A. Kulkarni</span>
                    <span className="text-xs text-slate-500">ML Systems Engineer • San Francisco</span>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-800 leading-relaxed mb-6">
                    &ldquo;Traditional resume builders are dead. CareerOS&apos;s evidence graph is how every technical
                    talent platform should work. The recruiter had my commit proofs before our call.&rdquo;
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold font-mono text-xs">
                    TV
                  </div>
                  <div>
                    <span className="font-bold text-sm text-slate-900 block">T. Vance</span>
                    <span className="text-xs text-slate-500">Autonomous Systems Researcher • Seattle</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------------------- */}
        {/* 7. HIGH-CONVERSION CTA BANNER (SECTION 6)                                  */}
        {/* -------------------------------------------------------------------------- */}
        <section id="deploy" className="w-full py-20 px-6 bg-[#f8f9ff]">
          <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-br from-[#004ac6] via-[#2563eb] to-[#004ac6] p-8 sm:p-14 text-white shadow-2xl relative overflow-hidden">
            {/* Ambient Circle */}
            <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-white/10 blur-2xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md font-mono text-xs mb-4 font-semibold">
                <Zap className="w-3.5 h-3.5" /> IMMEDIATE ACCESS • NO WAITLIST
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-tight mb-3 text-white">
                Ready to run your career on an autonomous operating system?
              </h2>

              <p className="text-sm sm:text-base text-blue-100 mb-8 opacity-90 leading-relaxed">
                Join 14,000+ engineers leveling up from IC4 to L6+. Deploy your personal telemetry and inspect your
                verified evidence graph in less than 2 minutes.
              </p>

              {/* Fast Action Form */}
              <form onSubmit={handleHeroSubmit} className="flex flex-col sm:flex-row gap-2.5 max-w-xl mb-4">
                <input
                  type="text"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your GitHub username or email"
                  className="flex-1 px-4 py-3 rounded-xl bg-white text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-[#00174b] hover:bg-black text-white font-semibold text-sm shadow-md transition-all shrink-0 flex items-center justify-center gap-2 active:scale-95"
                >
                  <span>Initialize Engine</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-6 text-blue-100 font-mono text-xs opacity-90 pt-2">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-300" /> SOC2 Type II Certified
                </span>
                <span className="flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-emerald-300" /> Zero Training Data Retention
                </span>
                <span className="flex items-center gap-1.5">
                  <Code2 className="w-4 h-4 text-emerald-300" /> Public &amp; Private Repo Support
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------------------- */}
        {/* 8. INTERACTIVE DEMO MODAL                                                  */}
        {/* -------------------------------------------------------------------------- */}
        {isDemoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
            <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
              <div className="h-14 px-6 bg-slate-100 flex items-center justify-between border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-bold text-sm text-slate-900">CareerOS Live Sandbox Diagnostic</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsDemoModalOpen(false)}
                  className="w-8 h-8 rounded-lg hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 p-6 overflow-y-auto grid grid-cols-1 lg:grid-cols-3 gap-6 bg-slate-50">
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                  <h4 className="font-bold text-sm text-slate-900 mb-1">Step 1: AST Extraction</h4>
                  <p className="text-xs text-slate-500 mb-3">
                    Select candidate code artifact to run real-time competency graph analysis:
                  </p>
                  <div className="space-y-2 font-mono text-xs">
                    <div className="w-full text-left p-2.5 rounded-lg bg-slate-50 border border-slate-200 font-semibold flex justify-between items-center text-slate-800">
                      <span>custom_vllm_cache.cu</span>
                      <span className="text-emerald-600 font-bold">100% Signal</span>
                    </div>
                    <div className="w-full text-left p-2.5 rounded-lg bg-slate-50 border border-slate-200 font-semibold flex justify-between items-center text-slate-800">
                      <span>rag_chunk_evaluator.py</span>
                      <span className="text-blue-600 font-bold">92% Signal</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                  <h4 className="font-bold text-sm text-slate-900 mb-1">Step 2: AI Evaluator Probing</h4>
                  <p className="text-xs text-slate-500 mb-3">Simulated Google Principal Engineer question prompt:</p>
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 mb-3 leading-relaxed font-mono">
                    &ldquo;Your AST shows direct shared memory allocation in CUDA without warp synchronizations. How do
                    you prevent race hazards under dynamic batch size expansion?&rdquo;
                  </div>
                  <span className="px-2 py-1 rounded bg-emerald-100 text-emerald-800 font-mono text-[11px] font-bold">
                    L6 Systems Architecture Validated
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                  <h4 className="font-bold text-sm text-slate-900 mb-1">Step 3: Equity Matrix Projection</h4>
                  <p className="text-xs text-slate-500 mb-3">Target Band for Staff AI Infrastructure:</p>
                  <div className="text-2xl font-extrabold text-slate-900 mb-1 font-mono">$495,000 - $620,000</div>
                  <p className="text-xs text-slate-500 mb-4 font-mono">
                    Includes $260k Base + 4-Yr Backloaded Equity + $75k Sign-on
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsDemoModalOpen(false);
                      setIsAuthOpen(true);
                    }}
                    className="w-full py-2.5 rounded-lg bg-[#2563eb] hover:bg-[#004ac6] text-white text-xs font-semibold shadow-xs transition"
                  >
                    Deploy Live Profile →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* -------------------------------------------------------------------------- */}
      {/* 9. PRODUCT FOOTER                                                          */}
      {/* -------------------------------------------------------------------------- */}
      <footer className="w-full bg-slate-100 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-8">
            <div className="col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded bg-[#004ac6] flex items-center justify-center">
                  <Radar className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="font-bold text-base text-slate-900">CareerOS</span>
              </div>
              <p className="text-xs text-slate-500 mb-3 leading-relaxed">
                Autonomous Career Telemetry &amp; High-Frequency Advancement Systems for Principal Engineers and
                Technical Leaders.
              </p>
              <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-500">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>System Operational • Edge US-East</span>
              </div>
            </div>

            <div>
              <span className="block font-semibold text-xs uppercase tracking-wider text-slate-900 mb-3">Platform</span>
              <ul className="space-y-2 text-xs text-slate-600">
                <li><a href="#arena" className="hover:text-slate-900 transition">Command Center</a></li>
                <li><a href="#arena" className="hover:text-slate-900 transition">Interview Arena</a></li>
                <li><a href="#pillars" className="hover:text-slate-900 transition">Offer Matrix</a></li>
                <li><a href="#pillars" className="hover:text-slate-900 transition">Evidence Graph</a></li>
                <li><a href="#telemetry" className="hover:text-slate-900 transition">Telemetry Settings</a></li>
              </ul>
            </div>

            <div>
              <span className="block font-semibold text-xs uppercase tracking-wider text-slate-900 mb-3">Engineers</span>
              <ul className="space-y-2 text-xs text-slate-600">
                <li><a href="#pillars" className="hover:text-slate-900 transition">AI Research Interns</a></li>
                <li><a href="#pillars" className="hover:text-slate-900 transition">Staff Infrastructure</a></li>
                <li><a href="#pillars" className="hover:text-slate-900 transition">LLM Practitioners</a></li>
                <li><a href="#testimonials" className="hover:text-slate-900 transition">Case Studies</a></li>
              </ul>
            </div>

            <div>
              <span className="block font-semibold text-xs uppercase tracking-wider text-slate-900 mb-3">System Telemetry</span>
              <ul className="space-y-2 text-xs text-slate-600">
                <li><a href="#telemetry" className="hover:text-slate-900 transition">Status 99.98%</a></li>
                <li><a href="#telemetry" className="hover:text-slate-900 transition">Enterprise SLA</a></li>
                <li><a href="#telemetry" className="hover:text-slate-900 transition">Security &amp; Vault</a></li>
                <li><a href="#telemetry" className="hover:text-slate-900 transition">SOC2 Type II</a></li>
              </ul>
            </div>

            <div>
              <span className="block font-semibold text-xs uppercase tracking-wider text-slate-900 mb-3">Company</span>
              <ul className="space-y-2 text-xs text-slate-600">
                <li><a href="#pillars" className="hover:text-slate-900 transition">Manifesto</a></li>
                <li><a href="#pillars" className="hover:text-slate-900 transition">About</a></li>
                <li><a href="#pillars" className="hover:text-slate-900 transition">Research Papers</a></li>
                <li><a href="https://github.com/mohitUpraity/careerOS-new" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition">GitHub</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© 2026 CareerOS Inc. Synthetic Career Intelligence Engine.</p>
            <div className="flex items-center gap-6">
              <a href="#deploy" className="hover:text-slate-900 transition">Privacy Policy</a>
              <a href="#deploy" className="hover:text-slate-900 transition">Terms of Service</a>
              <a href="#deploy" className="hover:text-slate-900 transition">Security Disclosures</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Auth Modal for Google & Email Login */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
}
